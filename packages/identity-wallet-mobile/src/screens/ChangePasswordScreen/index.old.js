import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePassword } from './ChangePassword';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

function ChangePasswordContainer(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const handleBack = useCallback(() => navigate(Routes.APP_SETTINGS), []);
  const handlePasswordChange = useCallback(password => setPassword(password), []);
  const handleNewPasswordChange = useCallback(password => setNewPassword(password), []);
  const handleConfirmPasswordChange = useCallback(password => setConfirmPassword(password), []);

  const handleSubmit = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(ducks.wallet.operations.changePasswordOperation(password, newPassword, confirmPassword));
      navigate(Routes.APP_SETTINGS)
    } catch(err) {
      debugger;
      if (err.message === 'wrong_password') {
        setError({
          password: 'Wrong password. Please try again.',
        });
      } else if (err.message === 'does_not_match') {
        setError({
          confirmPasswod: 'Wrong confirmation password.',
        });
      }
    }
    setLoading(false);
  }, [isLoading, password]);

  const canSubmit = password && newPassword && confirmPassword;

  return (
    <ChangePassword
      onPasswordChange={handlePasswordChange}
      onNewPasswordChange={handleNewPasswordChange}
      onConfirmPasswordChange={handleConfirmPasswordChange}
      onSubmit={handleSubmit}
      password={password}
      canSubmit={canSubmit}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      error={error}
      onBack={handleBack}
      isLoading={isLoading}
    />
  );
}


export default ChangePasswordContainer;
