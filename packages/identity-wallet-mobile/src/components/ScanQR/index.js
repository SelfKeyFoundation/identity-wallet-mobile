import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { Dimensions, View, SafeAreaView, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { SKIcon } from '@selfkey/mobile-ui';
import { RNCamera as Camera } from 'react-native-camera';
// import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

const Header = styled.View`
  height: 80px;
  width: 100%;
  padding-top: 10px;
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
  top: 0px;
  left: 10px;
  padding: 20px;
  z-index: 99999;
`;

const Footer = styled.View`
  display: flex;
  justify-content: center;
  background: #2E3945;
  border-radius: 4px;
  margin: 20px;
  height: 93px;
`;

const Description = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  text-align: center;
`;

const SmallDescription = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.regular};
  text-align: center;
`;

const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const QRCodeContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`; 

export function ScanQR(props) {
  const handleSuccess = useCallback((event) => {
    props.onSuccess(event.data);
  });

  return (
    <Container>
      <QRCodeContainer>
        <QRCodeScanner
          style={{flex:1}}
          reactivate={true}
          reactivateTimeout={10000}
          cameraStyle={{ height: Dimensions.get('window').height }}
          topViewStyle={{
            height: 0,
            flex: 0,
          }}
          bottomViewStyle={{
            height: 0,
            flex: 0,
          }}
          onRead={handleSuccess}
        />
      </QRCodeContainer>
      <Wrapper>
        <Header>
          <Title>{props.title}</Title>          
          <IconContainer>
            <TouchableWithoutFeedback onPress={props.onClose} style={{ padding: 20 }}>
              <SKIcon name="icon-nav-ar-left" size={12} color="#fff" />
            </TouchableWithoutFeedback>
          </IconContainer>  
        </Header>
        <Body>
          <View style={{ width: 240, height: 230 }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderStyle: 'solid',
                borderColor: '#00C0D9',
                borderLeftWidth: 12,
                borderTopWidth: 12,
                position: 'absolute',
                left: 0,
                top: 0,
              }}
            />
            <View
              style={{
                width: 60,
                height: 60,
                borderStyle: 'solid',
                borderColor: '#00C0D9',
                borderRightWidth: 12,
                borderTopWidth: 12,
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            />
            <View
              style={{
                width: 60,
                height: 60,
                borderStyle: 'solid',
                borderColor: '#00C0D9',
                borderRightWidth: 12,
                borderBottomWidth: 12,
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
            />
            <View
              style={{
                width: 60,
                height: 60,
                borderStyle: 'solid',
                borderColor: '#00C0D9',
                borderLeftWidth: 12,
                borderBottomWidth: 12,
                position: 'absolute',
                left: 0,
                bottom: 0,
              }}
            />
          </View>
        </Body>
        <Footer>
          <Description>{props.description}</Description>
          <SmallDescription>{props.smallDescription}</SmallDescription>
        </Footer>
      </Wrapper>
    </Container>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
