import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import './test-setup';

Enzyme.configure({ adapter: new Adapter() });
