import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import AnodinaRegular from "./AnodinaRegular";

export function VideoItem(props) {
    // const [videoId, setVideoId] = useState(null);
    // const [video, setVideo] = useState();
    // const [image, setImage] = useState();
    // const [title, setTitle] = useState();
    //
    // function youtube_parser(url) {
    //     let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    //     let match = url.match(regExp);
    //     return (match && match[7].length == 11) ? match[7] : false;
    // }
    //
    //
    // useEffect(() => {
    //
    //     if (props.url) {
    //         setVideoId(youtube_parser(props.url));
    //         if (videoId) {
    //             youtube.get('/videos', {
    //                 params: {
    //                     id: videoId,
    //                     key: URLs.YOUTUBE_KEY,
    //                     part: 'snippet',
    //                     maxResults: 10,
    //                 }
    //             }).then((response) => {
    //                 if (response && response.data && response.data.items && response.data.items.length)
    //                     setVideo(response.data.items[0])
    //                 setTitle(response.data.items[0].snippet.title)
    //                 setImage({uri: response.data.items[0].snippet.thumbnails.medium.url})
    //                 // setVideos(response.data.items)
    //             }).catch(err => {
    //                 console.log(err.response.data)
    //             });
    //         }
    //     } else {
    //         if (props.image) setImage(props.image)
    //         if (props.title) setTitle(props.title)
    //     }
    //
    //
    // }, [videoId]);
    return (
        <TouchableOpacity onPress={props.handler}
                          style={{marginRight: 20, marginBottom: 50}}>
            <Image source={props.image} style={{width: 100, height: 100, marginBottom: 10, resizeMode: 'cover'}}
                   resizeMode="cover"/>
            <AnodinaRegular
                style={{
                    flex: 1,
                    color: 'white'
                }}>{props.title.substring(0, 10) + "..."}</AnodinaRegular>
        </TouchableOpacity>
    );
}
