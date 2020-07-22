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
import { Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import styled from 'styled-components/native';

const iOSMimeTypes = [
  'public.png',
  'public.jpeg',
  'com.adobe.pdf',
  'public.data',
  'org.gnu.gnu-tar-archive',
  'public.tar-archive',
  'org.gnu.gnu-zip-archive',
  'org.gnu.gnu-zip-tar-archive',
  'public.bzip2-archive',
  'public.tar-bzip2-archive',
  'com.apple.binhex-archive',
  'com.apple.macbinary-archive',
  'com.allume.stuffit-archive',
  'public.zip-archive',
  'com.pkware.zip-archive',
  'public.content',
  'public.disk-image',
];

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

export default function FileWidget(props) {
  const isMultiple = props.multiple;

  const handleSelect = () => {
    DocumentPicker
      .pick({
        type: Platform.OS === 'ios' ? iOSMimeTypes : DocumentPicker.types.allFiles,
      })
      .then((res) => {
        debugger;

        if (isMultiple) {
          props.onChange([
            ...props.formData,
            {
              'content': 'stuff',
              'mimeType': 'image/png',
              'size': 123323,
            }
          ]);
          return;
        }

        props.onChange({
          ...props.formData,
          'content': 'stuff',
          'mimeType': 'image/png',
          'size': 123323,
        });
        // const data = await fs.readFile(res.uri, 'utf8');
        // setFile({
        //   name: res.name,
        //   data,
        // });
      });
  };

  return (
    <React.Fragment>
      <Row alignItems="center">
        <Col autoWidth>
          <SKIcon name="icon-file-pdf" color="#697C95" size={29}/>
        </Col>
        <Col>
          <FileText>My ID Card</FileText>
        </Col>
        <Col autoWidth>
          <SKIcon name="icon-delete-gray" color="#93B0C1" size={16}/>
        </Col>
      </Row>
      <Row alignItems="center">
        <Col autoWidth>
          <SKIcon name="icon-simple-denied" color="#FF6A6A" size={29}/>
        </Col>
        <Col>
          <ErrorText>File is over 50MB. Upload a smaller file.</ErrorText>
        </Col>
        <Col autoWidth>
          <SKIcon name="icon-delete-gray" color="#93B0C1" size={16}/>
        </Col>
      </Row>
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