import React, { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ImportWalletBackup } from './ImportWalletBackup';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import DocumentPicker from 'react-native-document-picker';
import fs from 'react-native-fs';

const iOSMimeTypes = [
  'public.png',
  'public.jpeg',
  'com.adobe.pdf',
  'public.data',
  'org.gnu.gnu-tar-archive',
  'public.tar-archive',
  'org.gnu.gnu-zip-archive',
  'org.gnu.gnu-zip-tar-archive',
  'public.bzip2-archive',
  'public.tar-bzip2-archive',
  'com.apple.binhex-archive',
  'com.apple.macbinary-archive',
  'com.allume.stuffit-archive',
  'public.zip-archive',
  'com.pkware.zip-archive',
  'public.content',
  'public.disk-image',
];

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
      .pick({
        type: Platform.OS === 'ios' ? iOSMimeTypes : DocumentPicker.types.allFiles,
      })
      .then(async (res) => {
        const data = await fs.readFile(res.uri, 'utf8');
        setFile({
          name: res.name,
          data,
        });
      });
  }, []);
  const handlePassword = useCallback((value) => setPassword(value), []);
  const handleSubmit = useCallback(async () => {
    if (!file || !file.data) {
      return setErrors({
        system: 'Please select a backup file',
      });
    }

    if (!password) {
      return setErrors({
        password: 'Please enter the password',
      });
    }

    setLoading(true);

    setErrors({
      password: undefined,
      system: undefined,
    });

    setTimeout(() => {
      // Give some time to the setLoading propagate and refresh the UI
      dispatch(ducks.createWallet.operations.createFromBackupOperation(file.data, password))
      .catch((err) => {
        if (err.message === 'wrong_password' || err === 'wrong_password') {
          setErrors({
            password: 'Wrong password.'
          });
        } else if (err.message === 'wrong_file') {
          setErrors({
            system: 'This is not a backup file.'
          });
        } else {
          setErrors({
            system: 'This wallet already exists.',
          });
        }
      })
      .finally(() => setLoading(false))
    }, 100);
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