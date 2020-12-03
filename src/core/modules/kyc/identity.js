import * as ethUtil from 'ethereumjs-util';
// import { getPrivateKey } from '../keystorage';
// import { IdAttribute } from '../identity/id-attribute';
// import { getGlobalContext } from 'common/context';
// import { Logger } from 'common/logger';
// import { isDevMode } from 'common/utils/common';
// import AppEth from '@ledgerhq/hw-app-eth';
import { getIdentityVault } from 'core/identity-vault';
import { Logger } from 'core/utils/logger';
import { getConfigs } from 'configs';

const log = new Logger('Identity');

export class Identity {
	constructor(wallet, ident) {
    this.address = wallet.address;

    if (!wallet.privateKey) {
      throw 'Private key is not defined';
    }

		this.privateKey = wallet.privateKey.replace('0x', '');
		this.publicKey = ethUtil.privateToPublic(Buffer.from(this.privateKey, 'hex')).toString('hex');

		this.did = (getConfigs().did && ident.did)
			? `did:selfkey:${ident.did.replace('did:selfkey:', '')}`
			: `did:eth:${this.address ? this.address.toLowerCase() : ''}`;

		this.wallet = wallet;
		this.ident = ident;
  }

  static async create(wallet, ident) {
    const vault = await getIdentityVault(wallet.vaultId);
    let { privateKey} = vault;

    if (!privateKey) {
      privateKey = vault.getETHWalletKeys(0).privateKey;
    }

    wallet = {
      ...wallet,
      privateKey,
		};

    return new Identity(wallet, ident);
	}

	getKeyId() {
		return `${this.getDidWithParams()}#keys-1`;
	}

  // KEEP
	getDidWithParams() {
		if (!this.ident.did || !getConfigs().isDev) {
			return this.did;
		}
		return `${this.did};selfkey:chain=ropsten`;
	}
	// async getPublicKeyFromHardwareWallet() {
	// 	if (this.profile === 'ledger') {
	// 		const transport = await getGlobalContext().web3Service.getLedgerTransport();
	// 		try {
	// 			const appEth = new AppEth(transport);
	// 			const address = await appEth.getAddress(this.path);
	// 			return ethUtil.addHexPrefix(address.publicKey);
	// 		} finally {
	// 			transport.close();
	// 		}
	// 	} else if (this.profile === 'trezor') {
	// 		const publicKey = await getGlobalContext().web3Service.trezorWalletSubProvider.getPublicKey(
	// 			this.address
	// 		);
	// 		return ethUtil.addHexPrefix(publicKey);
	// 	}
	// }

  // KEEP
	async genSignatureForMessage(msg) {
		const msgHash = ethUtil.hashPersonalMessage(Buffer.from(msg));
    const signature = ethUtil.ecsign(msgHash, Buffer.from(this.privateKey, 'hex'));
		console.log('private key', this.privateKey);
		return ethUtil.toRpcSig(signature.v, signature.r, signature.s);
	}

	// async unlock(config) {
	// 	if (this.profile !== 'local') {
	// 		this.publicKey = this.getPublicKeyFromHardwareWallet();
	// 	} else {
	// 		try {
	// 			this.privateKey = getPrivateKey(this.keystorePath, config.password).toString('hex');
	// 			this.publicKey = ethUtil.addHexPrefix(
	// 				ethUtil.privateToPublic(Buffer.from(this.privateKey, 'hex')).toString('hex')
	// 			);
	// 		} catch (error) {
	// 			log.error(error);
	// 			throw new Error('INVALID_PASSWORD');
	// 		}
	// 	}
	// }

	// getAttributesByTypes(types = []) {
	// 	return IdAttribute.findByTypeUrls(
	// 		this.ident.id,
	// 		types.filter(t => typeof t === 'string')
	// 	).eager('[documents, attributeType]');
	// }
}



// getDidWithParams
// getKeyId

// publicKey
// genSignatureForMessage