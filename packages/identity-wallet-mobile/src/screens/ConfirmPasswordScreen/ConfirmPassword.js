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
export interface ConfirmPasswordProps {
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

export function ConfirmPassword(props: ConfirmPasswordProps) {
  const theme = useContext(ThemeContext);
  const passwordErrors = props.errors.confirmPassword || [];

  const handlePasswordChange = useCallback((value = '') => {
    const cleanedValue = value.replace(/[ \n]/g, '');
    props.onChange('confirmPassword')(cleanedValue);
  });

  return (
    <ScreenContainer sidePadding>
      <Container withMargin>
        <ContentGrid>
          <Row>
            <IconCol>
              <SKIcon name="icon-password-ok" color={theme.colors.primary} size={66} />
            </IconCol>
          </Row>
          <Row>
            <TitleCol>
              <PageTitle align="center">
                Confirm the password
              </PageTitle>
              <PageTitle align="center">
                you just created
              </PageTitle>
            </TitleCol>
          </Row>
          <InputRow>
            <Col>
              <TextInput
                error={passwordErrors.length}
                errorMessage={errorMessages[passwordErrors[0]]}
                value={props.values.confirmPassword}
                placeholder="Password"
                label="Confirm Password"
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
              />
            </Col>
          </InputRow>
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
              >
                Confirm Password
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
