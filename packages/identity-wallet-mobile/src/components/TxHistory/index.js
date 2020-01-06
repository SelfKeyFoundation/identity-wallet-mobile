import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ducks from '@selfkey/wallet-core/modules';
import { TxHistory } from './TxHistory';
import { TransactionsEmptyAlert } from '../TransactionsEmptyAlert';
export { TxHistory };

const PAGE_SIZE = 4;

function parseItem(item) {
  return {
    tokenSymbol: item.tokenSymbol,
    tokenDecimal: item.tokenDecimal,
    amount: item.value,
    status: item.status,
    time: item.timestamp 
  }
}

export function TxHistoryHOC(props) {
  const transactions = useSelector(ducks.txHistory.selectors.getTransactionsByToken(props.tokenSymbol));

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