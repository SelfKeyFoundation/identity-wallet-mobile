import React from 'react';
import { Button } from 'react-native-paper';
import { withPaperTheme } from '../mobile-ui-provider';

export const PrimaryButton = withPaperTheme((props) => {
  return <Button {...props} mode="contained" />;
});
