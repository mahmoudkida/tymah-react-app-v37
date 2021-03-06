import * as React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, ImageBackground, View} from 'react-native';
import BubbleText from "./BubbleText";
import {VideoItem} from "./VideoItem";
import URLs from "../constants/URLs";

export function VideosSection(props) {
    const [videos, setVideos] = useState();
    useEffect(() => {

        // youtube.get('/search', {
        //     params: {
        //         q: props.title,
        //         key: URLs.YOUTUBE_KEY,
        //         part: 'snippet',
        //         maxResults: 10,
        //     }
        // }).then((response) => {
        //     setVideos(response.data.items)
        // }).catch(err => {
        //     console.log(err.response.data)
        // });

    }, [videos])
    return (


        <ImageBackground source={props.background}
                         imageStyle={{
                             resizeMode: "cover",
                             alignSelf: "flex-start",
                             width: "100%", height: "100%",
                         }}
                         style={{
                             marginTop: props.index !== 0 ? -65 : 0,
                             width: '100%',
                             flex: 1,

                         }}>
            <View style={{paddingTop: 60, paddingBottom: 30}}>
                <BubbleText
                    style={{
                        width: '100%',
                        fontSize: 22,
                        color: 'white',
                        paddingLeft: 20,
                        marginBottom: 20
                    }}>
                    {props.title}
                </BubbleText>
                <FlatList
                    contentContainerStyle={{paddingLeft: 20}}
                    horizontal={true}
                    data={props.videos}
                    renderItem={({item}, index) => {
                        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                        let match = item.url.match(regExp);
                        let videoId = (match && match[7].length == 11) ? match[7] : false;

                        return (
                            <VideoItem handler={() => {
                                props.navigation.navigate('Video', {videoId: videoId, videoTitle: item.Title})
                            }} key={index} url={item.url} title={item.Title}
                                       image={{uri: URLs.API_URL + item.thumbnail.url}}/>
                        )
                    }
                    }
                />

            </View>
        </ImageBackground>

    );
}
