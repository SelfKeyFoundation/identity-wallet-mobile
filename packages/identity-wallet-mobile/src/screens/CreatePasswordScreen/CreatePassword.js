// @flow
import React, { useContext, useCallback } from 'react';
import { ScrollView } from 'react-native';
import {
  Explanatory,
  ScreenContainer,
  TextInput,
  SKIcon,
  Paragraph,
  ThemeContext,
  Container,
  Grid,
  Row,
  Col,
  Button,
  H3,
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';
import { ValidationCheck } from './ValidationCheck';

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

function getStrenghtMessage(value) {
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
  passwordStrenght: number;
}

const ContentGrid = styled(Grid)`
  flex: 1;
  min-height: 450px;
`;

const StrenghtRow = styled(Row)`
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
`;

export function CreatePassword(props: CreatePasswordProps) {
  const theme = useContext(ThemeContext);
  const passwordErrors = props.errors.password || [];
  const passwordInlineErrors = passwordErrors.filter(error => error === 'required');

  const handlePasswordChange = useCallback((value = '') => {
    const cleanedValue = value.replace(/[ \n]/g, '');
    props.onChange('password')(cleanedValue);
  });

  return (
    <ScreenContainer sidePadding>
      <Container withMargin scrollable>
        <ContentGrid>
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
                onSubmitEditing={props.onSubmit}
              />
            </Col>
          </InputRow>
          <StrenghtRow>
            <Col>
              <Explanatory>
                Password Strenght: {getStrenghtMessage(props.passwordStrenght)}
              </Explanatory>
            </Col>
          </StrenghtRow>
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
                onPress={props.onSubmit}
                type="full-primary"
              >
                Save Password
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
