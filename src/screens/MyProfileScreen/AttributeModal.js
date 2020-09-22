import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from 'core/utils/validation-utils';
import { RNForm } from 'rjsf-native';
import { SelectBox } from '../../components';
import ducks from 'core/modules';
import { containsFile, removeMeta } from 'core/modules/identity/json-schema-utils';
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
} from 'design-system';

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

const LabelGrid = styled(Grid)`
  border: 0px solid #475768;
  border-bottom-width: 1px;
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

function prepareSchema(attribute) {
  return removeMeta(attribute.content);
}

const formActions = {};
let currentFormData;
let currentLabel;

export function AttributeModal(props) {
  const { visible, onClose, profile } = props;
  const isEditMode = !!props.attribute;
  const dispatch = useDispatch();
  const idAttributes = useSelector(ducks.identity.selectors.selectAttributeTypesFiltered);
  const uiSchemas = useSelector(ducks.identity.selectors.selectUISchemas);
  const getDefaultAttribute = () => {
    if (isEditMode) {
      return idAttributes.find(item => item.id === props.attribute.typeId);
    }

    if (props.type) {
      return idAttributes.find(item => item.id === props.type);
    }

    return null;
  }

  const [attribute, setAttribute] = useState(getDefaultAttribute());
  const [label, setLabel] = useState(isEditMode && props.attribute.name);
  const [labelError, setLabelError] = useState(null);
  const [formData, setFormData] = useState(isEditMode ? props.attribute.data.value : null);

  useEffect(() => {
    currentLabel = isEditMode ? props.attribute.name : null;
  }, []);

  const attributeId = attribute && attribute.id;
  let attrList = idAttributes.filter((attr) => !containsFile(attr.content));

  attrList = attrList.map((attr) => ({
    label: attr.content.title,
    value: attr.id,
  }));

  const uiSchema = useMemo(() => attribute && uiSchemas.find((item) => item.attributeTypeId === attributeId), [attributeId, uiSchemas]);

  const handleAttributeSelect = (value) => {
    const attr = idAttributes.find(item => item.id === value);
    setAttribute(attr);
  };

  const handleSubmit = (formProps) => {
    const { formData } = formProps;

    if (!label) {
      setLabelError('This field is required');
      return;
    } else {
      setLabelError(null);
    }

    if (isEditMode) {
      dispatch(ducks.identity.operations.editIdAttributeOperation({
        ...props.attribute,
        name: label,
        data: {
          value: formData,
        },
      }));
    } else {
      dispatch(ducks.identity.operations.createIdAttributeOperation({
        typeId: attribute.id,
        name: label,
        data: {
          value: formData,
        },
      }));
    }

    onClose();
  };

  const handleLabelChange = value => {
    currentLabel = value;
    setLabel(value);
  }

  formActions.handleSubmit = handleSubmit;

  const form = useMemo(() => {
    return (
      attribute ? (
        <RNForm
          schema={prepareSchema(attribute)}
          uiSchema={uiSchema.content}
          onSubmit={(formProps) => {
            const { formData } = formProps;
            setFormData(formData);
            setTimeout(() => formActions.handleSubmit(formProps), 200);
          }}
          onChange={(formProps) => {
            currentFormData = formProps.formData;
          }}
          formData={formData}
        >
          {
            ({ onSubmit }) => {
              return (
                <Grid marginTop={32} marginBottom={5}>
                  <Row justifyContent="flex-end">
                    <Col autoWidth>
                      <Button type="shell-primary" onPress={onClose}>Cancel</Button>
                    </Col>
                    <Col autoWidth style={{ width: 95 }}>
                      <Button type="primary" onPress={() => {
                        if (!currentLabel) {
                          setLabelError('This field is required');
                        } else {
                          setLabelError(null);
                        }

                        setTimeout(onSubmit, 200);
                      }}>Save</Button>
                    </Col>
                  </Row>
                </Grid> 
              )
            }
          }
        </RNForm>
      ) : (
        <Grid marginTop={32} marginBottom={5}>
          <Row justifyContent="flex-end">
            <Col autoWidth>
              <Button type="shell-primary" onPress={onClose}>Cancel</Button>
            </Col>
            <Col autoWidth style={{ width: 95 }}>
              <Button type="primary">Save</Button>
            </Col>
          </Row>
        </Grid>
      )
    )
  }, [formData, uiSchema.content, attribute])

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Information`}
      footer={null}
    >
      <Grid marginBottom={5} marginTop={0}>
        <Row>
          <Col>
            <SelectBox
              label="Information"
              selectedValue={attributeId}
              placeholder="Select"
              items={attrList}
              disabled={isEditMode || props.type}
              onValueChange={handleAttributeSelect}
            />
          </Col>
        </Row>
      </Grid>
      { attribute ? (
        <LabelGrid marginBottom={20} marginTop={0}>
          <Row style={{ marginBottom: 20 }}>
            <Col>
              <TextInput
                label="Label"
                placeholder="Internal Naming"
                onChangeText={handleLabelChange}
                value={label}
                required
                error={!!labelError}
                errorMessage={labelError}
              />
            </Col>
          </Row>
        </LabelGrid>
        ) : null }
      { form }
    </Modal>
  );
}
