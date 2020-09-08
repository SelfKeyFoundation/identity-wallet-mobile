import React from 'react';
import { shallow } from 'enzyme';
import { LoadingScreen } from './LoadingScreen';

describe('mobile-wallet/screens/LoadingScreen', () => {
  it('expect to render LoadingScreen', () => {
    shallow(<LoadingScreen />);
  });
});
