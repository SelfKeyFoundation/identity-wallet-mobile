import React from 'react';
import {Text, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {
  H1,
  H2,
  H3,
  H4,
  Container,
  Paragraph,
  Ammount,
  AmmountLarge,
  DefinitionTitle,
  DefinitionDescription,
  Explanatory,
  ButtonLink,
  TableHeader,
  TableText,
  TableSmallText,
  TableSmallLink,
  FormPlaceholder,
  FormText,
  FormTextError,
  FormLabel,
  ErrorMessage,
  WarningMessage,
} from '@selfkey/mobile-ui';

storiesOf('Typography', module)
  .add('Headings', () => (
    <Container centered>
      <H1>H1 - Heading</H1>
      <H2>H2 - Heading</H2>
      <H3>H3 - Heading</H3>
      <H4>H4 - Heading</H4>
    </Container>
  ))
  .add('Body Text', () => (
    <Container centered>
      <Paragraph>Paragraph</Paragraph>
      <Ammount>Ammount</Ammount>
      <AmmountLarge>Ammount Large</AmmountLarge>
      <DefinitionTitle>Definition Title</DefinitionTitle>
      <DefinitionDescription>Definition Description</DefinitionDescription>
      <Explanatory>Explanatory</Explanatory>
      <ButtonLink>Button Link</ButtonLink>
    </Container>
  ))
  .add('Tables', () => (
    <Container centered>
      <TableHeader>Table Header</TableHeader>
      <TableText>Table Text</TableText>
      <TableSmallText>Table Small Text</TableSmallText>
      <TableSmallText disabled>Table Small Text Disabled</TableSmallText>
      <TableSmallLink>Table Small Link</TableSmallLink>
    </Container>
  ))
  .add('Forms', () => (
    <Container centered>
      <FormPlaceholder>Form Placeholder</FormPlaceholder>
      <FormText>Form Text</FormText>
      <FormTextError>Form Text Error</FormTextError>
      <FormLabel>Form Label</FormLabel>
      <ErrorMessage>Error Message</ErrorMessage>
      <WarningMessage>Warning Message</WarningMessage>
    </Container>
  ));
