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
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';
import { ValidationCheck } from './ValidationCheck';
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

export function CreatePassword(props: CreatePasswordProps) {
  const theme = useContext(ThemeContext);
  const passwordErrors = props.errors.password || [];
  const passwordInlineErrors = passwordErrors.filter(error => error === 'required');

  const handlePasswordChange = useCallback((value = '') => {
    const cleanedValue = value.replace(/[ \n]/g, '');
    props.onChange('password')(cleanedValue);
  });

  const importOptions = [
    { key: 'import_backup_file', label: 'Import Backup File' },
    { key: 'import_from_desktop', label: 'Import from Desktop Application' }
  ];

  const handleSelectChange = (option) => {
    switch (option.key) {
      case 'import_from_desktop': {
        WalletTracker.trackEvent({
          category: `${TRACKER_PAGE}/importFromDesktop`,
          action: 'press',
          level: 'machine'
        });
        props.onImportFromDesktop();
        break;
      }
      case 'import_backup_file': {
        WalletTracker.trackEvent({
          category: `${TRACKER_PAGE}/importBackupFile`,
          action: 'press',
          level: 'machine'
        });
        props.onImportBackupFile();
        break;
      }
      case 'enter_recovery_phrase': {
        WalletTracker.trackEvent({
          category: `${TRACKER_PAGE}/enterRecoveryPhrase`,
          action: 'press',
          level: 'machine'
        });
        props.onEnterRecoveryPhrase();
        break;
      }
    }
  }

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
                Set a password to unlock your
              </PageTitle>
              <PageTitle align="center">
                SelfKey Identity Wallet
              </PageTitle>
            </TitleCol>
          </Row>
          <InputRow>
            <Col>
              <TextInput
                error={passwordInlineErrors.length}
                errorMessage={errorMessages[passwordInlineErrors[0]]}
                value={props.values.password}
                placeholder="Password"
                label="Set Password"
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
                onSubmitEditing={handleTextSubmit}
              />
            </Col>
          </InputRow>
          <StrengthRow>
            <Col>
              <Explanatory>
                Password Strength: {getStrengthMessage(props.passwordStrength)}
              </Explanatory>
            </Col>
          </StrengthRow>
          {
            PasswordRequirements.map((item) => (
              <ValidationCheck
                key={item.id}
                errors={passwordErrors}
                hasValue={!!props.values.password}
                theme={theme}
                text={item.text}
                id={item.id}
              />
            ))
          }
        </ContentGrid>
        <Grid>
          <Row>
            <Col>
              <Button
                onPress={handleSubmit}
                type="full-primary"
              >
                Save Password
              </Button>
            </Col>
          </Row>
          { props.onImportBackupFile &&
            <React.Fragment>
              <Row>
                <Col>
                  <OrText>or</OrText>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ModalSelector
                    data={importOptions}
                    cancelText="Cancel"
                    onChange={handleSelectChange}
                  >
                    <TouchableWithoutFeedback>
                      <UseDifferentWallet>
                        Import Existing Wallet
                      </UseDifferentWallet>
                    </TouchableWithoutFeedback>
                  </ModalSelector>
                </Col>
              </Row>
            </React.Fragment>
          }
        </Grid>
        
      </Container>
    </ScreenContainer>
  );
}
