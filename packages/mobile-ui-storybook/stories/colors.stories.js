import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { PrimaryButton } from '@selfkey/mobile-ui/lib/buttons/PrimaryButton';
import { Theme } from '@selfkey/mobile-ui/lib/theme';

function renderColorBlock(key) {
  const color = Theme.colors[key];
  
  return (
    <View style={{ width: 100, paddingBottom: 20, alignItems: 'center' }}>
      <View style={{
        backgroundColor: color,
        width: '90%',
        height: 50,
      }}/>
      <Text>{key}</Text>
    </View>
  )
}

storiesOf('Colors', module)
  .addDecorator(getStory => <View>{getStory()}</View>)
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
        Object.keys(Theme.colors).map(renderColorBlock) 
      }
    </View>
  ))
