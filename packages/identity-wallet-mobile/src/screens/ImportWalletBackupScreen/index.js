import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImportWalletBackup } from './ImportWalletBackup';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import DocumentPicker from 'react-native-document-picker';
import fs from 'react-native-fs';

function ImportWalletBackupContainer(props) {
  const [isLoading, setLoading] = useState();
  const [file, setFile] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({
    password: undefined,
    system: undefined,
  });
  const dispatch = useDispatch();
  const handleSelectFile = useCallback(() => {
    DocumentPicker
      .pick({})
      .then(async (res) => {
        const data = await fs.readFile(res.uri, 'utf8');
        // create funtion to unlock the data
        setFile({
          name: res.name,
          data,
        });
      });
  }, []);
  const handlePassword = useCallback((value) => setPassword(value), []);
  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      setErrors({
        password: undefined,
        system: undefined,
      });
      await dispatch(ducks.createWallet.operations.createFromBackupOperation(file.data, password));
    } catch (err) {
      if (err.message == 'wrong_password') {
        setErrors({
          password: 'Wrong password'
        });
      } else if (err.message == 'wrong_file') {
        setErrors({
          system: 'This is not a backup file'
        });
      }
      console.log(err);
    }
    setLoading(false);
  }, [password, file, setLoading, setErrors]);

  const handleBack = () => {
    navigateBack();
  };

  return (
    <ImportWalletBackup
      onSelectFile={handleSelectFile}
      onPasswordChange={handlePassword}
      onSubmit={handleSubmit}
      password={password}
      file={file}
      isLoading={isLoading}
      onBack={handleBack}
      errors={errors}
    />
  );
} 

export default ImportWalletBackupContainer;