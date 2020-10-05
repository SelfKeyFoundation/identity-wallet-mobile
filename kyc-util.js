// 
// const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const ethUtil = require('ethereumjs-util');

const privateKey = 'BfdCD00bb5bF3511cB5BF2B401f97e0C4C67aDCa8897B6FEDBFFDe7ffdf8600f';

function genSignatureForMessage(msg) {
  const msgHash = ethUtil.hashPersonalMessage(Buffer.from(msg));
  const signature = ethUtil.ecsign(msgHash, Buffer.from(privateKey, 'hex'));

  return ethUtil.toRpcSig(signature.v, signature.r, signature.s);
}

class RelyingPartyToken {
	constructor(algo, data, sig) {
		this.algo = algo;
		this.data = data;
		this.sig = sig;
	}
	static fromString(str) {
		let decoded = jwt.decode(str, { complete: true });
		return new RelyingPartyToken(decoded.header, decoded.payload, decoded.signature);
	}

	toString() {
		function base64url(buf) {
			return buf
				.toString('base64')
				.replace(/=/g, '')
				.replace(/\+/g, '-')
				.replace(/\//g, '_');
		}
		const encodedHeader = base64url(Buffer.from(JSON.stringify(this.algo), 'utf8'));
		const encodedPayload = base64url(Buffer.from(JSON.stringify(this.data), 'utf8'));

		return `${encodedHeader}.${encodedPayload}.${this.sig}`;
	}

	hasExpired() {
		const ts = Math.floor(Date.now() / 1000);
		return ts > this.data.exp;
	}
}


function postChallengeReply(challenge, signature, keyId) {
  let url = 'https://dev.instance.kyc-chain.com/api/v2/auth/challenge';
  const body = {};
  
  body.signature = { value: signature.toString(), keyId: keyId.toString() };
 
  // console.log(body);
  
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${challenge}`,
      'User-Agent': 'WDS',
      'content-type': 'application/json'
      // Origin: ctx.getOrigin()
    },
  });
}

module.exports.getToken = async function main() {
  const keyId = 'did:selfkey:0x63d7e1f5ba16f805d1f7e46a20237695826647ffedead701eba3cb1634e55ad3;selfkey:chain=ropsten#keys-1';
  let res = await fetch('https://dev.instance.kyc-chain.com/api/v2/auth/challenge/did:selfkey:0x63d7e1f5ba16f805d1f7e46a20237695826647ffedead701eba3cb1634e55ad3;selfkey:chain=ropsten#keys-1')
  let challenge = await res.json();
  let challengeToken = RelyingPartyToken.fromString(challenge.jwt);
  let signature = await genSignatureForMessage(
    challengeToken.data.challenge || challengeToken.data.nonce
  );
  res = await postChallengeReply(
    challenge.jwt,
    signature,
    keyId,
  );
  
  let challengeReply = await res.json();
  
  let token = RelyingPartyToken.fromString(challengeReply.jwt).toString();
  
  return token;
}

