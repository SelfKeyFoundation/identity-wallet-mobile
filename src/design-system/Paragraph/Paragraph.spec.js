import React from 'react';
import { shallow } from 'enzyme';
import { Paragraph } from './Paragraph';

describe('mobile-ui/Paragraph', () => {
  it('expect to render component', () => {
    shallow(<Paragraph>test</Paragraph>);
  });
});
