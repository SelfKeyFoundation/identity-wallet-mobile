import Realm from 'realm';
import { setRealmImpl } from 'core/db/realm-service';
import { registerModels } from 'core/db/register-models';


console.log('load db non web')
registerModels();
setRealmImpl(Realm);
