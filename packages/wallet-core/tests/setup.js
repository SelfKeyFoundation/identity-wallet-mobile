import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { initTestRealm } from './realm-setup';

initTestRealm();

Enzyme.configure({ adapter: new Adapter() });
