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

const Container = styled.View`
  padding: ${() => {
    return DeviceInfo.hasNotch() ? '45px 20px 40px 20px' : '20px';
  }};
  height: 100%;
`;

const InnerContainer = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.base };
  box-shadow: 2px 1px 2px rgba(0,0,0,0.3);
  border-radius: 16px;
  flex: 0 1 auto;
`;

const Header = styled.View`
  border: 0 solid #374758;
  border-bottom-width: 0px;
  flex-direction: row;
  border-radius: 16px;
  padding: 20px 15px;
`;

const Body = styled.ScrollView`
  flex-grow: 1;
`;

const BodyContent = styled.View`
  flex-grow: 1;
  padding: ${props => props.noBodyPadding ? 0 : '25px 15px'};
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 40px 15px;
`;

const Title = styled(H3)`
  flex: 1;
`;

const ButtonWrapper = styled.View`
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
      <LinearGradient
        colors={['#161A1F', '#1A2836']}
        style={{
          borderRadius: 20
        }}
        start={{ y: 0.0, x: 0.0 }} end={{ y: 1.0, x: 1.0 }}
      >
        <InnerContainer>
          <LinearGradient
            colors={['#161A1F', '#1A2836']}
            style={{
              // borderRadius: 20
            }}
            start={{ y: 0.0, x: 0.0 }} end={{ y: 1.0, x: 1.0 }}
          >
            <Header>
              
              <Title>{props.title}</Title>
              <SKIcon name="icon-clear" color="#23E6FE" size={16} onPress={props.onClose}/>
              
            </Header>
          </LinearGradient>
          <Body contentContainerStyle={styles.scrollContainer}>
            <BodyContent noBodyPadding={props.noBodyPadding}>
              {props.children}
            </BodyContent>
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
      </LinearGradient>
    </Container>
  );

  return (
    <Portal>
      <PaperModal
        visible={props.visible}
        onDismiss={props.onClose}
        contentContainerStyle={{
          backgroundColor: 'rgba(105,124,149,0.9)'
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
