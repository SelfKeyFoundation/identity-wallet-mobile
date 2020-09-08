import React from 'react';
import { shallow } from 'enzyme';
import { SkLogo } from './SkLogo';

describe('mobile-ui/SkLogo', () => {
  it('expect to render component', () => {
    shallow(<SkLogo />);
  });
});
