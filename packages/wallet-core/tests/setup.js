import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { registerModels } from '../db/register-models';
import * as TestKeychain from '@selfkey/wallet-core/identity-vault/mock/keychain-mock';
import { setDatabaseImpl, setKeychainImpl} from '@selfkey/wallet-core/identity-vault';
import { IdentityRealm } from '@selfkey/wallet-core/identity-vault/identity-realm';
import Realm from 'realm';
import { setRealmImpl } from '../db/realm-service';

setDatabaseImpl(IdentityRealm);
setKeychainImpl(TestKeychain);
setRealmImpl(Realm);

registerModels();

Enzyme.configure({ adapter: new Adapter() });
