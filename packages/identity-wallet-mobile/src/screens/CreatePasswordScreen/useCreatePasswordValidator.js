import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from './validation-utils';

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
  // confirmPassword: Yup.mixed()
  //   .when(['password'], (password) => {
  //     return Yup.mixed().oneOf([password], 'password_mismatch_error');
  //   }),
});

/**
 * Container hook for create password
 *
 * @param {*} props
 */
export function useCreatePasswordValidator(props) {
  const formik = useFormik({
    initialValues: {
      password: '',
      // confirmPassword: '',
    },
    validate: values => validateAll(schema, values),
    onSubmit: values => props.onSubmit(values),
  });

  return {
    handleChange: formik.handleChange,
    handleSubmit: formik.handleSubmit,
    values: formik.values,
    errors: formik.errors,
  };
};
