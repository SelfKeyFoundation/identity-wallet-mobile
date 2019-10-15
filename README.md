# Identity wallet mobile
The React Native mobile application for SelfKey.

## Setup dev environment
There are some differences to setup iOS and Android environments, but for both envs you need to have the following:

* Node 10.16
* Yarn 1.18.0

### Android
Setting up the Android environment is support by MacOS, linux and windows.
You need the following:

* Android SDK
* Android Studio

### iOS
Setting up the iOS environment is just supported by MacOS, linux and windows are unable to compile and execute iOS projects.
You need the following:

* xCode 10.3

## How to run
All the commands must be executed from the root directory and it requires you development environment to be already setup.

### Android (Emulator)
* Open the android emulator
* yarn start
* yarn android

### iOS (Emulator)
* yarn start
* yarn ios --simulator "iPhone 11"

### Android (Real Device)
* yarn start
* yarn android

### iOS (Real device)
* yarn start
* yarn ios
