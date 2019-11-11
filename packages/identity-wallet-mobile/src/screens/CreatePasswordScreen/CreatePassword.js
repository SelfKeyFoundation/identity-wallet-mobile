// @flow
import React, { useContext } from 'react';
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
  DefinitionTitle
} from '@selfkey/mobile-ui';
import { View } from 'react-native';
import { getErrorMessage } from './validation-utils';

function Check({ errors, hasValue, theme, text, id }) {
  const hasError = !hasValue || errors.find(error => error === id);

  return (
    <Row>
      <Col style={{ width: 25 }}>
        <SKIcon
          name="icon-shield-check"
          color={hasError ? theme.colors.disabled : theme.colors.success}
          size={16}
        />
      </Col>
      <Col style={{ width: '100%' }}>
        <Explanatory>{text}</Explanatory>
      </Col>
    </Row>
  );
}

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

  return 'Weak'
}

export function CreatePassword(props: any) {
  const theme = useContext(ThemeContext);
  const passwordErrors = props.errors.password || [];
  const passwordInlineErrors = passwordErrors.filter(error => error === 'required');

  return (
    <ScreenContainer sidePadding>
      <Container withMargin>
        <Grid style={{ flex: 1, minHeight: 450 }}>
          <Row>
            <Col style={{ alignItems: 'center' }}>
              <SKIcon name="icon-password" color={theme.colors.primary} size={66} />
            </Col>
          </Row>
          <Row>
            <Col style={{ justifyContent: 'center' }}>
              <H3 style={{ textAlign: 'center' }}>
                Set a password to unlock your
              </H3>
              <H3 style={{ textAlign: 'center' }}>
                SelfKey Identity Wallet
              </H3>
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }}>
            <Col>
              <TextInput
                error={passwordInlineErrors.length}
                errorMessage={errorMessages[passwordInlineErrors[0]]}
                value={props.values.password}
                placeholder=""
                label="Set Password"
                onChangeText={props.onChange('password')}
                secureTextEntry={true}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 5 }}>
            <Col>
              <Explanatory>
                Password Strenght: {getStrenghtMessage(props.passwordStrenght)}
              </Explanatory>
            </Col>
          </Row>
          {
            PasswordRequirements.map((item) => (
              <Check
                errors={passwordErrors}
                hasValue={!!props.values.password}
                theme={theme}
                text={item.text}
                id={item.id}
              />
            ))
          }
        </Grid>
        <Grid>
          <Row>
            <Col>
              <Button onPress={props.onSubmit}>
                Save Password
              </Button>
            </Col>
          </Row>
          {
            // <Row>
            //   <Col>
            //     <DefinitionTitle style={{ textAlign: 'center' }}>
            //       Or
            //     </DefinitionTitle>
            //   </Col>
            // </Row>
            // <Row>
            //   <Col>
            //     <Button type="link">
            //       Import Existing Wallet
            //     </Button>
            //   </Col>
            // </Row>
          }
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
