import React from 'react';
import { shallow } from 'enzyme';
import { SkBackground } from './SkBackground';

describe('mobile-ui/SkBackground', () => {
  it('expect to render component', () => {
    shallow(<SkBackground />);
  });
});
