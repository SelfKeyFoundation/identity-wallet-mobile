import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ducks from '@selfkey/wallet-core/modules';
import { TxHistory } from './TxHistory';
import { TransactionsEmptyAlert } from '../TransactionsEmptyAlert';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
export { TxHistory };
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'txHistory';
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

const TokenTransactions = ({ tokenSymbol, children }) => {
  const transactions = useSelector(ducks.txHistory.selectors.getTransactionsByToken(tokenSymbol));

  if (transactions.length === 0) {
    return <TransactionsEmptyAlert tokenSymbol={tokenSymbol} />
  }

  return children({ transactions });
}

const AllTransactions = ({ children }) => {
  const transactions = useSelector(ducks.txHistory.selectors.getTransactions);


  if (transactions.length === 0) {
    return null;
  }

  return children({ transactions });
}

export function TxHistoryContainer(props) {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const handleLoadMore = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/loadMoreButton`,
      action: 'press',
      level: 'wallet'
    });
    setVisibleCount(visibleCount + PAGE_SIZE);
  });

  const handleTxDetails = useCallback((item) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/txDetails`,
      action: 'press',
      level: 'wallet'
    });

    dispatch(ducks.modals.actions.showModal(Routes.MODAL_TRANSACTION_DETAILS, {
      hash: item.hash,
    }));
  }, []);

  const renderTxHistory = ({ transactions }) => (
    <TxHistory
      showLoadMore={transactions.length >= visibleCount}
      items={transactions.slice(0, visibleCount).map(parseItem)}
      onLoadMore={handleLoadMore}
      onItemPress={handleTxDetails}
    />
  )

  if (props.tokenSymbol) {
    return (
      <TokenTransactions
        tokenSymbol={props.tokenSymbol}
      >
        {({ transactions }) => renderTxHistory({ transactions })}
      </TokenTransactions>
    )
  }

  return (
    <AllTransactions>
      {({ transactions }) => renderTxHistory({ transactions })}
    </AllTransactions>
  )
}