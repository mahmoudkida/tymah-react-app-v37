import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from "react-native-easy-grid";
import Query from '../utils/query';
import { MonoText } from '../components/StyledText';
import CHARACTERS_QUERY from '../quiries/characters';
import URLs from '../constants/URLs';
import { FlatGrid } from 'react-native-super-grid';
import BubbleText from '../components/BubbleText';
import Colors from '../constants/Colors';
import {saveUserData} from '../utils/UserData'
import GridList from 'react-native-grid-list';
import {useEffect} from "react";

// import useAsyncStorage from "../utils/useAsyncStorage";
export default function SelectCharacter({ navigation }) {
  useEffect( () => {
    let  userStorageData = {};
    AsyncStorage.getItem('userData').then((data)=>{
      if(data) {
        userStorageData = JSON.parse(data);
        if(userStorageData.name && userStorageData.age && userStorageData.avatar){
          navigation.navigate('Home Page');
        }
      }
    });



  })
  return (
    <View style={[styles.container,{backgroundColor: Colors.whiteBlue}]}>
      <BubbleText
          style={[styles.PageTitle,{ color: Colors.purple}]}>Who of these looks like you
      </BubbleText>

        <Query query={CHARACTERS_QUERY} id={null} style={{flex:1}}>
        {({ data: { characters } }) => {

          return (
              <FlatList
                  style={{flex:1,height: '100%'}}
                  data={characters}
                  numColumns={2}
                  renderItem={({ item, index }) => (
                      <TouchableOpacity  key={index}  style={{flex: 1,marginBottom:40}} onPress={() => {storeCharacter(navigation, URLs.API_URL + item.Avatar.url)}}>
                        <Image style={{
                          width:'100%',
                          height: 200,

                          resizeMode: 'contain',
                        }}

                               source={{uri: URLs.API_URL + item.Avatar.url}} />

                      </TouchableOpacity>

                  )}
              />
            )
            
        }}
        
      </Query>
    </View>
  );
}

SelectCharacter.navigationOptions = {
  header: null,
};

const storeCharacter = async (navigation, avatar) =>{

  let data = await AsyncStorage.setItem('userData',JSON.stringify({avatar: avatar}))
  navigation.navigate('Your Information')
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:30 
  },
  contentContainer: {
    paddingTop: 30,
  },
  PageTitle:{
    fontSize:28,
    textAlign:'center',
    marginVertical: 30

  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
 
});
