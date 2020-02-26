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
  H3,
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';

const errorMessages = {
  required: 'Password is required',
  match_with_password: 'Wrong confirmation password',
};
export interface ChangePasswordProps {
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
`;

export function ChangePassword(props: ChangePasswordProps) {
  const theme = useContext(ThemeContext);

  return (
    <ScreenContainer sidePadding>
      <Container withMargin scrollable>
        <ContentGrid>
          <Row>
            <IconCol>
              <SKIcon name="icon-password-ok" color={theme.colors.primary} size={66} />
            </IconCol>
          </Row>
          <Row>
            <TitleCol>
              <PageTitle align="center">
                Change passcode
              </PageTitle>
            </TitleCol>
          </Row>
          <InputRow>
            <Col>
              <TextInput
                error={props.error.password}
                errorMessage={props.error.password}
                value={props.password}
                placeholder="Current password"
                label="Current passcode"
                onChangeText={props.onPasswordChange}
                secureTextEntry={true}
              />
            </Col>
          </InputRow>
          <Row>
            <Col>
              <TextInput
                error={props.error.newPassword}
                errorMessage={props.error.newPassword}
                value={props.newPassword}
                placeholder="New passcode"
                label="New passcode"
                onChangeText={props.onNewPasswordChange}
                secureTextEntry={true}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                error={props.error.confirmPasswod}
                errorMessage={props.error.confirmPasswod}
                value={props.confirmPasswod}
                placeholder="New password confirmation"
                label="Confirm the new passcode"
                onChangeText={props.onConfirmPasswordChange}
                secureTextEntry={true}
                onSubmitEditing={props.onSubmit}
              />
            </Col>
          </Row>
        </ContentGrid>
        <Grid>
          <Row>
            <Col>
              <Button
                onPress={props.onBack}
                type="shell-primary"
              >
                Back
              </Button>
            </Col>
            <Col>
              <Button
                onPress={props.onSubmit}
                type="full-primary"
                isLoading={props.isLoading}
                disabled={!props.canSubmit}
              >
                Change
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
