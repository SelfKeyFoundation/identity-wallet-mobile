/**
 * @flow
 */

import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import {
  ScreenContainer,
  Modal,
  Button,
  SKIcon,
  Grid,
  Col,
  Row,
  Alert,
  ThemeContext,
  Paragraph,
  Explanatory,
  Link,
  DefinitionTitle,
  ExplanatorySmall,
  FormLabel,
  TextInput,
  H3,
  FormattedNumber,
} from '@selfkey/mobile-ui';
import { SelectBox } from '../index';
import { type Token } from '@selfkey/wallet-core/types/Token';

const Body = styled.View`
  padding: 15px 15px 40px 15px;
`;

const LinkButtonWrapper = styled.TouchableWithoutFeedback`
  flex-direction: row;
`;

const TransactionFeeGrid = styled(Grid)`
  border-color: #475768;
  border-top-width: 1px;
  margin-top: 29px;
  padding-top: 25px;
`;

const AdvancedOptionsContainer = styled.View`
  margin-top: 15px;
`;

const TabsRow = styled(Row)`
  border-color: #1D505F;
  border-width: 1px;
  border-radius: 4px;
  background: #293743;
`;

const TabItem = styled(Col)`
  padding: 10px 15px;
  border-width: 2px;
  border-color: ${({ selected }) => selected ? '#00C0D9' : 'transparent'}
`;

export interface SendTokensProps {
  tokens: Token[],
  advancedMode: boolean,
  transactionFeeOptions: TransactionFee[],
  selectedTransactionFee: string,
  onAdvancedPress: Function,
  onQRCodePress: Function,
  onCancel: Function,
  onSend: Function,
  onTransactionFeeSelect: (selectedId: string) => void,
  onMaxPress: Function,
  onChange: (fieldName: string, value: string) => void,
  errors: {
    address?: string,
    transaction?: string,
  },
};

export type TransactionFee = {
  id: string,
  name: string,
  ethAmount: number,
  fiatAmount: number,
  time: string,
};


export interface TransactionTabsProps {
  options: TransactionFee[],
  selected: string,
};

export function TransactionFeeSwitcher(props: TransactionTabsProps) {
  return (
    <Grid>
      <TabsRow>
        {
          props.options.map((option) => {
            const handleSelect = useCallback(() => {
              props.onSelect(option.id);
            }, [option.id]);
      
            return (
              <TouchableWithoutFeedback onPress={handleSelect}>
                <TabItem selected={option.id === props.selected} >
                  <H3 style={{ marginBottom: 4 }}>{option.name}</H3>
                  <ExplanatorySmall>
                    <FormattedNumber
                      currency="eth"
                      decimal={10}
                      value={option.ethAmount}
                    /> /
                  </ExplanatorySmall>
                  <ExplanatorySmall>
                    <FormattedNumber
                      currency="usd"
                      decimal={3}
                      value={option.fiatAmount}
                    />
                  </ExplanatorySmall>
                </TabItem>
              </TouchableWithoutFeedback>
            );
          })
        }
      </TabsRow>
      <Row>
        {
          props.options.map((option) => (
            <TabItem>
              <ExplanatorySmall style={{ textAlign: 'center'}}>
                {option.time}
              </ExplanatorySmall>  
            </TabItem>
          ))
        } 
      </Row>
    </Grid>
  );
}

function getTokenLabel(token) {
  if (!token) {
    return;
  }

  const symbol = token.symbol && token.symbol.toUpperCase()

  if (!token.name) {
    return symbol;
  }

  return `${symbol} - ${token.name}`;
}

export function SendTokens(props: SendTokensProps) {
  const { errors = {}, data, tokens, transactionFeeOptions, tokenDetails, tokenOptions } = props;
  const { token } = data;
  const handleChange = (fieldName) => (value) => props.onChange(fieldName, value);

  const selectedTransactionFee = transactionFeeOptions.find(item => item.id === data.transactionFee);

  return (
    <Body>
      <Grid>
        <Row>
          <Col>
            { tokenDetails && !tokenOptions && <TextInput
              value={getTokenLabel(tokenDetails)}
              label="Token"
              disabled
              labelStyle={{
                color: '#ADC8D8'
              }}
            /> }
            {
              tokenOptions && (
                <SelectBox
                  label="Select a token"
                  onValueChange={props.onTokenSelect}
                  selectedValue={tokenDetails && tokenDetails.symbol && tokenDetails.symbol.toUpperCase()}
                  placeholder="Select a token"
                  items={tokenOptions.map(token => ({
                    label: getTokenLabel(token),
                    value: token.symbol && token.symbol.toUpperCase(),
                  }))}
                />
              )
            }
          </Col>
        </Row>
        { tokenDetails && <Row justifyContent="center" marginTop={15}>
          <Col autoWidth>
            <DefinitionTitle>
              Available
            </DefinitionTitle>
          </Col>
          <Col autoWidth>
            <H3>
              <FormattedNumber
                currency={tokenDetails.symbol}
                value={tokenDetails.amount}
              />
            </H3>
          </Col>
        </Row>}
        <Row alignBottom>
          <Col>
            <TextInput
              label="Amount"
              placeholder="0"
              value={data.amount}
              onChangeText={handleChange('amount')}
            />
          </Col>
          <Col autoWidth>
            <Button type="shell-primary" onPress={props.onMaxPress}>
              Max
            </Button>
          </Col>
        </Row>
        <Row>
          <Col paddingTop={0}>
            <Explanatory>
              <FormattedNumber
                currency="usd"
                value={data.fiatAmount}
              />
            </Explanatory>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              label="Send To"
              placeholder="0x"
              icon={<SKIcon name="icon-menu-qr" color="#00C0D9" size={20} onPress={props.onQRCodePress}/>}
              error={errors.address}
              errorMessage={errors.address}
              value={data.address}
              onChangeText={handleChange('address')}
            />
          </Col>
        </Row>
      </Grid>
      <TransactionFeeGrid>
        <Row>
          <Col>
            <DefinitionTitle>
              Network
            </DefinitionTitle>
            <DefinitionTitle>
              Transaction Fee:
            </DefinitionTitle>
          </Col>
          <Col>
            <H3 style={{ textAlign: 'right' }}>
              <FormattedNumber
                currency="eth"
                decimal={10}
                value={selectedTransactionFee.ethAmount}
              /> /
            </H3>
            <H3 style={{ textAlign: 'right' }}>
              <FormattedNumber
                currency="usd"
                decimal={3}
                value={selectedTransactionFee.fiatAmount}
              />
            </H3>
          </Col>
        </Row>
        <Row justifyContent="flex-end">
          <Col autoWidth>
            <LinkButtonWrapper onPress={props.onAdvancedPress}>
              <Row>
                <Col>
                  <Link>Advanced</Link>
                </Col>
                <Col paddingTop={13}>
                  <SKIcon name="icon-expand" color="#00C0D9" size={11} />  
                </Col>
              </Row>
            </LinkButtonWrapper>
          </Col>
        </Row>
      </TransactionFeeGrid>
      { props.advancedMode && (
        <AdvancedOptionsContainer>
          <TransactionFeeSwitcher
            options={props.transactionFeeOptions}
            selected={data.transactionFee}
            onSelect={handleChange('transactionFee')}
          />
        </AdvancedOptionsContainer>
      )}
      {
        errors.transaction && (
          <Grid>
            <Row>
              <Col>
                <Alert type="error">
                  { errors.transaction }
                </Alert>
              </Col>
            </Row>
          </Grid>
        )
      }
      <Grid>
        <Row justifyContent="flex-end" marginTop={20}> 
          <Col autoWidth>
            <Button type="shell-primary" onPress={props.onCancel}>Cancel</Button>
          </Col>
          <Col autoWidth>
            <Button
              type="full-primary"
              onPress={props.onSend}
              disabled={!props.canSend}
            >
              Send {tokenDetails && tokenDetails.symbol}
            </Button>
          </Col>
        </Row>
      </Grid>
    </Body>
  );
}
