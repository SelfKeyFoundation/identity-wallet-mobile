const { writeFileSync } = require('fs')
const { generateKeyPairSync } = require('crypto')
const https = require('https');

// function generateKeys() {
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: '123',
  },
});


const options = {
  key: publicKey,
  cert: privateKey
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
