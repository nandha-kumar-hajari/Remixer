import {Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DropIcon, DropTransIcon} from '../../assets/images';
import {customWidth} from '../Styles';
import RNFetchBlob from 'rn-fetch-blob';
import {MaterialIndicator} from 'react-native-indicators';
import Style from './RainDropStyle';

//Usede react-native-sound library to play sounds from network or local storage
var Sound = require('react-native-sound');

Sound.setCategory('Playback');

export interface RainDropProps {}

export const RainDrop: React.FC = ({}: RainDropProps) => {
  const [playing, setPlaying] = useState();
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState();

  //if the file is not in local storage the download will be started
  const startDownload = () => {
    let url = 'https://www.mboxdrive.com/Rain for Deep Sleep.mp3';
    let name = 'rain';
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        title: name,
        path: RNFetchBlob.fs.dirs.DownloadDir + `/` + `${name}` + `.mp3`, // Android platform
        mime: 'audio/mp3',
        description: 'Downloading the file',
      },
    })
      .fetch('GET', url)
      .then(res => {
        console.log('res', res);
        console.log('The file is save to ', res.path());
      });
  };

  //For the first time when user opens the app, audio will be played from remote server and file will be saved to local storage
  const readFileFromServer = () => {
    setLoading(true);
    var audio = new Sound(
      'https://www.mboxdrive.com/Rain for Deep Sleep.mp3',
      null,
      (error: any) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // if loaded successfully
        setLoading(false);
        startDownload();
        console.log(
          'duration in seconds: ' +
            audio.getDuration() +
            'number of channels: ' +
            audio.getNumberOfChannels(),
        );
      },
    );

    async function saveState() {
      setMusic(audio);
    }
    saveState().then(() => {
      music.setVolume(0.5);
    });
  };

  const readFileFromLocal = () => {
    let path = RNFetchBlob.fs.dirs.DownloadDir + `/` + `rain` + `.mp3`;
    var audio = new Sound(path, null, (error: any) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      setLoading(false);
      console.log(
        'duration in seconds: ' +
          audio.getDuration() +
          'number of channels: ' +
          audio.getNumberOfChannels(),
      );
    });

    async function saveState() {
      setMusic(audio);
    }
    saveState().then(() => {
      music.setVolume(0.5);
    });
  };

  useEffect(() => {
    //If the file is already in local storage, the network request wont be made. Instead, the sound will be played from the device itself

    let path = RNFetchBlob.fs.dirs.DownloadDir + `/` + `rain` + `.mp3`;
    RNFetchBlob.fs
      .readFile(path, 'base64')
      .then(res => {
        console.log('Read file success home', res);
        readFileFromLocal();
      })
      .catch(err => {
        console.log('read file error rd screen', err);
        readFileFromServer();
      });

    return () => {
      music?.release();
    };
  }, []);

  //Playing and pausing the audio will be triggered here
  const playPause = () => {
    if (music.isPlaying()) {
      music.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      music.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={playPause}
      disabled={loading}
      style={{
        ...Style.touchableViewStyle,
        backgroundColor: playing ? '#3F8FEF' : 'transparent',
        marginBottom: playing ? customWidth(40) : 0,
      }}>
      <>
        {playing ? (
          <Image source={DropTransIcon} style={Style.iconStyle} />
        ) : (
          <>
            {loading ? (
              <MaterialIndicator trackWidth={3} size={50} color="white" />
            ) : null}
            <Image source={DropIcon} style={Style.iconStyle} />
          </>
        )}
      </>
    </TouchableOpacity>
  );
};
