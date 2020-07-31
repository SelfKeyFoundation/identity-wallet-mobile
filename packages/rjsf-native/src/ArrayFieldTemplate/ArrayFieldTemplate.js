import React from 'react';
import { utils } from '@selfkey/rjsf-core';
import { ArrayFieldTemplateProps, IdSchema } from '@selfkey/rjsf-core';
import AddButton from '../AddButton/AddButton';
import IconButton from '../IconButton/IconButton';
import FileWidget from '../FileWidget/FileWidget';

import {
  Grid,
  Col,
  Row,
  Explanatory,
  Button
} from '@selfkey/mobile-ui';

const {
  isMultiSelect,
  getDefaultRegistry,
} = utils;

const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { schema, registry = getDefaultRegistry() } = props;

  if (props.uiSchema['ui:hidden'] === true) {
    return null;
  }

  // TODO: update types so we don't have to cast registry 
  if (isMultiSelect(schema, (registry).rootSchema)) {
    return <DefaultFixedArrayFieldTemplate {...props} />;
  } else {
    return <DefaultNormalArrayFieldTemplate {...props} />;
  }
};

type ArrayFieldTitleProps = {
  TitleField: any;
  idSchema: IdSchema;
  title: string;
  required: boolean;
};

const ArrayFieldTitle = ({
  TitleField,
  idSchema,
  title,
  required,
}: ArrayFieldTitleProps) => {
  if (!title) {
    return null;
  }
  
  const id = `${idSchema.$id}__title`;
  return <TitleField id={id} title={title} required={required} />;
};

type ArrayFieldDescriptionProps = {
  DescriptionField: any;
  idSchema: IdSchema;
  description: string;
};

const ArrayFieldDescription = ({
  DescriptionField,
  idSchema,
  description,
}: ArrayFieldDescriptionProps) => {
  if (!description) {
    return null;
  }
  
  const id = `${idSchema.$id}__description`;
  return <DescriptionField id={id} description={description} />;
};

const withMockEvent = (callback) => (event = {}) => {
  const target = {
    blur() {}
  };

  callback({
    preventDefault(){},
    target,
    currentTarget: target
  });
}
// Used in the two templates
const DefaultArrayItem = (props: any) => {
  const btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold',
  };
  
  return (
    <Row>
      <Col>
        {
          props.children
        }
      </Col>
      {
        props.hasToolbar ? (
          <Col>
            {(props.hasMoveUp || props.hasMoveDown) && (
              <Button
                disabled={props.disabled || props.readonly || !props.hasMoveUp}
                onPress={withMockEvent(props.onReorderClick(props.index, props.index - 1))}
              >
                Up
              </Button>
            )}
            {(props.hasMoveUp || props.hasMoveDown) && (
              <Button
                disabled={props.disabled || props.readonly || !props.hasMoveDown}
                onPress={withMockEvent(props.onReorderClick(props.index, props.index + 1))}
              >
                Down
              </Button>
            )}
            {props.hasRemove && (
              <Button
                disabled={props.disabled || props.readonly}
                onPress={props.onDropIndexClick(props.index)}
              >
                Remove
              </Button>
            )}
          </Col>
        ) : null
      }
    </Row>
  );
};

const DefaultFixedArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  return (
    <Explanatory>DefaultFixedArrayFieldTemplate</Explanatory>
    // <fieldset className={props.className}>
    //   <ArrayFieldTitle
    //     key={`array-field-title-${props.idSchema.$id}`}
    //     TitleField={props.TitleField}
    //     idSchema={props.idSchema}
    //     title={props.uiSchema['ui:title'] || props.title}
    //     required={props.required}
    //   />

    //   {(props.uiSchema['ui:description'] || props.schema.description) && (
    //     <div
    //       className="field-description"
    //       key={`field-description-${props.idSchema.$id}`}
    //     >
    //       {props.uiSchema['ui:description'] || props.schema.description}
    //     </div>
    //   )}

    //   <div
    //     className="row array-item-list"
    //     key={`array-item-list-${props.idSchema.$id}`}
    //   >
    //     {props.items && props.items.map(DefaultArrayItem)}
    //   </div>

    //   {props.canAdd && (
    //     <AddButton
    //       className="array-item-add"
    //       onClick={props.onAddClick}
    //       disabled={props.disabled || props.readonly}
    //     />
    //   )}
    // </fieldset>
  );
};

const DefaultNormalArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const items = props.schema.items;

  // check
  if (items && items.format === 'file') {
    return (
      <FileWidget {...props} multiple />
    );
  }

  return (
    <Row elevation={2}>
      <Col p={2}>
        <ArrayFieldTitle
          key={`array-field-title-${props.idSchema.$id}`}
          TitleField={props.TitleField}
          idSchema={props.idSchema}
          title={props.uiSchema['ui:title'] || props.title}
          required={props.required}
        />

        {(props.uiSchema['ui:description'] || props.schema.description) && (
          <ArrayFieldDescription
            key={`array-field-description-${props.idSchema.$id}`}
            DescriptionField={props.DescriptionField}
            idSchema={props.idSchema}
            description={
              props.uiSchema['ui:description'] || props.schema.description
            }
          />
        )}

        <Grid container={true} key={`array-item-list-${props.idSchema.$id}`}>
          {props.items && props.items.map(p => DefaultArrayItem(p))}

          {
            props.canAdd && (
            <Row>
              <Col mt={2}>
                <AddButton
                  className="array-item-add"
                  onPress={props.onAddClick}
                  disabled={props.disabled || props.readonly}
                />
              </Col>
            </Row>
          )
         }
        </Grid>
      </Col>
    </Row>
  );
};

export default ArrayFieldTemplate;
