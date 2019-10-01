import Realm from 'realm';
import { setRealmImpl } from '@selfkey/wallet-core/db/realm-service';
import { registerModels } from '@selfkey/wallet-core/db/register-models';

registerModels();
setRealmImpl(Realm);
