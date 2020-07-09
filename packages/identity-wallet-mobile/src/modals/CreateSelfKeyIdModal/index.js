import React, { useCallback, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from '@selfkey/wallet-core/utils/validation-utils';
import { TransactionDetails } from '../../components';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { getUsdPrice } from '@selfkey/blockchain/services/price-service';
import ducks from '@selfkey/wallet-core/modules';
import styled from 'styled-components/native';
import EthUtils from '@selfkey/blockchain/util/eth-utils';
import { Linking, KeyboardAvoidingView, Platform } from 'react-native';
import { WalletTracker } from '../../WalletTracker';
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
  Alert
} from '@selfkey/mobile-ui';

const Divider = styled.View`
  border: 0 solid #475768;
  border-bottom-width: 1px;
  height: 1px;
`;

const requiredMessage = 'This field is required';
const schema = Yup.object().shape({
  nickName: Yup.string().required(requiredMessage),
  firstName: Yup.string().required(requiredMessage),
  lastName: Yup.string().required(requiredMessage),
  email: Yup.string().required(requiredMessage).email('Email provided is invalid'),
});

function CreateSelfKeyIdModal(props) {
  const { visible, params, onClose } = props;
  const [isLoading, setLoading] = useState();
  const dispatch = useDispatch();
  const identity = useSelector(ducks.identity.selectors.selectIdentity);
  const formik = useFormik({
    initialValues: {
      nickName: '',
      firstName: '',
      lastName: '',
      email: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      setLoading(true);
      setTimeout(() => {
        dispatch(ducks.identity.operations.createIndividualProfile(identity.id, values)).finally(() => {
          setLoading(false);
        });
      }, 200);
    },
  });

  const showErrors = formik.submitCount > 0;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title="Profile Details"
      footer={null}
      avoidKeyboard={true}
    >
      <Grid>
        <Row justifyContent="center" marginBottom={15} marginTop={5}>
          <Col noPadding autoWidth>
            <SKIcon name="icon-id" color="#0ABBD0" size={62} />
          </Col>
        </Row>
        <Row justifyContent="center" marginBottom={15}>
          <Col noPadding autoWidth>
            <H3>SelfKey ID</H3>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              label="Selfkey Nickname"
              placeholder="Alias for this account"
              value={formik.values.nickName}
              onChangeText={formik.handleChange('nickName')}
              required
              error={showErrors && !!formik.errors.nickName}
              errorMessage={formik.errors.nickName}
            />
          </Col>
        </Row>
        <Row marginBottom={22} style={{ marginLeft: 0, marginRight: 0 }}>
          <Col noPadding>
            <Alert icon="icon-info-tooltip">
              With nicknames it’s very easy to switch between multiple accounts.
            </Alert>
          </Col>
        </Row>
        <Divider />
        <Row marginTop={10}>
          <Col>
            <TextInput
              label="First Name"
              placeholder="Given Name"
              value={formik.values.firstName}
              error={showErrors && !!formik.errors.firstName}
              errorMessage={formik.errors.firstName}
              onChangeText={formik.handleChange('firstName')}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              label="Last Name"
              placeholder="Family Name"
              value={formik.values.lastName}
              error={showErrors && !!formik.errors.lastName}
              errorMessage={formik.errors.lastName}
              onChangeText={formik.handleChange('lastName')}
              required
            />
          </Col>
        </Row>
        <Row marginBottom={22}>
          <Col>
            <TextInput
              label="Email"
              placeholder="Email"
              value={formik.values.email}
              error={showErrors && !!formik.errors.email}
              errorMessage={formik.errors.email}
              onChangeText={formik.handleChange('email')}
              required
            />
          </Col>
        </Row>
        <Row marginBottom={5}>
          <Col>
            <Button
              onPress={formik.handleSubmit}
              isLoading={isLoading}
            >
              Create SelfKey ID
            </Button>
          </Col>
        </Row>
      </Grid>
    </Modal>
  );
} 

export default CreateSelfKeyIdModal;