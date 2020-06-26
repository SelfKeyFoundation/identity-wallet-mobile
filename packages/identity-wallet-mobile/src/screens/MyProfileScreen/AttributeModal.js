import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from '@selfkey/wallet-core/utils/validation-utils';
import { SelectBox } from '../../components';
import ducks from '@selfkey/wallet-core/modules';
import styled from 'styled-components/native';
import { WalletTracker } from '../../WalletTracker';
import {
  TextInput,
  Modal,
  SKIcon,
  Grid,
  Row,
  Col,
  Button
} from '@selfkey/mobile-ui';

const Divider = styled.View`
  border: 0 solid #475768;
  border-bottom-width: 1px;
  height: 1px;
`;

const RoundedImage = styled.Image`
  width: 170px;
  height: 170px;
  border-radius: 75px;
  overflow: hidden;
  border: 4px solid #313D49;
  margin: 22px auto;
`;

const requiredMessage = 'This field is required';

const schemas = {
  string: Yup.object().shape({
    value: Yup.string().required(requiredMessage),
  }),
  email: Yup.object().shape({
    value: Yup.string().required(requiredMessage).email('Email provided is invalid'),
  }),
}

const emailSchema = Yup.object().shape({
  value: Yup.string().required(requiredMessage).email('Email provided is invalid'),
});

export function AttributeModal(props) {
  const { visible, onClose, attribute } = props;
  const [validationSchema, setValidatonSchema] = useState(schemas.string);
  const attributeId = attribute.id;
  const attributeLabel = attribute.type.content.title;
  const attributeValue = attribute.data.value;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      value: attributeValue,
    },
    validationSchema: schemas[attribute.type.content.format || attribute.type.content.type],
    onSubmit: async (form) => {
      console.log(form);
      await dispatch(ducks.identity.operations.editIdAttributeOperation({
        ...attribute,
        name: form.value,
        data: {
          ...attribute.data,
          value: form.value,
        },
      }));
      
      onClose();
    },
  });
  
  const showErrors = formik.submitCount > 0;
  
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Edit Information"
      footer={null}
    >
      <Grid marginBottom={20} marginTop={0}>
        <Row>
          <Col>
            <SelectBox
              label="Type"
              selectedValue={attributeId}
              placeholder="Select a type"
              items={[{
                label: attributeLabel,
                value: attributeId,
              }]}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              label="Value"
              placeholder="Value"
              value={formik.values.value}
              error={showErrors && !!formik.errors.value}
              errorMessage={formik.errors.value}
              onChangeText={formik.handleChange('value')}
              required
            />
          </Col>
        </Row>
      </Grid>
      <Grid marginTop={32} marginBottom={5}>
        <Row justifyContent="flex-end">
          <Col autoWidth>
            <Button type="shell-primary" onPress={onClose}>Cancel</Button>
          </Col>
          <Col autoWidth style={{ width: 95 }}>
            <Button type="primary" onPress={formik.handleSubmit}>Save</Button>
          </Col>
        </Row>
      </Grid>
    </Modal>
  );
}
