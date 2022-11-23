import React, { useCallback, useMemo, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from 'core/utils/validation-utils';
import { TransactionDetails } from '../../components';
import { navigate, Routes, navigateBack } from 'core/navigation';
import { getUsdPrice } from 'blockchain/services/price-service';
import ducks from 'core/modules';
import styled from 'styled-components/native';
import EthUtils from 'blockchain/util/eth-utils';
import { Linking, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { WalletTracker } from '../../WalletTracker';
import {
  ScreenContainer,
  TextInput,
  Modal,
  SKIcon,
  Paragraph,
  Explanatory,
  ThemeContext,
  Container,
  Grid,
  Row,
  Col,
  Button,
  H3,
  Alert,
  Ammount,
  DefinitionTitle,
  FormattedNumber
} from 'design-system';
import modules from 'core/modules';
import { DIDService } from 'core/services/did-service';
import EthGasStationService from 'blockchain/services/eth-gas-station-service';
import EthUnits from 'blockchain/util/eth-units';
import { NetworkStore } from 'core/modules/app/NetworkStore';


const ContentGrid = styled(Grid)`
  flex: 1;
  min-height: 450px;
`;

const InputRow = styled(Row)`
  margin-top: 30px;
`;

const IconCol = styled(Col)`
  align-items: center;
`;

const TitleCol = styled(Col)`
  justify-content: center;
`;

const PageTitle = styled(H3)`
  text-align: center;
  padding-top: 5px;
`;

const IconContainer = styled(View)`
  position: absolute;
  top: -2px;
  left: -8px;
`;

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

const Header = styled(View)`
  margin: 10px 20px 40px 20px;
`;

const Body = styled(Container)`
  margin: 0 35px 35px 35px;
`;

const Divider = styled(View)`
  border: 0 solid #475768;
  border-bottom-width: 1px;
  height: 1px;
`;

export function RegisterDIDScreen(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState();
  const address = useSelector(modules.wallet.selectors.getAddress);
  const [fees, setFees] = useState(null);
  const didStatus = useSelector(ducks.identity.selectors.getDIDStatus);
  const [error, setError] = useState();

  useEffect(() => {
    setFees(null);

    DIDService
      .getInstance()
      .getGasLimit(address)
      .then(async (gasLimit) => {
        const { fast: gasPrice } = await EthGasStationService.getInstance().getInfo();
        const ethFee = EthUnits.toEther(gasPrice * gasLimit, 'mwei');
        const usdFee = getUsdPrice(ethFee);

        setFees({
          ethFee,
          usdFee,
        });
      })
  }, [address]);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    dispatch(ducks.identity.operations.createDIDOperation())
      .then(navigateBack)
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const handleCloseModal = () => {
    navigateBack();
  }

  return (
    <ScreenContainer sidePadding>
      <Header>
        <IconContainer>
          <TouchableWithoutFeedback onPress={navigateBack}>
            <BackIcon name="icon-nav-ar-left" size={12} color="#fff" />
          </TouchableWithoutFeedback>
        </IconContainer>
      </Header>
      <Body scrollable>
        <ContentGrid>
          <Grid>
            <Row justifyContent="center" marginBottom={15} marginTop={5}>
              <Col noPadding autoWidth>
                <SKIcon name="icon-payment-large" color="#0ABBD0" size={62} />
              </Col>
            </Row>
            <Row justifyContent="center" marginBottom={15}>
              <Col noPadding autoWidth>
                <H3>Register DID</H3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Paragraph style={{ fontSize: 15 }}>
                  Getting your DID and registering on the SelfKey Network requires an Ethereum transaction. This is a one time only transaction.
                </Paragraph>
              </Col>
            </Row>
            <Divider />
            <Row marginTop={15} marginBottom={15}>
              <Col>
                <DefinitionTitle>
                  Network Transaction Fee
                </DefinitionTitle> 
              </Col>
              {fees ? (
                <Col>
                  <Ammount style={{ textAlign: 'right', marginBottom: 5, fontSize: 20  }}>
                    {FormattedNumber({
                      value: fees.usdFee,
                      currency: 'usd'
                    })}
                  </Ammount>
                  <DefinitionTitle style={{ fontSize: 15, textAlign: 'right' }}>
                  {FormattedNumber({
                      value: fees.ethFee,
                      currency: NetworkStore.getNetwork().symbol,
                      decimal: NetworkStore.getNetwork().tokenDecimal
                    })}
                  </DefinitionTitle> 
                </Col>
              ) : <Col><ActivityIndicator /></Col> }
            </Row>
            <Divider />
            { error ? <Grid>
              <Row marginTop={10}>
                <Col>
                  <Alert type="error">
                    { error }
                  </Alert>
                </Col>
              </Row>
            </Grid> : null }
            <Row marginBottom={5} marginTop={15}>
              <Col>
                <Button
                  onPress={handleSubmit}
                  isLoading={isLoading}
                >
                  GET DID
                </Button>
              </Col>
            </Row>
          </Grid>
        </ContentGrid>
        <Modal
          visible={didStatus === 'processing'}
          title="Processing"
          footer={null}
          onClose={handleCloseModal}
        >
          <Grid>
            <Row justifyContent="center" marginBottom={9}>
              <Col noPadding autoWidth>
                <SKIcon name="icon-hourglass-large" size={66} color="#93B0C1" />
              </Col>
            </Row>
            <Row justifyContent="center" marginBottom={15}>
              <Col noPadding autoWidth>
                <H3>Transaction Pending</H3>
              </Col>
            </Row>
            <Row justifyContent="center" marginBottom={8} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Col>
                <Paragraph>Your transaction is pending. The time it takes to complete will depend on the amount of network traffic.</Paragraph>
              </Col>
            </Row>
          </Grid>
        </Modal>
      </Body>
    </ScreenContainer>
  );
} 
