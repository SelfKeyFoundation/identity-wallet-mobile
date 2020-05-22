/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
// import Scanner from 'react-native-document-scanner';

export default class ScannerTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      flashEnabled: false,
      useFrontCam: false,
    };
  }

  renderDetectionType() {
    switch (this.state.lastDetectionType) {
      case 0:
        return "Correct rectangle found"
      case 1:
        return "Bad angle found";
      case 2:
        return "Rectangle too far";
      default:
        return "No rectangle detected yet";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.image ?
          <ScaledImage style={{ flex: 1 }} uri={`data:image/jpeg;base64,${this.state.image}`} width={300} /> :
          <Scanner
            useBase64
            onPictureTaken={data => this.setState({ image: data.croppedImage })}
            overlayColor="rgba(255,130,0, 0.7)"
            enableTorch={this.state.flashEnabled}
            useFrontCam={this.state.useFrontCam}
            brightness={0.2}
            saturation={0}
            quality={0.5}
            contrast={1.2}
            onRectangleDetect={({ stableCounter, lastDetectionType }) => this.setState({ stableCounter, lastDetectionType })}
            detectionCountBeforeCapture={10}
            detectionRefreshRateInMS={50}
            style={styles.scanner}
          />
        }
        <Text style={styles.instructions}>
          ({this.state.stableCounter || 0} correctly formated rectangle detected
        </Text>
        <Text style={styles.instructions}>
          {this.renderDetectionType()}
        </Text>
        {this.state.image === null ?
          null :
          <TouchableOpacity style={styles.newPic} onPress={() => this.setState({ image: "" })}>
            <Text>Take another picture</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const ScaledImage = props => {
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
      Image.getSize(props.uri, (width1, height1) => {
          if (props.width && !props.height) {
              setWidth(props.width)
              setHeight(height1 * (props.width / width1))
          } else if (!props.width && props.height) {
              setWidth(width1 * (props.height / height1))
              setHeight(props.height)
          } else {
              setWidth(width1)
              setHeight(height1)
          }
          setImageLoading(false)
      }, (error) => {
          console.log("ScaledImage,Image.getSize failed with error: ", error)
      })
  }, [])


  return (
      height ?
          <View style={{ height: height, width: width, borderRadius: 5, backgroundColor: "lightgray", flex: 1 }}>
              <Image
                  source={{ uri: props.uri }}
                  style={{ height: height, width: width, borderRadius: 5, flex: 1}}
                  resizeMode="contain"
              />
          </View>
          : imageLoading ?
              <ActivityIndicator size="large" />
              : null
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  newPic: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    top: 20,
    bottom: 20,
    height: 40,
    width: 120,
    backgroundColor: '#FFF',
  },
  left: {
    left: 20,
  },
  right: {
    right: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scanner: {
    flex: 1,
    width: 400,
    height: 400,
    borderColor: 'orange',
    borderWidth: 1
  }
});