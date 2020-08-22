import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from '@selfkey/wallet-core/utils/validation-utils';
import { RNForm } from '@selfkey/rjsf-native';
import { SelectBox } from '../../components';
import ducks from '@selfkey/wallet-core/modules';
import { containsFile, removeMeta } from '@selfkey/wallet-core/modules/identity/json-schema-utils';

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

const LabelGrid = styled(Grid)`
  border: 0px solid #475768;
  border-bottom-width: 1px;
`;


const requiredMessage = 'This field is required';
;

function prepareSchema(attribute) {
  const content = removeMeta(attribute.content);
  delete content.title;
  return content;
}

let currentLabel;

export function DocumentModal(props) {
  const { visible, onClose, profile } = props;
  const isEditMode = !!props.attribute;
  const dispatch = useDispatch();
  const idAttributes = useSelector(ducks.identity.selectors.selectAttributeTypesFiltered);
  const uiSchemas = useSelector(ducks.identity.selectors.selectUISchemas);
  const [attribute, setAttribute] = useState(isEditMode && idAttributes.find(item => item.id === props.attribute.typeId));
  const [label, setLabel] = useState(isEditMode && props.attribute.name);
  const [labelError, setLabelError] = useState(null);
  const [formData, setFormData] = useState(isEditMode ? props.attribute.data.value : null);
  const attributeId = attribute && attribute.id;
  let attrList = idAttributes.filter((attr) => containsFile(attr.content));

  useEffect(() => {
    currentLabel = isEditMode ? props.attribute.name : null;
  }, []);

  attrList = attrList.map((attr) => ({
    label: attr.content.title,
    value: attr.id,
  }));

  const uiSchema = attribute && uiSchemas.find((item) => item.attributeTypeId === attribute.id);
  const handleLabelChange = value => {
    currentLabel = value;
    setLabel(value);
  }
  const handleAttributeSelect = (value) => {
    const attr = idAttributes.find(item => item.id === value);
    setAttribute(attr);
  };

  const handleSubmit = (formProps) => {
    const { formData } = formProps;

    setFormData(formData);

    if (!currentLabel) {
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

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Documents`}
      footer={null}
    >
      <Grid marginBottom={20} marginTop={0}>
        <Row>
          <Col>
            <SelectBox
              label="Document Type"
              selectedValue={attributeId}
              placeholder="Select"
              items={attrList}
              disabled={isEditMode}
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
      {
        attribute ? (
          <RNForm
            schema={prepareSchema(attribute)}
            uiSchema={uiSchema.content}
            onSubmit={handleSubmit}
            formData={formData}
            onChange={(evt) => {
              const { formData } = evt;
              setFormData(formData)
            }}
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
                            return;
                          } else {
                            setLabelError(null);
                          }

                          onSubmit();
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
      }
    </Modal>
  );
}
