// @flow
import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Modal as PaperModal, Portal } from 'react-native-paper';
import { H3 } from '../typography/headings';
import { Button } from '../buttons/Button';
import { SKIcon } from '../icons';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import { Box } from 'design-system/grid';
import { View } from 'react-native';
import { Pressable } from 'native-base';

const Container = styled(View)`
  padding: ${() => {
    return DeviceInfo.hasNotch() ? '45px 20px 40px 20px' : '20px';
  }};
  height: 100%;
`;

const InnerContainer = styled(LinearGradient)`
  border: 1px solid ${({ theme }) => theme.colors.base };
  box-shadow: 2px 1px 2px rgba(0,0,0,0.3);
  border-radius: 20px;
  flex: 0 1 auto;
`;

const Header = styled(View)`
  border: 0 solid #374758;
  border-bottom-width: 0px;
  flex-direction: row;
  border-radius: 16px;
  padding: 10px 15px;
`;

const Body = styled(ScrollView)`
  flex-grow: 1;
`;

const BodyContent = styled(View)`
  flex-grow: 1;
  padding: ${props => props.noBodyPadding ? 0 : '25px 15px'};
`;

const Footer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  padding: 40px 15px;
`;

const Title = styled(H3)`
  flex: 1;
`;

const ButtonWrapper = styled(View)`
  margin-left: 15px;
`;

export { Portal };

export type ModalProps = {
  title: string;
  onClose: () => void;
  onCancel: () => void;
  onOk: () => void;
  children: any;
  cancelText: string;
  okText: string;
  visible: boolean;
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});

export function Modal(props) {
  const {
    cancelProps = {},
    okProps = {},
  } = props;

  const content = (
    <Container>
        <InnerContainer
            colors={['#161A1F', '#1A2836']}
              style={{
                borderRadius: 20,
              }}
              start={{ y: 0.0, x: 0.0 }} end={{ y: 1.0, x: 1.0 }}
              >
          <LinearGradient
            colors={['#161A1F', '#1A2836']}
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            start={{ y: 0.0, x: 0.0 }} end={{ y: 1.0, x: 1.0 }}
          >
            <Header>
              <Box paddingTop={10} paddingBottom={10} flex={1}>
                <Title>{props.title}</Title>
              </Box>
              <Pressable onPress={props.onClose} style={{ padding: 10 }}>
                <SKIcon name="icon-clear" color="#23E6FE" size={16} onPress={props.onClose} />
              </Pressable>
            </Header>
          </LinearGradient>
          <Body contentContainerStyle={styles.scrollContainer}>
            {/* <LinearGradient
              
            > */}
            <BodyContent noBodyPadding={props.noBodyPadding}>
              {props.children}
            </BodyContent>
          {/* </LinearGradient> */}
          </Body>
          {
            props.footer !== undefined ? props.footer : (<Footer>
              <ButtonWrapper>
                <Button type="shell-primary" onPress={props.onCancel} {...cancelProps}>
                  {props.cancelText}
                </Button>
              </ButtonWrapper>
              { props.okText && (
                <ButtonWrapper>
                  <Button onPress={props.onOk} {...okProps}>
                    {props.okText}
                  </Button>
                </ButtonWrapper>
              )}
            </Footer>)
          }
        </InnerContainer>
    </Container>
  );

  return (
    <Portal>
      <PaperModal
        visible={props.visible}
        onDismiss={props.onClose}
        contentContainerStyle={{
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}
      >
        {
          props.avoidKeyboard ? 
          (
            <ScrollView>
              <KeyboardAvoidingView
                behavior="padding"
              >
                { content }
              </KeyboardAvoidingView>
            </ScrollView>
          ) : content
        }
      </PaperModal>
    </Portal>
  );
}
