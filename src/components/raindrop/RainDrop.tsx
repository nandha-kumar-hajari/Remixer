import {Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DropIcon, DropTransIcon} from '../../assets/images';
import {customWidth} from '../Styles';
import RNFetchBlob from 'rn-fetch-blob';
import {MaterialIndicator} from 'react-native-indicators';

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

interface RainDropProps {}

export const RainDrop: React.FC = ({}: RainDropProps) => {
  const [playing, setPlaying] = useState();
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState();

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
    let path = RNFetchBlob.fs.dirs.DownloadDir + `/` + `rain` + `.mp3`;
    RNFetchBlob.fs
      .readFile(path, 'base64')
      .then(res => {
        console.log('Read file success home', res);
        readFileFromLocal();
      })
      .catch(err => {
        console.log('read file error', err);
        readFileFromServer();
      });

    return () => {
      music?.release();
    };
  }, []);

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
      // style={{backgroundColor: playing ? 'red' : 'black'}}
      disabled={loading}
      style={{
        backgroundColor: playing ? 'black' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: customWidth(60),
        width: customWidth(60),
        borderRadius: 100,
      }}>
      <>
        {playing ? (
          <Image
            source={DropTransIcon}
            style={{
              height: customWidth(30),
              width: customWidth(30),
              position: 'absolute',
              zIndex: 3,
            }}
          />
        ) : (
          <>
            {loading ? (
              <MaterialIndicator trackWidth={3} size={50} color="white" />
            ) : null}
            <Image
              source={DropIcon}
              style={{
                height: customWidth(30),
                width: customWidth(30),
                position: 'absolute',
                zIndex: 3,
              }}
            />
          </>
        )}
      </>
    </TouchableOpacity>
  );
};
