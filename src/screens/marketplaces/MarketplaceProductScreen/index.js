import React, { useEffect } from 'react';
import { ScreenContainer, Typography } from 'design-system';
import { navigateBack } from 'core/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { mkpOperations, mkpSelectors } from '../mkpSlice';
import ProductDetailsIncorporations from './ProductDetailsIncorporations';
import ProductDetailsExchanges from './ProductDetailsExchanges';
import ProductDetailsKeyFi from './ProductDetailsKeyFi';
import { BalanceErrorModal } from './BalanceErrorModal';
import { ConfirmationModal } from './ConfirmationModal';
import { ChecklistModal } from './ChecklistModal';
import { PaymentModal } from './PaymentModal';
import { PaymentProgressModal } from './PaymentProgressModal';

const DetailsComponentMapping = {
  incorporations: ProductDetailsIncorporations,
  exchanges: ProductDetailsExchanges,
  keyfi: ProductDetailsKeyFi,
}

const DetailsNotFound = () => <Typography>Invalid Category</Typography>;

export default function MarketplaceProductScreen(props) {
  const dispatch = useDispatch();
  const skuId = props.navigation.getParam('sku');
  const categoryId = props.navigation.getParam('categoryId');  
  const isLoadig = useSelector(mkpSelectors.getProductLoading);
  const details = useSelector(mkpSelectors.getProductDetails);
  const DetailsComponent = DetailsComponentMapping[categoryId] || DetailsNotFound;
  const lastApplication = useSelector(mkpSelectors.getLastApplication);
  const showConfirmationModal = useSelector(mkpSelectors.getShowConfirmationModal);
  const showBalanceErrorModal = useSelector(mkpSelectors.getShowBalanceErrorModal);
  const showChecklistModal = useSelector(mkpSelectors.getShowChecklistModal);
  const showPaymentModal = useSelector(mkpSelectors.getShowPaymentModal);
  const showPaymentProgressModal = useSelector(mkpSelectors.getShowPaymentProgressModal);
  const paymentInProgress = useSelector(mkpSelectors.getPaymentInProgress);
  const price = useSelector(mkpSelectors.getPrice);
  const handlePay = () => dispatch(mkpOperations.payApplication());

  useEffect(() => {
		dispatch(mkpOperations.loadProduct(categoryId, skuId));
  }, [skuId, categoryId]);

  if (isLoadig) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="small" color="#00C0D9"/>
      </ScreenContainer>
    )
  }

  if (showChecklistModal) {
    return <ChecklistModal />;
  }

  return (
    <React.Fragment>
      {
        showBalanceErrorModal ? (
          <BalanceErrorModal />
        ) : null
      }
      {
        showConfirmationModal ? (
          <ConfirmationModal />
        ) : null
      }
      {
        showPaymentModal ? (
          <PaymentModal />
        ) : null
      }
      {
        showPaymentProgressModal ? (
          <PaymentProgressModal />
        ) : null
      }
      <DetailsComponent
        details={details}
        price={price}
        onBack={navigateBack}
        lastApplication={lastApplication}
        paymentInProgress={paymentInProgress}
        onPay={handlePay}
      />
    </React.Fragment>
  )
}
