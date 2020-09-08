import React from 'react';

// import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/styles';

import { ObjectFieldTemplateProps } from '@rjsf/core';
import FileWidget from '../FileWidget/FileWidget';

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
} from 'design-system';

const ObjectFieldTemplate = (props) => {
  const {
    DescriptionField,
    description,
    TitleField,
    title,
    properties,
    required,
    uiSchema,
    idSchema,
    schema
  } = props;

  if (schema.format === 'file') {
    return (
      <FileWidget {...props} />
    )
  }

  return (
    <React.Fragment>
      {(uiSchema['ui:title'] || title) && (
        <TitleField
          id={`${idSchema.$id}-title`}
          title={title}
          required={required}
        />
        // null
      )}
      {description && (
        <DescriptionField
          id={`${idSchema.$id}-description`}
          description={description}
        />
      )}
      <Grid>
        {properties.map((element: any, index: number) => (
          <Row key={index}>
            <Col>
              {element.content}
            </Col>
          </Row>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default ObjectFieldTemplate;
