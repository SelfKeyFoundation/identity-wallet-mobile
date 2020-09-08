// @flow
import React, { useContext, useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import {
  Explanatory,
  ScreenContainer,
  TextInput,
  SKIcon,
  Paragraph,
  ThemeContext,
  Container,
  DefinitionTitle,
  Link,
  Grid,
  Row,
  Col,
  Button,
  H3,
} from 'design-system';
import styled from 'styled-components/native';
import ModalSelector from 'react-native-modal-selector'
import { getConfigs, onConfigChange } from '@selfkey/configs';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'chooseDifferentWallet';

const PasswordRequirements = [{
  id: 'min_value',
  text: 'At least 8 characters',
}, {
  id: 'both_cases',
  text: 'Contains both upper case and lower case letters',
}, {
  id: 'symbol_and_number',
  text: 'Contains a symbol and a number',
}];

const errorMessages = {
  required: 'Password is required',
};

function getStrengthMessage(value) {
  if (value > 0.8) {
    return 'Strong';
  }

  if (value > 0.5) {
    return 'Medium';
  }

  return 'Weak';
}

export interface CreatePasswordProps {
  errors: any,
  values: any,
  onChange: (value: string) => void,
  onSubmit: () => void,
  passwordStrength: number;
}

const ContentGrid = styled(Grid)`
  flex: 1;
  min-height: 450px;
`;

const StrengthRow = styled(Row)`
  margin-bottom: 5px;
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

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

const IconContainer = styled.View`
  position: absolute;
  top: -27px;
  left: -23px;
`;

const UseDifferentWallet = styled(Link)`
  text-transform: uppercase;
  width: 100%;
  font-size: 14px;  
  text-align: center;
`;

const OrText = styled(DefinitionTitle)`
  color: white;
  font-size: 14px;
  text-align: center;
`;

export function ImportFromSeed(props: CreatePasswordProps) {
  const theme = useContext(ThemeContext);
  const handleSubmit = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/savePasswordButton`,
      action: 'press',
      level: 'machine'
    });

    props.onSubmit();
  }

  const handleTextSubmit = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/passwordInput`,
      action: 'submit',
      level: 'machine'
    });

    props.onSubmit();
  }

  return (
    <ScreenContainer sidePadding>
      <Container withMargin scrollable>
        <ContentGrid>
          { props.onBack && <IconContainer>
            <TouchableWithoutFeedback onPress={props.onBack}>
              <BackIcon name="icon-nav-ar-left" size={12} color="#fff" />
            </TouchableWithoutFeedback>
          </IconContainer> }
          <Row>
            <IconCol>
              <SKIcon name="icon-password" color={theme.colors.primary} size={66} />
            </IconCol>
          </Row>
          <Row>
            <TitleCol>
              <PageTitle align="center">
                Enter the seed phrase to create your
              </PageTitle>
              <PageTitle align="center">
                SelfKey Identity Wallet
              </PageTitle>
            </TitleCol>
          </Row>
          <InputRow>
            <Col>
              <TextInput
                error={props.error}
                errorMessage={props.error}
                value={props.mnemonicPhrase}
                placeholder="Enter your seed phrase"
                label="Seed phrase"
                onChangeText={props.onMnemonicChange}
                onSubmitEditing={handleTextSubmit}
              />
            </Col>
          </InputRow>
        </ContentGrid>
        <Grid>
          <Row>
            <Col>
              <Button
                onPress={handleSubmit}
                isLoading={props.isLoading}
                type="full-primary"
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
