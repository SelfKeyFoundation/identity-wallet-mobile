import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { SKIcon } from '@selfkey/mobile-ui';
import iconSelection from '@selfkey/mobile-ui/lib/icons/selection.json';


function renderIcon(icon) {
  const { name } = icon.properties;

  return (
    <View style={{ width: 100, paddingBottom: 20, alignItems: 'center' }}>
      <SKIcon size={20} name={name} />
    </View>
  )
}

storiesOf('Icons', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {getStory()}
    </View>
  ))
  .add('default', () => (
    <View style={{
      paddingTop: 10,
      flexDirection: 'row',
      flexWrap: "wrap",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {
        iconSelection.icons.map(renderIcon) 
      }
    </View>
  ))
