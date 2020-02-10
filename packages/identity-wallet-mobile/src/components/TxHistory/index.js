import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ducks from '@selfkey/wallet-core/modules';
import { TxHistory } from './TxHistory';
import { TransactionsEmptyAlert } from '../TransactionsEmptyAlert';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
export { TxHistory };

const PAGE_SIZE = 4;

const parseItem = (item) => {
  return {
    hash: item.hash,
    tokenSymbol: item.tokenSymbol,
    tokenDecimal: item.tokenDecimal,
    amount: item.value,
    status: item.status,
    timeStamp: item.timeStamp 
  };
};

export function TxHistoryHOC(props) {
  const transactions = useSelector(ducks.txHistory.selectors.getTransactionsByToken(props.tokenSymbol));
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const handleLoadMore = useCallback(() => setVisibleCount(visibleCount + PAGE_SIZE));

  if (transactions.length === 0) {
    return (
      <TransactionsEmptyAlert tokenSymbol={props.tokenSymbol} />
    );
  }

  const handleTxDetails = useCallback((item) => {
    dispatch(ducks.modals.actions.showModal(Routes.MODAL_TRANSACTION_DETAILS, {
      hash: item.hash,
    }));
  }, []);

  return (
    <TxHistory
      showLoadMore={transactions.length >= visibleCount}
      items={transactions.slice(0, visibleCount).map(parseItem)}
      onLoadMore={handleLoadMore}
      onItemPress={handleTxDetails}
    />
  )
}