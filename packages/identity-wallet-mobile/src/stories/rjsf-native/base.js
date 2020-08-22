import React from 'react';
import { View } from 'react-native';
import { ScreenContainer } from '@selfkey/mobile-ui';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { RNForm } from '@selfkey/rjsf-native';
import schema from './schema.json';
import schema2 from './schema2.json';
import schema3 from './schema3.json';
import schema4 from './schema4.json';


// const schema = {
//   type: "object",
//   properties: {
//     foo: {
//       type: "object",
//       properties: {
//         bar: {type: "string"}
//       }
//     },
//     documents: {
//       type: "array",
//       items: {
//         type: "object",
//         properties: {
//           description: {
//             "type": "string"
//           }
//         }
//       }
//     }
//   }
// }

// const uiSchema = {
//   foo: {
//     bar: {
//       "ui:widget": "text"
//     },
//   },
//   documents: {
//     // note the "items" for an array
//     items: {
//       description: {
//         "ui:widget": "text"
//       }
//     }
//   }
// }

const uiSchema = {
  // "extra": {
  //   "ui:hidden": true
  // },
  // "image": {
  //   "ui:label": false
  // },
  // "selfie": {
  //   "image": {
  //     "ui:label": false
  //   }
  // },
  // "ui:order": ["image", "issued", "expires", "selfie", "extra"]
};

storiesOf('JSON Schema Form', module)
  .add('Base', () => (
    <ScreenContainer>
      <View style={{ padding: 15 }}>
        <RNForm
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={(props) => {
            console.log('submit', props);
          }}
          formData={{
            email: 'test@test.com'
          }}
        />
      </View>
    </ScreenContainer>
  ));
