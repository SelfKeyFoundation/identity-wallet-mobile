import React from 'react';
import {
  ScreenContainer,
  Modal,
  Button,
  SKIcon,
  Grid,
  Col,
  Row,
  Alert,
  TextInput,
  ThemeContext,
  Paragraph,
  Explanatory,
  Link,
  DefinitionTitle,
  ExplanatorySmall,
  FormattedNumber,
  TableHeader,
} from '@selfkey/mobile-ui';
import { Platform, TouchableWithoutFeedback } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import styled from 'styled-components/native';
import { viewFile } from  '../RNForm'
export const FormLabel = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 12px;  
  font-family: ${props => props.theme.fonts.bold};
  text-transform: uppercase;
`;

const SelectInput = styled.View`
  background: ${ props => props.hasError ? 'rgba(255,106,106,0.05)' : '#1B2229'};
  color: ${ props => props.hasError ? props.theme.colors.error : props.theme.colors.typography};
  border: 1px solid ${ props => props.hasError ? props.theme.colors.error : '#485A6E'};
  padding: 12px 15px;
  border-radius: 4px;
`;

const SelectText = styled.Text`
  color: ${props => props.selectedItem ? 'white' : '#697C95'};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 21px;
`;

const FileText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.bold};
`;

const ErrorText = styled(FileText)`
  color: ${props => props.theme.colors.error};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.regular};
`;

function getMimeType(props) {
  const properties = props.schema.items ? props.schema.items.properties : props.schema.properties;
  const schemaTypes = properties.mimeType.enum
  const allowedTypes = [];

  if (schemaTypes.find(item => item.indexOf('image') >= 0)) {
    allowedTypes.push(DocumentPicker.types.images);
  }
  
  if (schemaTypes.find(item => item.indexOf('pdf') >= 0)) {
    allowedTypes.push(DocumentPicker.types.pdf);
  }
  
  if (schemaTypes.find(item => item.indexOf('audio') >= 0)) {
    allowedTypes.push(DocumentPicker.types.audio);
  }
  
  if (!allowedTypes.length) {
    allowedTypes.push(DocumentPicker.types.allFiles);
  }

  return allowedTypes;
}

function getIconName(item) {
  return (item.mimeType && item.mimeType.indexOf('pdf') > -1) ? 'icon-file-pdf' : 'icon-file-image';
}

function renderErrors(props) {
  const {errorSchema = {}, rawErrors} = props;
  const { content, mimeType, size } = errorSchema;
  let errorMessage;
  
  if ((content && content.__errors[0]) || (rawErrors && rawErrors[0])) {
    errorMessage = 'This field is required.';
  } else if (size && size.__errors[0]) {
    errorMessage = 'File is over 50MB. Upload a smaller file.'
  } else if (mimeType && mimeType.__errors[0]){
    errorMessage = 'Invalid file type.'
  }

  // debugger;

  if (!errorMessage) {
    return null;
  }

  return (
    <Row alignItems="center">
      <Col autoWidth>
        <SKIcon name="icon-simple-denied" color="#FF6A6A" size={29}/>
      </Col>
      <Col>
        <ErrorText>{errorMessage}</ErrorText>
      </Col>
      {/* <Col autoWidth>
        <SKIcon name="icon-delete-gray" color="#93B0C1" size={16}/>
      </Col> */}
    </Row>
  )
}
export default function FileWidget(props) {
  const isMultiple = props.multiple;
  const handleRemove = (idxToRemove) => () => {
    if (!isMultiple) {
      props.onChange(null);
      return;
    }

    props.onChange(props.formData.filter((_, idx) => idx !== idxToRemove));
  };
  const mimeTypes = getMimeType(props);

  // debugger;
  const handleSelect = () => {
    DocumentPicker
      .pick({
        type: mimeTypes,
      })
      .then((res) => {
        const fileInfo = {
          fileName: res.name,
          // content: decodeURIComponent(res.uri),
          content: Platform.OS === 'ios' ? decodeURIComponent(res.uri) : res.uri,
          mimeType: res.type,
          size: res.size,
        };

        if (isMultiple) {
          const data = [
            ...props.formData,
            fileInfo,
          ].filter(item => !!item.fileName);
  
          props.onChange(data);
          return;
        }

        props.onChange({
          ...props.formData,
          ...fileInfo,
        });
      });
  };

  return (
    <React.Fragment>
      {(props.uiSchema && props.uiSchema['ui:label'] === false) ? null : (
        <Row>
          <Col>
            <FormLabel>{props.title}{props.required ? '*' : ''}</FormLabel>
          </Col>
        </Row>
      )}
      {
        isMultiple ? props.formData.map((item, idx) => (
          item.fileName ?
            <Row alignItems="center">
              <Col autoWidth>
                <SKIcon name={getIconName(item)} color="#697C95" size={29}/>
              </Col>
              <Col>
                <TouchableWithoutFeedback onPress={() => viewFile(item.content)}>
                  <FileText>{item.fileName}</FileText>
                </TouchableWithoutFeedback>
              </Col>
              <Col autoWidth>
                <TouchableWithoutFeedback onPress={handleRemove(idx)}>
                  <SKIcon name="icon-delete-gray" color="#93B0C1" size={16}/>
                </TouchableWithoutFeedback>
              </Col>
            </Row>
          : null
        )) : (props.formData &&  props.formData.fileName ? (
          <Row alignItems="center">
            <Col autoWidth>
              <SKIcon name={getIconName(props.formData)} color="#697C95" size={29}/>
            </Col>
            <Col>
              <TouchableWithoutFeedback onPress={() => viewFile(props.formData.content)}>
                <FileText>{props.formData.fileName}</FileText>
              </TouchableWithoutFeedback>
            </Col>
            <Col autoWidth>
              <TouchableWithoutFeedback onPress={handleRemove()}>
                <SKIcon name="icon-delete-gray" color="#93B0C1" size={16}/>
              </TouchableWithoutFeedback>
            </Col>
          </Row>
        ) : null)
      }
      {
        // <Row alignItems="center">
        //   <Col autoWidth>
        //     <SKIcon name="icon-simple-denied" color="#FF6A6A" size={29}/>
        //   </Col>
        //   <Col>
        //     <ErrorText>File is over 50MB. Upload a smaller file.</ErrorText>
        //   </Col>
        //   <Col autoWidth>
        //     <SKIcon name="icon-delete-gray" color="#93B0C1" size={16}/>
        //   </Col>
        // </Row>
      }
      {
        renderErrors(props)
      }
      <Row>
        <Col>
          <Button
            type="shell-primary"
            icon={<SKIcon name="icon-folder-open" color="#00C0D9" size={18}/>}
            onPress={handleSelect}
          >
            Select File
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}