import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { ThemeContext } from '../mobile-ui-provider';

export function PrimaryButton(props) {
  const theme = useContext(ThemeContext);
  return <Button {...props} theme={theme} mode="contained" />;
}
