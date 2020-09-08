import React from 'react';
import {shallow} from 'enzyme';

import {AddTokenModal} from './AddTokenModal';

describe('AddTokenModal', () => {
  it('Expect to render without errors', () => {
    shallow(<AddTokenModal />);
  });
});