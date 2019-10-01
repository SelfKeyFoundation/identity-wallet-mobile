/**
 * @format
 */
import React from 'react';
import {shallow} from 'enzyme';

import {Root} from './Root';

describe('Root', () => {
  it('Expect to render without errors', () => {
    shallow(<Root />);
  });
});
