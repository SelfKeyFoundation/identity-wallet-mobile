import React from 'react';

// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ErrorIcon from '@material-ui/icons/Error';
// import ListItemText from '@material-ui/core/ListItemText';
// import Paper from '@material-ui/core/Paper';

import {
  Grid,
  Col,
  Row,
  Explanatory,
} from 'design-system';


import { ErrorListProps } from '@rjsf/core';

const ErrorList = ({ errors }: ErrorListProps) => (
  // <Col>
  //   <Explanatory>Error list</Explanatory>
  // </Col>
  null
  // <Paper elevation={2}>
  //   <Box mb={2} p={2}>
  //     <Typography variant="h6">
  //       Errors
  //     </Typography>
  //     <List dense={true}>
  //       {errors.map((error, i: number) => {
  //         return (
  //           <ListItem key={i}>
  //             <ListItemIcon>
  //               <ErrorIcon color="error" />
  //             </ListItemIcon>
  //             <ListItemText primary={error.stack} />
  //           </ListItem>
  //         );
  //       })}
  //     </List>
  //   </Box>
  // </Paper>
);

export default ErrorList;