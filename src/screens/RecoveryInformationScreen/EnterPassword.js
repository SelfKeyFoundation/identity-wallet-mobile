// @flow
import React, { useContext, useCallback } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
  H3,
  IconTouchId,
} from 'design-system';
import styled from 'styled-components/native';
import {BackButton} from '../../v2/components/BackButton';

const errorMessages = {
  required: 'Password is required',
  match_with_password: 'Wrong confirmation password',
};
export interface EnterPasswordProps {
  errors: any,
  values: any,
  onChange: (value: string) => void,
  onSubmit: () => void,
  onBack: () => void,
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
            onPress={() => props.onSubmit(false)}
            type="full-primary"
            isLoading={props.isLoading}
          >
            Display Recovery Info
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
      <Row>
        <Col>
          <Button
            onPress={() => props.onSubmit(true)}
            type="full-primary"
            isLoading={props.isBiometricsLoading}
            disabled={props.isLoading}
          >
           Confirm With { BiometryLabelMap[supportedBiometryType] }
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onPress={() => props.onSubmit(false)}
            type="shell-primary"
            isLoading={props.isLoading}
            disabled={props.isBiometricsLoading}
          >
            Confirm With Password
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export function EnterPassword(props: RecoveryInformationProps) {
  const theme = useContext(ThemeContext);
  const handlePasswordChange = useCallback((value) => {
    props.onChange(value);
  });

  return (
    <ScreenContainer sidePadding>
      <Header>
        <IconContainer>
          <BackButton onPress={props.onBack} />
        </IconContainer>
      </Header>
      <Body scrollable>
        <ContentGrid>
          <Row>
            <IconCol>
              <SKIcon name="icon-password" color={theme.colors.primary} size={66} />
            </IconCol>
          </Row>
          <Row>
            <TitleCol>
              <PageTitle align="center">
                Enter password to display the
              </PageTitle>
              <PageTitle align="center">
                recovery informations for this wallet
              </PageTitle>
            </TitleCol>
          </Row>
          <InputRow>
            <Col>
              <TextInput
                error={props.error}
                errorMessage={props.error}
                value={props.password}
                placeholder="Password"
                label="Password"
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
                onSubmitEditing={() => props.onSubmit()}
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
          ) : null }
        </ContentGrid>
        <Grid>
          {
            renderUnlockOptions(props)
          }
          {
            // <Row>
            //   <Col>
            //     <Button
            //       onPress={props.onSubmit}
            //       type="full-primary"
            //       isLoading={props.isLoading}
            //     >
            //       Display Recovery Info
            //     </Button>
            //   </Col>
            // </Row>
          }
        </Grid>
      </Body>
    </ScreenContainer>
  );
}
