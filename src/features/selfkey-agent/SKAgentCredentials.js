import React from 'react';
import { Box, Button, Divider, Typography } from "design-system";
import { useDispatch } from 'react-redux';

export function SKAgentCredentials() {
  const dispatch = useDispatch();

  return (
    <Box>
      <Box row justifyContent="flex-end" padding={8}>
        <Box autoWidth>
          <Button autoWidth>+ New Credential</Button>
        </Box>
      </Box>
      <Box marginBottom={18}>
      {/* <Box flex={0} margin={12}>
        <Typography>credential:id</Typography>
      </Box>
      <Divider/> */}
      </Box>
    </Box>
  );
}
