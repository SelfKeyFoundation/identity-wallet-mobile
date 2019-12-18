import React from 'react';
import { shallow } from 'enzyme';
import { ReceiveTokens } from './ReceiveTokens';

test('expect to render ReceiveTokens component', () => {
  const wrapper = shallow(
    <ReceiveTokens
      tokenName="KEY"
      tokenAddress="0x4ac0d9ebd28118cab68a64ad8eb8c07c0120ebf8"
    />
  )
})