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
  FormLabel,
  FormattedNumber,
  TableHeader,
} from '@selfkey/mobile-ui';
import { Platform, TouchableWithoutFeedback } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import styled from 'styled-components/native';

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
    if (Platform.OS === 'ios') {
      allowedTypes.push('public.png');
      allowedTypes.push('public.jpeg');
    } else {
      allowedTypes.push(DocumentPicker.types.images);
    }
  }

  if (schemaTypes.find(item => item.indexOf('pdf') >= 0)) {
    allowedTypes.push(
      Platform.OS === 'ios' ? 'com.adobe.pdf' : DocumentPicker.types.pdf
    );
  }

  return allowedTypes;
}

function getIconName(item) {
  return (item.mimeType && item.mimeType.indexOf('pdf') > -1) ? 'icon-file-pdf' : 'icon-file-image';
}

export default function FileWidget(props) {
  const isMultiple = props.multiple;
  const handleRemove = (idxToRemove) => () => {
    props.onChange(props.formData.filter((_, idx) => idx !== idxToRemove));
  };
  const mimeTypes = getMimeType(props);

  const handleSelect = () => {
    DocumentPicker
      .pick({
        type: mimeTypes,
      })
      .then((res) => {
        const fileInfo = {
          fileName: res.name,
          content: res.uri,
          mimeType: res.type,
          size: res.size,
        };

        if (isMultiple) {
          props.onChange([
            ...props.formData,
            fileInfo,
          ]);
          return;
        }

        props.onChange({
          ...props.formData,
          ...fileInfo,
        });
      });
  };

  if (!isMultiple) {
    return (
      <React.Fragment>
        <Row alignItems="flex-end">
          <Col>
            <SelectInput>
              <SelectText>
                {props.formData.fileName || 'Select a file'}
              </SelectText>
            </SelectInput>
          </Col>
          <Col autoWidth>
            <Button
              type="full-primary"
              onPress={handleSelect}
            >
              Select
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {
        props.formData.map((item, idx) => (
          <Row alignItems="center">
            <Col autoWidth>
              <SKIcon name={getIconName(item)} color="#697C95" size={29}/>
            </Col>
            <Col>
              <FileText>{item.fileName}</FileText>
            </Col>
            <Col autoWidth>
              <TouchableWithoutFeedback onPress={handleRemove(idx)}>
                <SKIcon name="icon-delete-gray" color="#93B0C1" size={16}/>
              </TouchableWithoutFeedback>
            </Col>
          </Row>
        ))
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