import { setDatabaseImpl, setKeychainImpl, createVault} from '../index';
import { IdentityRealm } from '../identity-realm';
import * as TestKeychain from './keychain-mock';

setDatabaseImpl(IdentityRealm);
setKeychainImpl(TestKeychain);
