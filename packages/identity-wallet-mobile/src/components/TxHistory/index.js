import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ducks from '@selfkey/wallet-core/modules';
import { TxHistory } from './TxHistory';
import { TransactionsEmptyAlert } from '../TransactionsEmptyAlert';
export { TxHistory };

const PAGE_SIZE = 4;

function parseItem(item) {
  return {
    tokenSymbol: "eth",
    tokenDecimal: 10,
    amount: '0.0001',
    status: 'sent',
    time: Date.now(), 
  }
}

export function TxHistoryHOC(props) {
  const transactions = useSelector(ducks.txHistory.selectors.getTransactions);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const handleLoadMore = useCallback(() => setVisibleCount(visibleCount + PAGE_SIZE));

  if (transactions.length === 0) {
    return (
      <TransactionsEmptyAlert tokenSymbol={props.tokenSymbol} />
    );
  }

  return (
    <TxHistory
      showLoadMore={transactions.length >= visibleCount}
      items={transactions.slice(0, visibleCount).map(parseItem)}
      onLoadMore={handleLoadMore}
    />
  )
}