import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem,Left, Body, Thumbnail} from 'native-base';
import {getImageFromApi} from "../API/TMDB";
import {AppleCard, AppOfTheDayCard} from 'react-native-apple-card-views';
export default function Actor({id, name, image, displayActorDetail}) {
    return (
      
           <AppleCard
           source={(image) ? {uri: getImageFromApi(image, 500)} : require('../images/default.png')}
           smallTitle=""
           largeTitle={(name)}
           footnoteText=''
           onPress = {() => displayActorDetail(id)}
           style={{height: 400, width: null, flex: 1 , marginLeft : 10, marginTop:20,marginBottom:50}}
           />
           
     
    );
}
