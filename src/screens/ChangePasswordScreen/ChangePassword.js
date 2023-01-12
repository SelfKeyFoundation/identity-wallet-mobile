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
} from 'design-system';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, View } from 'react-native';
import { BackButton } from '../../v2/components/BackButton';

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

const Body = styled(Container)`
  margin: 0 35px 35px 35px;
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

export function ChangePassword(props: ChangePasswordProps) {
  const theme = useContext(ThemeContext);

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
                Change Password
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
                label="Current password"
                onChangeText={props.onPasswordChange}
                onSubmitEditing={props.onSubmit}
                secureTextEntry={true}
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
                Confirm
              </Button>
            </Col>
          </Row>
        </Grid>
      </Body>
    </ScreenContainer>
  );
}
