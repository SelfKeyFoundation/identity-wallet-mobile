import React from 'react';
import { CreatePassword } from './CreatePassword';
import { useCreatePasswordValidator } from './useCreatePasswordValidator';

function computePasswordStrenght(value = '') {
  let strenght = 0;

  if (value.length > 6) {
    strenght += 0.2;
  }

  if (value.length >= 8) {
    strenght += 0.1;
  }

  if ((/[a-z]/g).test(value) && (/[A-Z]/g).test(value)) {
    strenght += 0.2;
  }

  if ((/[^a-zA-Z0-9]/g).test(value)) {
    strenght += 0.2;
  }

  if ((/[0-9]/g).test(value)) {
    strenght += 0.2;
  }

  return strenght;
}

function CreatePasswordContainer(props) {
  // internal controller
  const validator = useCreatePasswordValidator({
    onSubmit: props.onSubmit,
  });

  const passwordStrenght = computePasswordStrenght(validator.values.password);

  return (
    <CreatePassword
      onChange={validator.handleChange}
      onSubmit={validator.handleSubmit}
      values={validator.values}
      errors={validator.errors}
      passwordStrenght={passwordStrenght}
    />
  );
}


export default CreatePasswordContainer;
