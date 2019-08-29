/**
 * @format
 */
import React from 'react';
import {shallow} from 'enzyme';

import App from './App';

it('renders correctly', () => {
  const wrapper = shallow(<App />);

  console.log(wrapper.debug());
});
