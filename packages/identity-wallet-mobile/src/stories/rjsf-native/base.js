import React from 'react';
import { ScreenContainer } from '@selfkey/mobile-ui';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { RNForm } from '@selfkey/rjsf-native';

const schema = {
  type: "object",
  properties: {
    foo: {
      type: "object",
      properties: {
        bar: {type: "string"}
      }
    },
    documents: {
      type: "array",
      items: {
        type: "object",
        properties: {
          description: {
            "type": "string"
          }
        }
      }
    }
  }
}

const uiSchema = {
  foo: {
    bar: {
      "ui:widget": "text"
    },
  },
  documents: {
    // note the "items" for an array
    items: {
      description: {
        "ui:widget": "text"
      }
    }
  }
}

storiesOf('JSON Schema Form', module)
  .add('Base', () => (
    <ScreenContainer>
      <RNForm
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={(props) => {
          console.log('submit', props);
        }}
      />
    </ScreenContainer>
  ));
