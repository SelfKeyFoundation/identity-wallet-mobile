/**
 * Setup the identity vault for React native
 *
 *  Inject:
 * - Rn-keychain to handle keychain
 * - IdentityRealm to handle database
 *
 *  Desktop wallet can inject it's own implementation of database and keychain,
 *  just by following the same interface
 */
import { setDatabaseImpl, setKeychainImpl } from '@selfkey/wallet-core/identity-vault';
import { IdentityRealm } from './identity-realm';
import * as Keychain from './keychain';

setDatabaseImpl(IdentityRealm);
setKeychainImpl(Keychain);
