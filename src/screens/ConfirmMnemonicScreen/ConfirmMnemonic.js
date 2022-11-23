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
  ButtonLinkText,
  H3,
  Alert,
} from 'design-system';
import { TouchableWithoutFeedback, Text} from 'react-native';
import styled from 'styled-components/native';

import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'confirmMnemonic';

const errorMessages = {
  required: 'Password is required',
  match_with_password: 'Wrong confirmation password',
};

export interface ConfirmMnemonicProps {

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

const PageDescription = styled(Paragraph)`
  text-align: center;
`;

const WordPlaceholder = new Array(12).fill(0);
const WordsRowPlaceholder = new Array(3).fill(0);

const WordBox = styled(Col)`
  border: 1.34px solid #93B0C1;
  padding-top: 10px;
  width: 68px;
  height: 36px;
  margin: 7px 5px;
  border-radius: 3.27px;
  opacity: ${props => props.disabled ? 0.3 : 1};
  background: ${props => props.isEmpty ?  '#313D49' : 'transparent'}
`;

const WordBoxText = styled(Text)`
  text-align: center;
  color: ${props => props.theme.colors.typography};
  font-size: 11px;
  font-family: ${props => props.theme.fonts.bold}; 
`;

export function ConfirmMnemonic(props: ConfirmMnemonicProps) {
  const theme = useContext(ThemeContext);
  const { errorMessage } = props;
  const { mnemonicConfirmation } = props;
  const mnemonic = props.mnemonic.split(' ');

  const handleClear = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/clearButton`,
      action: 'press',
      level: 'machine'
    });

    props.onClear();
  };

  const handleBack = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'machine'
    });

    props.onBack();
  };

  const handleSubmit = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/submitButton`,
      action: 'press',
      level: 'machine'
    });

    props.onSubmit();
  };

  return (
    <ScreenContainer sidePadding>
      <Container withMargin scrollable>
        <ContentGrid>
          <Row>
            <IconCol>
              <SKIcon name="icon-safe" color={theme.colors.primary} size={66} />
            </IconCol>
          </Row>
          <Row>
            <TitleCol>
              <PageTitle align="center">
                Confirm recovery phrase backup
              </PageTitle>
            </TitleCol>
          </Row>
          <Row>
            <Col>
              {
                WordsRowPlaceholder.map((_, rowIdx) => {
                  return (
                    <Row>
                      {
                        WordPlaceholder.slice(rowIdx, rowIdx + 4).map((_, idx) => {
                          const item = mnemonicConfirmation[rowIdx * 4 + idx];
                          const wordIndex = item && item.index;
                          const word = mnemonic[wordIndex];
                          return (
                            <WordBox isEmpty={!word}>
                              <WordBoxText>
                                { word }
                              </WordBoxText>
                            </WordBox>
                          )
                        })
                      }
                    </Row>
                  )
                })
              }  
            </Col>
          </Row>
          {!!mnemonicConfirmation.length && <Row marginTop={20} justifyContent="center">
            <Col autoWidth>
              <TouchableWithoutFeedback onPress={handleClear}>
                <Row>
                  <Col autoWidth>
                    <SKIcon
                      name="icon-clear"
                      size={16}
                      color={theme.colors.primary}
                    />
                  </Col>
                  <Col autoWidth>
                    <ButtonLinkText>
                      Clear
                    </ButtonLinkText>
                  </Col>
                </Row>
              </TouchableWithoutFeedback>
            </Col>
          </Row>}
          <Row marginTop={20}>
            <Col>
              <PageDescription align="center">
                Please tap each word in the correct order
              </PageDescription>
            </Col>
          </Row>
          <Row>
            <Col>
              {
                WordsRowPlaceholder.map((_, rowIdx) => {
                  return (
                    <Row>
                      {
                        WordPlaceholder.slice(rowIdx, rowIdx + 4).map((_, idx) => {
                          const wordIndex = rowIdx * 4 + idx;
                          const word = mnemonic[wordIndex];
                          const isFound = mnemonicConfirmation.find((item) => (item && item.index) === wordIndex);
                          const handlePress = () => {
                            WalletTracker.trackEvent({
                              category: `${TRACKER_PAGE}/mnemonicWord`,
                              action: 'press',
                              level: 'machine'
                            });
                            props.onWordPress(wordIndex);
                          }

                          return (
                            <TouchableWithoutFeedback onPress={!isFound ? handlePress : () => {}}>
                              <WordBox disabled={isFound}>
                                <WordBoxText>
                                  { isFound ? '': word }
                                </WordBoxText>
                              </WordBox>
                            </TouchableWithoutFeedback>
                          )
                        })
                      }
                    </Row>
                  )
                })
              }  
            </Col>
          </Row>
          { errorMessage && <Row>
            <Col>
              <Alert type="error">
                { errorMessage }
              </Alert>
            </Col>
          </Row> }
        </ContentGrid>
        <Grid>
          <Row justifyContent="flex-end">
            <Col autoWidth>
              <Button
                onPress={handleBack}
                type="shell-primary"
              >
                Back
              </Button>
            </Col>
            <Col autoWidth>
              <Button
                onPress={handleSubmit}
                isLoading={props.isLoading}
                type="full-primary"
              >
                Continue
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}
