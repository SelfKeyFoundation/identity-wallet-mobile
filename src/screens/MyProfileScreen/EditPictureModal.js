import React, { useCallback, useMemo, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from 'core/utils/validation-utils';
import { TransactionDetails } from '../../components';
import { navigate, Routes } from 'core/navigation';
import { getUsdPrice } from 'blockchain/services/price-service';
import ducks from 'core/modules';
import styled from 'styled-components/native';
import EthUtils from 'blockchain/util/eth-utils';
import { Linking, ActivityIndicator, Platform } from 'react-native';
import { WalletTracker } from '../../WalletTracker';
import { System } from '../../core/system';

import RNFS from 'react-native-fs';
import uuid from 'uuid';

import {
  ScreenContainer,
  TextInput,
  Modal,
  SKIcon,
  Paragraph,
  Explanatory,
  ThemeContext,
  Container,
  Grid,
  Row,
  Col,
  Button,
  H3,
  Alert,
  IconAddImage
} from 'design-system';
import {launchImageLibrary} from 'react-native-image-picker';
import fs from 'react-native-fs';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select your picture',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Divider = styled.View`
  border: 0 solid #475768;
  border-bottom-width: 1px;
  height: 1px;
`;

const RoundedImage = styled.Image`
  width: 170px;
  height: 170px;
  border-radius: 170px;
  overflow: hidden;
  border: 4px solid #313D49;
  margin: 22px auto;
`;

const RoundedContainer = styled.View`
  width: 170px;
  height: 170px;
  border-radius: 170px;
  overflow: hidden;
  border: 4px solid #313D49;
  margin: 22px auto;
  background: #313D49;
  align-items: center;
  justify-content: center;
`;

const requiredMessage = 'This field is required';
const schema = Yup.object().shape({
  nickName: Yup.string().required(requiredMessage),
  firstName: Yup.string().required(requiredMessage),
  lastName: Yup.string().required(requiredMessage),
  email: Yup.string().required(requiredMessage).email('Email provided is invalid'),
});

// TODO: Move into separate file to handle documents
class SelfKeyFS {
  static getRootDirPath() {
    return `${fs.DocumentDirectoryPath}`;
  }

  static async checkRootDir() {
    const rootPath = SelfKeyFS.getRootDirPath();

    try {
      await fs.readDir(rootPath);
    } catch(err) {
      await fs.mkdir(rootPath);
    }

    return rootPath;
  }

  static getFilePath(fileId) {
    const rootDir = SelfKeyFS.getRootDirPath();
    const filePath = `${rootDir}/${fileId}`;

    return filePath;
  }

  static writeFile({
    fileId,
    fileType,
    fileData,
  }) {
    const filePath = SelfKeyFS.getFilePath(fileId);

    if (!fileId) {
      fileId = uuid.v4();
    }

    return fs.writeFile(filePath, fileData);
  }

  static readFile(fileId) {
    const rootDir = SelfKeyFS.getRootDirPath();
    const filePath = `${rootDir}/${fileId}`;
    return fs.readFile(filePath);
  }
}

const ImageLoadingContainer = styled.View`
  width: 170px;
  height: 170px;
  border-radius: 75px;
  overflow: hidden;
  border: 4px solid #313D49;
  margin: 22px auto;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const defaultImage = 'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png';

var fileExtensionRegex = /\.[0-9a-z]+$/i;

function ImageLoading() {
  return (
    <ImageLoadingContainer>
      <ActivityIndicator
        size="small"
        color="#00C0D9"
      />
    </ImageLoadingContainer>
  )
}

export function EditPictureModal(props) {
  const dispatch = useDispatch();
  const { visible, onClose, identityId, profilePicture } = props;
  const [imageToSave, setImageToSave] = useState();
  const [imageUri, setImageUri] = useState(profilePicture);
  const [isLoading, setLoading] = useState(false);

  const handleSave = async () => {
    if (imageToSave) {
      // await fs.writeFile(imageToSave.filePath, imageToSave.fileData, 'base64');
      await dispatch(ducks.identity.operations.updateProfilePictureOperation(imageToSave.base64Data, identityId));
    }

    onClose();
  };

  const handleDelete = async () => {
    setImageUri(null);
    await dispatch(ducks.identity.operations.updateProfilePictureOperation(null, identityId));
  };

  const handleUpload = () => {
    launchImageLibrary(options, async (response) => {
      const {uri, fileName} = response;
      const fileData = await System.getFileSystem().readFile(response.uri, 'base64');

      if (!uri) {
        return;
      }

      let extension = fileExtensionRegex.exec(uri);

      if (!extension) {
        extension = fileExtensionRegex.exec(fileName);
      }

      extension = extension[0];

      const fileId = `identity-${props.identityId}-profile-picture-${Date.now()}${extension}`;
      const filePath = SelfKeyFS.getFilePath(fileId);

      setLoading(true);

      const base64Data = `data:${response.type};base64,${fileData}`;

      setTimeout(async () => {
        setImageToSave({
          filePath: `file://${filePath}`,
          base64Data,
          fileData,
        });
        setImageUri(base64Data);
        setLoading(false);
      }, 100);
    });
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Edit Profile Picture"
      footer={null}
    >
      { isLoading ? <ImageLoading />
        : imageUri ? <RoundedImage source={{ uri: imageUri }} /> : (
          <RoundedContainer>
            <IconAddImage />
          </RoundedContainer>
        )
      }
      <Grid marginBottom={20} marginTop={10}>
        <Row>
          <Col>
            <Button type="shell-primary" onPress={handleDelete}>Delete Current</Button>
          </Col>
          <Col>
            <Button type="shell-primary" onPress={handleUpload}>Upload New</Button>
          </Col>
        </Row>
      </Grid>
      <Divider />
      <Grid marginTop={32} marginBottom={5}>
        <Row justifyContent="flex-end">
          <Col autoWidth>
            <Button type="shell-primary" onPress={onClose}>Cancel</Button>
          </Col>
          <Col autoWidth style={{ width: 95 }}>
            <Button type="full-primary" onPress={handleSave}>Save</Button>
          </Col>
        </Row>
      </Grid>
    </Modal>
  );
}
