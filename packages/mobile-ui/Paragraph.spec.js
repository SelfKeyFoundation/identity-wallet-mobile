import React from 'react';
import { shallow } from 'enzyme';
import { Paragraph } from './Paragraph';

describe('MobileUI: Components', () => {
  describe('Text', () => {
    it('expect to render component', () => {
      const wrapper = shallow(<Paragraph>test</Paragraph>);
      expect(wrapper.find('Text')).toHaveLength(1);
    });
  });
});
