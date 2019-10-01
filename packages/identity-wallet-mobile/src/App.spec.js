/**
 * @format
 */
import React from 'react';
import {shallow} from 'enzyme';

import {App} from './App';

describe('App', () => {
  it('Expect to render without errors', () => {
    shallow(<App />);
  });

  it('Expect to render Navigation', () => {
    const wrapper = shallow(<App isLoading={false} />);
    expect(wrapper.find('NavigationContainer')).toHaveLength(1);
  });

  it('Expect to render LoadingScreen', () => {
    const wrapper = shallow(<App isLoading={true} />);
    expect(wrapper.find('LoadingScreen')).toHaveLength(1);
  });
});
