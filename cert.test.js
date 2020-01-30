const { writeFileSync } = require('fs')
const crypto = require('crypto')
const { mnemonicToSeed, generateMnemonic } = require('bip39');

function makeid(length) {
  var result  = '';
  var characters = '!@#$%ˆ&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const seed = mnemonicToSeed('identify twenty rate region kind any ready sunset hungry gauge vicious convince').then(seed => {
  console.log(seed.toString('hex'))
});


const passphrase = makeid(10);

console.log(passphrase);

// function generateKeys() {
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: passphrase,
  },
});

const fingerprint = crypto.createHash('sha256').update(privateKey).digest('hex');

// console.log(fingerprint);

const data = crypto.publicEncrypt(publicKey, Buffer.from('test', 'utf8'));


// console.log(makeid(12))

// console.log(data);
let startTime = Date.now();

const plainText = crypto.privateDecrypt({
  key: privateKey,
  passphrase: passphrase
}, Buffer.from(data));

// console.log(plainText.toString('utf8'));
// console.log(Date.now() - startTime);
