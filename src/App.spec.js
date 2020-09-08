/**
 * @format
 */
import React from 'react';
import {shallow} from 'enzyme';

import {App} from './App';

describe('App', () => {
  it('Expect to render without errors', () => {
    shallow(<App />);
  });

  it('Expect to render Navigation', () => {
    const wrapper = shallow(<App isLoading={false} />);
    expect(wrapper.find('NavigationContainer')).toHaveLength(1);
  });
});

// import keccak from 'keccak';
// import fs from 'react-native-fs';
// import Share from 'react-native-share';
// import { Share } from 'react-native';
// var WebSocket = require('rpc-websockets').Client
// import {encode} from 'base-64';
// import{ RNSystem } from './inject-system';
// import crypto from 'crypto';

// function getSha3(val) {
//   return createKeccakHash('keccak256').update(val).digest('hex')
// }

// function encrypt(data, password) {
//   var salt = options.salt || cryp.randomBytes(32);
//   var iv = options.iv || cryp.randomBytes(16);

//   var derivedKey;
//   var kdf = options.kdf || 'scrypt';
//   var kdfparams = {
//       dklen: options.dklen || 32,
//       salt: salt.toString('hex')
//   };

//   kdfparams.c = options.c || 262144;
//   kdfparams.prf = 'hmac-sha256';
//   derivedKey = cryp.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');

//   var cipher = cryp.createCipheriv('aes-128-ctr', derivedKey.slice(0, 16), iv);
//   var ciphertext = Buffer.concat([cipher.update(Buffer.from(account.privateKey.replace('0x', ''), 'hex')), cipher.final()]);
//   var mac = getSha3(Buffer.concat([derivedKey.slice(16, 32), Buffer.from(ciphertext, 'hex')])).replace('0x', '');

//   return {
//       version: 3,
//       // id: uuid.v4({random: options.uuid || cryp.randomBytes(16)}),
//       // address: account.address.toLowerCase().replace('0x', ''),
//       crypto: {
//           ciphertext: ciphertext.toString('hex'),
//           cipherparams: {
//             iv: iv.toString('hex')
//           },
//           cipher: 'aes-128-ctr',
//           kdf: kdf,
//           kdfparams: kdfparams,
//           mac: mac.toString('hex')
//       }
//   };
// }

// function encrypt(data, password) {
//   const iv = crypto.randomBytes(16);
//   const salt = crypto.randomBytes(64);
//   const derivedKey = crypto.pbkdf2Sync(hmac, salt, 262144, 32, 'sha256');
//   const hmac = crypto.createHmac('sha256', password).update(derivedKey).digest(hex);
//   const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

//   let encrypted = cipher.update(data, 'utf8', 'hex');
//   encrypted += cipher.final('hex');

//   return {
//     data: encrypted,
//     salt: salt.toString('hex'),
//     iv: iv.toString('hex'),
//   };
// }

// function decrypt(data, password, salt, iv) {
//   const derivedKey = crypto.pbkdf2Sync(password, Buffer.from(salt, 'hex'), 262144, 32, 'sha256');
//   const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, Buffer.from(iv, 'hex'));

//   let decrypted = decipher.update(data, 'hex');
//   decrypted += decipher.final();

//   return decrypted.toString('utf8');
// }

// function getDataHash(data) {
//   const hash = crypto.createHash('sha256');
//   return hash.update(data).digest('hex');
// }

// const val = JSON.stringify({
//   version: 1,
//   data: [1, 2, 3],
// });


// const encryptedData = encrypt(val, '1234567');
// console.log(encryptedData);
// const decryptedData = decrypt(encryptedData.data, '1234567', encryptedData.salt, encryptedData.iv);
// console.log(decryptedData);


// class VaultClient {
//   constructor({ url }) {
//     this.url = url;
//   }

//   connect() {
//     this.ws = new WebSocket(this.url);

//     return new Promise((res) => {
//       this.ws.on('open', res);
//     });

//     // Could register handler functions
//   }

//   close() {
//     this.ws.close();
//   }

//   getBackup(password) {
//     return this.ws.call('getBackup', [password]);
//   }
// }

// const client = new VaultClient({
//   url: 'ws://localhost:8080'
// });

// client.connect().then(async () => {
//   const password = '123';
//   const walletBackup = await client.getBackup(password);

//   console.log(walletBackup);
// });
