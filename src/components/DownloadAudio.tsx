
import RNFetchBlob from 'rn-fetch-blob'
import { Platform } from 'react-native';
// import Toast from 'react-native-simple-toast';


export default function downloadFile(source,name) {

    let date = new Date();
    let FILE_URL = source;
 

    let file_ext = 'mp3'
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.MusicDir;
    const { dirs } = RNFetchBlob.fs;
    const iosdirs = RNFetchBlob.fs.dirs;
    const iosOptions = {
        fromUrl: FILE_URL,
        toFile: `${name}.mp3`,
        path: iosdirs.MusicDir + '/' + name,
        fileCache: true,
    }

    let options = {
        fileCache: true,
        addAndroidDownloads: {
            path:
                RootDir +
                '/Remixer' +name+
                // Math.floor(date.getTime() + date.getSeconds() / 2) +
                file_ext,
            description: 'downloading file...',
            notification: false,
            // useDownloadManager works with Android only
            useDownloadManager: false,
        },
    }

    if (Platform.OS === 'ios') {

    const dirToSave = Platform.OS == 'ios' ? dirs.MusicDir : dirs.MusicDir
    const configfb = {
        fileCache: true,
        useDownloadManager: false,
        notification: false,
        mediaScannable: true,
        title: name,
        path: `${dirToSave}/${name}`,
    }

    const configOptions = Platform.select({
        ios: {
            fileCache: configfb.fileCache,
            title: configfb.title,
            path: configfb.path,
            // appendExt: 'mp3',
        },
        android: configfb,
    });

    RNFetchBlob.config(configOptions)
    .fetch('GET', `${FILE_URL}`, {})
    .then((res) => {
        if (Platform.OS === "ios") {
            RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
            // RNFetchBlob.ios.previewDocument(configfb.path);
        }
        console
        // Toast.show('File Downloaded Successfully', Toast.SHORT)

        console.log('The file saved to ', res);
    })
    .catch((e) => {

        console.log('The file saved to ERROR', e.message)
    });
    }
    else {

        config(Platform.OS === 'ios' ? iosOptions : options)
            .fetch('GET', FILE_URL)
            .then(res => {
                // Alert after successful downloading
                // if (Platform.OS === 'ios') {
                //     RNFetchBlob.fs.writeFile(iosOptions.toFile, res.data, 'base64');
                //     RNFetchBlob.ios.previewDocument(iosOptions.toFile);
                // }
                console.log('res -> ', JSON.stringify(res));
                // alert('File Downloaded Successfully.');
                // Toast.show('File Downloaded Successfully', Toast.SHORT)

            }).catch((e) => {
                // setisdownloaded(true)
                // showSnackbar(e.message);
                console.log('The file saved to ERROR', e.message)
            })

    }

};

// const getFileExtention = fileUrl => {
//     // To get the file extension
//     return /[.]/.exec(fileUrl) ?
//         /[^.]+$/.exec(fileUrl) : undefined;
// };