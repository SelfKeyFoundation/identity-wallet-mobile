import React, { useContext } from 'react';
import { TokenDetails } from '../../components';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import {
  SKIcon,
  Row,
  Col,
  H3,
  Paragraph,
  Grid,
  Alert,
  Button,
  ThemeContext,
  TextInput
} from 'design-system';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'importWalletBackup';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

const Header = styled.View`
  margin: 10px 20px 40px 20px;
`;

const Body = styled.ScrollView`
  margin: 0 20px;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 24px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  position: absolute;
`;

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

const IconContainer = styled.View`
  position: absolute;
  top: -2px;
  left: -8px;
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

const PageDescription = styled(Paragraph)`
  text-align: center;
  font-size: 16px;
  line-height: 24px;
`;

const Footer = styled(Grid)`
  padding: 35px;
`;

export function ImportWalletBackup(props) {
  const theme = useContext(ThemeContext);

  const handleBack = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/password/submitButton`,
      action: 'press',
      level: 'system'
    });

    props.onBack();
  }

  const handleFileSelect = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/selectFileButton`,
      action: 'press',
      level: 'system'
    });

    props.onSelectFile();
  };

  const handleSubmit = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/submitButton`,
      action: 'press',
      level: 'system'
    });

    props.onSubmit();
  };

  return (
    <Container>
      <Header>
        <IconContainer>
          <TouchableWithoutFeedback onPress={handleBack}>
            <BackIcon name="icon-nav-ar-left" size={12} color="#fff" />
          </TouchableWithoutFeedback>
        </IconContainer>
      </Header>
      <Body>
        <Row>
          <IconCol>
            <SKIcon name="icon-wallet" color={theme.colors.primary} size={66} />
          </IconCol>
        </Row>
        <Row>
          <TitleCol>
            <PageTitle align="center">
              Import Wallet From Backup File
            </PageTitle>
          </TitleCol>
        </Row>
        <Row>
          <TitleCol>
            <PageDescription>
              Select the backup file and type your password
            </PageDescription>
          </TitleCol>
        </Row>
        <Row alignItems="flex-end">
          <Col>
            <TextInput
              value={props.file ? props.file.name : ''}
              placeholder="Select a file..."
              label="Backup file"
              onChangeText={() => {}}
              error={props.errors && props.errors.system}
            />
          </Col>
          <Col autoWidth>
            <Button type="full-primary" onPress={handleFileSelect}>
              Select
            </Button>
          </Col>
        </Row>
        { props.errors && props.errors.system && <Row marginTop={0}>
          <Col>
            <Alert type="error" noIcon>
              { props.errors.system }
            </Alert>
          </Col>
        </Row> }
        <Row>
          <Col>
            <TextInput
              error={props.errors && props.errors.password}
              errorMessage={props.errors && props.errors.password}
              value={props.password}
              placeholder="Password"
              label="Enter the Password"
              onChangeText={props.onPasswordChange}
              secureTextEntry={true}
              onSubmitEditing={handleSubmit}
            />
          </Col>
        </Row>
        
      </Body>
      <Footer>
        <Row>
          <Col>
            <Button
              onPress={handleSubmit}
              type="full-primary"
              isLoading={props.isLoading}
            >
              Import
            </Button>
          </Col>
        </Row>
      </Footer>
    </Container>
  )
}