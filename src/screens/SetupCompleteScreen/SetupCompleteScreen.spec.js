import React from 'react';
import { shallow } from 'enzyme';
import { SetupCompleteScreen } from './SetupCompleteScreen';

describe('mobile-wallet/screens/SetupCompleteScreen', () => {
  it('expect to render SetupCompleteScreen', () => {
    shallow(<SetupCompleteScreen />);
  });
});
