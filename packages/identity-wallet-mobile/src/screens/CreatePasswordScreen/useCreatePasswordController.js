/**
 * Hook to control the internal state for create password
 * It could be used by any platform other than react native
 *
 */
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from './validation-utils';

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

const schema = Yup.object().shape({
  password: Yup.string()
    .required('required')
    .min(8, 'min_value')
    .test('both_cases_validation', 'both_cases', value => {
      return value && (/[a-z]/g).test(value) && (/[A-Z]/g).test(value);
    })
    .test('special_character_validation', 'symbol_and_number', value => {
      return value && (/[^a-zA-Z0-9]/g).test(value) && (/[0-9]/g).test(value);
    }),
});

/**
 *
 * @param {*} props
 */
export function useCreatePasswordController(props) {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => validateAll(schema, values),
    onSubmit: values => props.onSubmit(values),
  });

  return {
    passwordStrenght: computePasswordStrenght(formik.values.password),
    handleChange: formik.handleChange,
    handleSubmit: formik.handleSubmit,
    values: formik.values,
    errors: formik.errors,
  };
};
