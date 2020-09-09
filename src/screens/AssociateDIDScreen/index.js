import React, { useCallback, useMemo, useState} from 'react';
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
import { Linking, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
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
  Alert
} from 'design-system';
import modules from 'core/modules';

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

const IconContainer = styled.View`
  position: absolute;
  top: -2px;
  left: -8px;
`;

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

const Header = styled.View`
  margin: 10px 20px 40px 20px;
`;

const Body = styled(Container)`
  margin: 0 35px 35px 35px;
`;

const Divider = styled.View`
  border: 0 solid #475768;
  border-bottom-width: 1px;
  height: 1px;
`;

export function AssociateDIDScreen(props) {
  // const { visible, onBack } = props;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState();
  const [did, setDID] = useState();
  const [error, setError] = useState();

  const handleSubmit = () => {
    setLoading(true);
    setError(null);

    dispatch(modules.identity.operations.updateDIDOperation(did))
      .then(navigateBack)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleChange = (text) => setDID(text);

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
          <Row justifyContent="center" marginBottom={15} marginTop={5}>
            <Col noPadding autoWidth>
              <SKIcon name="icon-merge-large" color="#0ABBD0" size={62} />
            </Col>
          </Row>
          <Row justifyContent="center" marginBottom={15}>
            <Col noPadding autoWidth>
              <H3>Associate DID</H3>
            </Col>
            
          </Row>
          <Row>
            <Col>
              <Paragraph style={{ fontSize: 15 }}>
                If you already registered on the SelfKey Network, you can associate your existing DID number with this wallet. Just copy/paste it below.
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                label="DID Number"
                placeholder="did:selfkey"
                value={did}
                onChangeText={handleChange}
                required
                error={!!error}
                errorMessage={error}
              />
            </Col>
          </Row>
          <Row marginTop={10}>
            <Col>
              
            </Col>
          </Row>
          <Row marginBottom={5}>
            <Col>
              <Button
                onPress={handleSubmit}
                isLoading={isLoading}
                disabled={!did}
              >
                Associate DID
              </Button>
            </Col>
          </Row>
        </ContentGrid>
    </Body>
  </ScreenContainer>
  );
}
