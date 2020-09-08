import React from "react";
import { FieldTemplateProps } from "@selfkey/rjsf-core";
import {
  ScreenContainer,
  Modal,
  Button,
  SKIcon,
  Grid,
  Col,
  Row,
  Alert,
  ThemeContext,
  Paragraph,
  Explanatory,
  Link,
  DefinitionTitle,
  ExplanatorySmall,
  FormLabel,
  TextInput,
  H3,
  FormattedNumber,
  FormControl
} from 'design-system';
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import Typography from "@material-ui/core/Typography";

const FieldTemplate = ({
  id,
  children,
  displayLabel,
  required,
  rawErrors = [],
  rawHelp,
  rawDescription,
}: FieldTemplateProps) => {
  return (
    // <FormLabel>Field Template</FormLabel>
    <FormControl>
      {children}
      {
        // displayLabel && rawDescription ? (
        //   <ExplanatorySmall variant="caption" color="textSecondary">
        //     {rawDescription}
        //   </ExplanatorySmall>
        // ) : null
      }
      {
        //   {rawErrors.length > 0 && (
        //     <List dense={true} disablePadding={true}>
        //       {rawErrors.map((error, i: number) => {
        //         return (
        //           <ListItem key={i} disableGutters={true}>
        //             <FormHelperText id={id}>{error}</FormHelperText>
        //           </ListItem>
        //         );
        //       })}
        //     </List>
        //   )}
        //   {rawHelp && <FormHelperText id={id}>{rawHelp}</FormHelperText>}
      }
    </FormControl>
    // <FormControl
    //   fullWidth={true}
    //   error={rawErrors.length ? true : false}
    //   required={required}>
    //   {children}
    //   {displayLabel && rawDescription ? (
    //     <Typography variant="caption" color="textSecondary">
    //       {rawDescription}
    //     </Typography>
    //   ) : null}
    //   {rawErrors.length > 0 && (
    //     <List dense={true} disablePadding={true}>
    //       {rawErrors.map((error, i: number) => {
    //         return (
    //           <ListItem key={i} disableGutters={true}>
    //             <FormHelperText id={id}>{error}</FormHelperText>
    //           </ListItem>
    //         );
    //       })}
    //     </List>
    //   )}
    //   {rawHelp && <FormHelperText id={id}>{rawHelp}</FormHelperText>}
    // </FormControl>
  );
};

export default FieldTemplate;
