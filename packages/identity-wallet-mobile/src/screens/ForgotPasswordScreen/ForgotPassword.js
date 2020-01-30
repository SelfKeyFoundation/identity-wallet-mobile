// @flow
import React, { useContext, useCallback } from 'react';
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

export interface ForgotPasswordProps {
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

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

const IconContainer = styled.View`
  position: absolute;
  top: -27px;
  left: -23px;
`;

const PageDescription = styled(Paragraph)`
  text-align: center;
  font-size: 16px;
  line-height: 24px;
`;

export function ForgotPassword(props: ForgotPasswordProps) {
  const theme = useContext(ThemeContext);

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
              <SKIcon name="icon-password-forgot" color={theme.colors.primary} size={66} />
            </IconCol>
          </Row>
          <Row>
            <TitleCol>
              <PageTitle align="center">
                Forgot Password?
              </PageTitle>
            </TitleCol>
          </Row>
          <Row marginBottom={10}>
            <TitleCol>
              <PageDescription>
                Restore access to your wallet by using your 12 word recovery phrase, that you backed up during wallet creation.
              </PageDescription>
            </TitleCol>
          </Row>
          <InputRow>
            <Col>
              <TextInput
                error={props.error}
                errorMessage={props.error}
                value={props.mnemonic}
                placeholder="12 word phrase"
                label="Recovery Phrase"
                onChangeText={props.onChange}
                onSubmitEditing={props.onSubmit}
              />
            </Col>
          </InputRow>
        </ContentGrid>
        <Grid>
          <Row>
            <Col>
              <Button
                onPress={props.onSubmit}
                type="full-primary"
                isLoading={props.isLoading}
              >
                Restore Wallet
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
