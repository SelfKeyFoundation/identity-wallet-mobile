import React from 'react';
import { shallow } from 'enzyme';

import { TxHistoryRow } from './index';

describe('TxHistoryRow', () => {
  it('Expect to render without errors', () => {
    const wrapper = shallow(
      <TxHistoryRow
        tokenSymbol="eth"
        status="sent"
      />
    );
  });
});
