import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePassword } from './ChangePassword';
import { navigate, Routes } from 'core/navigation';
import ducks from 'core/modules';

function ChangePasswordContainer(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const handleBack = useCallback(() => {
    navigate(Routes.APP_SETTINGS);
    setPassword('');
  }, []);
  const handlePasswordChange = useCallback(password => setPassword(password), []);
  const handleSubmit = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(ducks.wallet.operations.changePasswordOperation(password));
      setPassword('');
    } catch(err) {
      if (err.message === 'wrong_password') {
        setError({
          password: 'Wrong password. Please try again.',
        });
      }
    }
    setLoading(false);
  }, [isLoading, password]);

  useEffect(() => {
    setPassword('');
  }, []);

  return (
    <ChangePassword
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      password={password}
      error={error}
      onBack={handleBack}
      isLoading={isLoading}
    />
  );
}


export default ChangePasswordContainer;
