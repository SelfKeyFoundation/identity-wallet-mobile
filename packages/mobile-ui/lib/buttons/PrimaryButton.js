import React from 'react';
import { Button } from 'react-native-paper';
import { withTheme } from '../mobile-ui-provider';

export const PrimaryButton = withTheme((props) => {
  return <Button {...props} mode="contained" />;
});
