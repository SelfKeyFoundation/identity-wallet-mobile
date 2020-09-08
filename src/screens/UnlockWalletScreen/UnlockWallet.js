// @flow
import React, { useContext, useCallback } from 'react';
import {
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
  Link,
  DefinitionTitle,
  H3,
  IconTouchId,
  Alert
} from 'design-system';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';


const errorMessages = {
  wrong_password: 'Wrong password. Please try again.',
};

export interface UnlockWalletProps {
  errors: any,
  values: any,
  onChange: (value: string) => void,
  onSubmit: () => void,
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
  padding-top: 5px;
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

const ForgotLink = styled(Link)`
  text-transform: uppercase;
  text-align: left;
  font-size: 13px;
  line-height: 19px;
`;

const BiometryLabelMap = {
  FaceID: 'Face ID',
  TouchID: 'Touch ID',
  Fingerprint: 'Fingerprint',
};

function renderUnlockOptions(props) {
  const { biometricsEnabled, supportedBiometryType } = props;

  if (!supportedBiometryType || !biometricsEnabled) {
    return (
      <Row>
        <Col>
          <Button
            onPress={props.onUnlockPress}
            type="full-primary"
            isLoading={props.isLoading}
          >
            Unlock
          </Button>
        </Col>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <Row alignItems="center" justifyContent="center" marginBottom={20}>
        <Col autoWidth>
          {
            supportedBiometryType === 'FaceID' ? (
              <SKIcon name="icon-face-id" color="#09A8BA" size={67} />
            ) : <IconTouchId />
          }
        </Col>
      </Row>
      {
        // props.showBiometricsAlert && 
        // <Row>
        //   <Col>
        //     <Alert>
        //       Please try again later or use password instead.
        //     </Alert>
        //   </Col>
        // </Row>
      }
      <Row>
        <Col>
          <Button
            onPress={props.onBiometricsUnlock}
            type="full-primary"
            isLoading={props.isBiometricsLoading}
            disabled={props.isLoading}
          >
            Unlock With { BiometryLabelMap[supportedBiometryType] }
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onPress={props.onUnlockPress}
            type="shell-primary"
            isLoading={props.isLoading}
            disabled={props.isBiometricsLoading}
          >
            Unlock with Password
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export function UnlockWallet(props: UnlockWalletProps) {
  const theme = useContext(ThemeContext);
  const { errors = {} } = props;

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
                Enter password to unlock your
              </PageTitle>
              <PageTitle align="center">
                SelfKey Identity Wallet
              </PageTitle>
            </TitleCol>
          </Row>
          <InputRow>
            <Col>
              <TextInput
                error={errors.password}
                errorMessage={errorMessages[errors.password]}
                value={props.values.password}
                placeholder="Password"
                label="Password"
                onChangeText={props.onChange('password')}
                secureTextEntry={true}
                onSubmitEditing={props.onPasswordSubmit}
              />
            </Col>
          </InputRow>
          { props.onForgot ? (
              <Row>
                <Col autoWidth>
                  <ForgotLink onPress={props.onForgot}>
                    Forgot?
                  </ForgotLink>
                </Col>
              </Row>
            ) : null
          }
        </ContentGrid>
        <Grid>
          {
            renderUnlockOptions(props)
          }
          <Row>
            <Col>
              <OrText>or</OrText>
            </Col>
          </Row>
          <Row>
            <Col>
              <TouchableWithoutFeedback
                onPress={props.onChooseDifferentWallet}
                disabled={props.isLoading || props.isBiometricsLoading}
              >
                <UseDifferentWallet>
                  Create New Wallet
                </UseDifferentWallet>
              </TouchableWithoutFeedback>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
