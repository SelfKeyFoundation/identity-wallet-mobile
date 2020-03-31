// @flow
import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Modal as PaperModal, Portal } from 'react-native-paper';
import { H3 } from '../typography/headings';
import { Button } from '../buttons/Button';
import { SKIcon } from '../icons';

const Container = styled.View`
  padding: 40px 20px;
  height: 100%;
`;

const InnerContainer = styled.View`
  background: ${({ theme }) => theme.colors.base };
  border: 1px solid ${({ theme }) => theme.colors.base };
  box-shadow: 2px 1px 2px rgba(0,0,0,0.3);
  border-radius: 4px;
  flex: 0 1 auto;
`;

const Header = styled.View`
  background: #2A3540;
  border: 1px solid #374758;
  flex-direction: row;
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
      <InnerContainer>
      <Header>
        <Title>{props.title}</Title>
        <SKIcon name="icon-clear" color="#23E6FE" size={16} onPress={props.onClose}/>
      </Header>
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
    </Container>
  );

  return (
    <Portal>
      <PaperModal visible={props.visible} onDismiss={props.onClose}>
        { content }
      </PaperModal>
    </Portal>
  );
}
