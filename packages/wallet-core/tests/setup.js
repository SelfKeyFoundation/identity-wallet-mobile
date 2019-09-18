import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Realm from 'realm';
import { setRealmImpl, initRealm } from '../db/realm-service';
import { registerModels } from '../db/register-models';

setRealmImpl(Realm);
registerModels();
initRealm({
  inMemory: true,
});

Enzyme.configure({ adapter: new Adapter() });
