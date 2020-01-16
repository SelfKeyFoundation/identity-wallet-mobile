import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import modules from '@selfkey/wallet-core/modules';
import styled from 'styled-components/native';
import { Grid, Row, Col } from '@selfkey/mobile-ui';
import { SettingsMenu } from './SettingsMenu';

function SettingsScreenContainer(props) {
  return (
    <SettingsMenu />
  );
} 

export default SettingsScreenContainer;