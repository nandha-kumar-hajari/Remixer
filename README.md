# Remixer
## Build using React-Native

## Installation

```sh
- git clone https://github.com/nandha-kumar-hajari/Remixer
- cd [project directory]
- yarn install (or) npm install
- react-native run android (or) npm run android
```

## Packages used


| Package | Source |
| ------ | ------ |
| Lottie | [https://www.npmjs.com/package/lottie-react-native] |
| Reanimated | [https://www.npmjs.com/package/react-native-reanimated] |
| Sound | [https://www.npmjs.com/package/react-native-sound] |
| Indicators | [https://www.npmjs.com/package/react-native-indicators]|



## Working flow
- First time when the app is opened, user is asked to allow the storage permission to save audio file locally
- Song is fetched from the server and saved locally
- Loading indicator is shown when the song is being buffered and cached locally from the remote url
- After the song is fetched, user can click on the button to play the song
- Next time when the user reopens the app, even without turning on the network, song will be played


## Screenshot
![alt text](https://i.ibb.co/2hTnpDB/Screenshot-1666546705.png)

## Demo Video
https://drive.google.com/file/d/1oiv9eWmfvww3REJYdHa2ii21MKbANaZQ/view?usp=sharing




