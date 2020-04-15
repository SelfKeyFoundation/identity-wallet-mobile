// @flow
import React, { useContext, useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
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
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';

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

const IconContainer = styled.View`
  position: absolute;
  top: -2px;
  left: -8px;
`;

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

const Header = styled.View`
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

export function EnterPassword(props: RecoveryInformationProps) {
  const theme = useContext(ThemeContext);
  const handlePasswordChange = useCallback((value) => {
    props.onChange(value);
  });

  return (
    <ScreenContainer sidePadding>
      <Header>
        <IconContainer>
          <TouchableWithoutFeedback onPress={props.onBack}>
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
                onSubmitEditing={props.onSubmit}
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
          <Row>
            <Col>
              <Button
                onPress={props.onSubmit}
                type="full-primary"
                isLoading={props.isLoading}
              >
                Display Recovery Info
              </Button>
            </Col>
          </Row>
        </Grid>
      </Body>
    </ScreenContainer>
  );
}
