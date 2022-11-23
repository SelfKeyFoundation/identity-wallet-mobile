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
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'createBackup';

const errorMessages = {
  required: 'Password is required',
  match_with_password: 'Wrong confirmation password',
};
export interface CreateBackupProps {
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
  const handleSubmit = (biometrics) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/submitButton`,
      action: 'press',
      level: 'system'
    });

    props.onSubmit(biometrics);
  };

  if (!supportedBiometryType || !biometricsEnabled) {
    return (
      <Row>
        <Col>
          <Button
            onPress={() => handleSubmit(false)}
            type="full-primary"
          >
            Create Backup
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
            onPress={() => handleSubmit(true)}
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
            onPress={() => handleSubmit(false)}
            type="shell-primary"
            isLoading={props.isLoading}
            disabled={props.isBiometricsLoading}
          >
            Confirm With Password
            {
              // Display Recovery Info
            }
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export function CreateBackup(props: CreateBackupProps) {
  const theme = useContext(ThemeContext);
  const handlePasswordChange = useCallback((value) => {
    props.onChange(value);
  });

  const handleBack = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'system'
    });

    props.onBack();
  };

  return (
    <ScreenContainer sidePadding>
      <Header>
        <IconContainer>
          <TouchableWithoutFeedback onPress={handleBack}>
            <BackIcon name="icon-nav-ar-left" size={12} color="#fff" />
          </TouchableWithoutFeedback>
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
                Enter password to backup your
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
                value={props.password}
                placeholder="Password"
                label="Password"
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
                onSubmitEditing={() => props.onSubmit(false)}
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
        </Grid>
      </Body>
    </ScreenContainer>
  );
}
