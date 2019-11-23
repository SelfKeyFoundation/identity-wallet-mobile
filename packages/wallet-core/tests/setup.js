import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Realm from 'realm';
import { setRealmImpl } from '../db/realm-service';
import { registerModels } from '../db/register-models';

setRealmImpl(Realm);
registerModels();


// Inject db and keychain mock implementation
import '../identity-vault/mock/inject-test-vault';
// import console = require('console');
// import { initTestRealm } from './realm-setup';
// import { setupHDWallet } from '../modules/create-wallet/create-wallet-utils';

// async function init() {
//   await initTestRealm();
//   // cleanup db

//   await setupHDWallet({
//     password: 'test',
//     mnemonic: 'identify twenty rate region kind any ready sunset hungry gauge vicious convince',
//   });
// }


Enzyme.configure({ adapter: new Adapter() });
