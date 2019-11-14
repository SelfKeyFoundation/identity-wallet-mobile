/**
 * Hook to control the internal state for create password
 * It could be used by any platform other than react native
 *
 */
import { useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { validateAll } from '@selfkey/wallet-core/utils/validation-utils';

/**
 *
 * @param {*} props
 */
export function useConfirmPasswordController(props) {
  const { password } = props;

  const schema = useMemo(() => Yup.object().shape({
    confirmPassword: Yup.string()
      .required('required')
      .test('match_with_password', 'match_with_password', value => {
        return value === password;
      }),
  }), [password]);

  const formik = useFormik({
    initialValues: {
      password: password,
      confirmPassword: '',
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
