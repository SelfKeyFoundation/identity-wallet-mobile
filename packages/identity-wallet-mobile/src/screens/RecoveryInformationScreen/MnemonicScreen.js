// @flow
import React, { useContext } from 'react';
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
  H4,
  Alert,
} from '@selfkey/mobile-ui';

// import { Alert } from '@selfkey/mobile-ui/lib/alert';

import styled from 'styled-components/native';

export interface BackupWalletProps {
  mnemonicPhrase: string;
  onSubmit: () => void;
}

const ContentGrid = styled(Grid)`
  flex: 1;
  min-height: 450px;
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
`;

const MnemonicContainer = styled.View`
  margin-top: 10px;
  border: 2px dashed ${({ theme }) => theme.colors.grey};
  border-radius: 4px;
  padding: 30px;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  align-items: stretch;
  background: #1B2229;
`;

const MnemonicItem = styled.View`
  margin: 5px;
`;

const MnemonicWord = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
`;

export function MnemonicScreen(props: BackupWalletProps) {
  const theme = useContext(ThemeContext);
  const { mnemonicPhrase } = props;

  return (
    <ScreenContainer sidePadding>
      <Container withMargin>
        <ContentGrid>
          <Row>
            <IconCol>
              <SKIcon name="icon-safe" color={theme.colors.primary} size={66} />
            </IconCol>
          </Row>
          <Row>
            <TitleCol>
              <PageTitle align="center">
                Recovery Information
              </PageTitle>
            </TitleCol>
          </Row>
          <Row>
            <TitleCol>
              <PageDescription>
                Write down the following phrase in this specific order, and keep it safe. 
              </PageDescription>
            </TitleCol>
          </Row>
          <Row>
            <Col>
              <MnemonicContainer>
                { mnemonicPhrase.split(' ').map(word => (
                  <MnemonicItem>
                    <MnemonicWord key={word}>
                      { word }
                    </MnemonicWord>
                  </MnemonicItem>
                  ))
                }
              </MnemonicContainer>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col autoWidth>
              <Button type="link" onPress={props.onCopyPhrase}>
                Copy Phrase
              </Button>
            </Col>
          </Row>
          <Row marginTop={30}>
            <Col>
              <Alert>
                This phrase is the only way to recover your wallet if you ever forget your password. Keep it safe.
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert>
                Write it down on paper. This is the safest way to store the recovery phrase.
              </Alert>
            </Col>
          </Row>
        </ContentGrid>
        <Grid>
          <Row>
            <Col>
              <Button
                onPress={props.onSubmit}
                type="full-primary"
              >
                I’ve written it down
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
