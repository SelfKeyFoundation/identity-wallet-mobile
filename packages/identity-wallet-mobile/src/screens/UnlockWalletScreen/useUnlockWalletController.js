import { useState, useCallback } from 'react';

/**
 *
 * @param {*} props
 */
export function useUnlockWalletController(props) {
  const [password, setPassword] = useState();

  const values = {
    password,
  };

  const handleChange = useCallback((key) => {
    return (value) => {
      setPassword(value);
    };
  });

  const handleSubmit = useCallback(() => props.onSubmit(values));

  return {
    handleChange,
    handleSubmit,
    values,
  };
}
