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
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

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

const Header = styled.View`
  height: 80px;
  width: 100%;
  padding-top: 5px;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 24px;
  width: 100%;
  text-align: center;
`;

const IconContainer = styled.View`
  position: absolute;
  top: -8px;
  left: 0px;
  padding: 20px;
  z-index: 99999;
`;

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

export function PasswordScreen(props: CreateBackupProps) {
  const theme = useContext(ThemeContext);
  const handlePasswordChange = useCallback((value) => {
    props.onChange(value);
  });

  return (
    <ScreenContainer sidePadding>
      <Header>
        <Title>{props.headerTitle}</Title>          
        <IconContainer>
          <TouchableWithoutFeedback onPress={props.onBack} style={{ padding: 20 }}>
            <SKIcon name="icon-nav-ar-left" size={12} color="#fff" />
          </TouchableWithoutFeedback>
        </IconContainer>  
      </Header>
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
                {props.title}
              </PageTitle>
              {props.titleLine2 ? <PageTitle align="center">
                {props.titleLine2}
              </PageTitle> : null}
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
        </ContentGrid>
        <Grid>
          <Row>
            <Col>
              <Button
                onPress={props.onSubmit}
                type="full-primary"
                isLoading={props.isLoading}
              >
                {props.confirmText}
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
