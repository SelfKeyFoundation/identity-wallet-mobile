import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
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
} from '@selfkey/mobile-ui';
import { ActivityIndicator } from 'react-native';
import ducks from '@selfkey/wallet-core/modules';

const ValidationFeedback = styled(Explanatory)`
  color: #00C0D9;
`;

const ERROR_MESSAGE_MAP = {
  address_not_found: 'Token contract does not exist. Please double check and try again.',
}

export const AddTokenModal = props => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState();
  const [isValidating, setIsValidating] = useState();
  const [address, setAddress] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [tokenPlaces, setTokenPlaces] = useState();
  const [error, setError] = useState();

  const isTokenValid = !!tokenSymbol;

  const validateAddress = debounce(useCallback((contractAddress) => {
    if (contractAddress === address) {
      return;
    }

    setError(false);
    setTokenSymbol(null);
    setTokenPlaces(null);
    setIsValidating(true);

    setTimeout(() => {
      dispatch(ducks.wallet.operations.validateTokenOperation({ contractAddress }))
        .then(res => {
          setTokenSymbol(res.symbol);
          setTokenPlaces(res.decimal);
          setError(null);
        })
        .catch(err => {
          setError(ERROR_MESSAGE_MAP[err.code] || err.message);
        })
        .finally(() => setIsValidating(false));
    }, 300);
  }, [address]), 300);

  const handleAddressChange = value => {
    const address = value.trim();
    setAddress(address)
    validateAddress(address)
  };

  const handleOk = useCallback(() => {
    setIsAdding(true);

    props.onAdd(address)
      .catch(err => {
        setError(ERROR_MESSAGE_MAP[err.code] || err.message);
      })
      .finally(() => setIsAdding(false));
  }, [address]);

  useEffect(() => {
    setTokenSymbol(null);
    setTokenPlaces(null);
    setAddress(null);
    setError(null);
  }, [props.visible]);

  return (
    <Modal
      { ...props }
      onOk={handleOk}
      title="Add ERC20 Token"
      okText="Add Token"
      okProps={{
        isLoading: isAdding
      }}
      cancelText="Cancel"
    >
      <Grid>
        <Row>
          <Col>
            <Explanatory>
              Add ERC20 tokens to be displayed in the dashboard. The SelfKey Wallet will verify it exists on the blockchain and auto-fill the remaining information.
            </Explanatory>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              error={!!error}
              errorMessage={error}
              feedback={isValidating && (
                <Row>
                  <Col>
                    <ActivityIndicator size="small" color="#00C0D9"/>
                  </Col>
                  <Col>
                    <ValidationFeedback>
                      Please wait. Checking the blockchain for ERC-20 token information.
                    </ValidationFeedback>
                  </Col>
                </Row>
              )}
              value={null}
              icon={isTokenValid && <SKIcon name="icon-check-bold" color="#50E3C2" size={20} />}
              placeholder="Address"
              label="Token Address"
              onChangeText={handleAddressChange}
              onSubmitEditing={props.onOk}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              value={tokenSymbol}
              placeholder=""
              label="Token Symbol"
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              value={tokenPlaces && `${tokenPlaces}`}
              placeholder=""
              label="Decimal Places"
              disabled
            />
          </Col>
        </Row>
      </Grid>
    </Modal>
  );
};

