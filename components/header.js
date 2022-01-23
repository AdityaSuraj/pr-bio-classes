import React from 'react';
import {View,Text,StatusBar, TouchableOpacity} from 'react-native';
import { colorPrimary } from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation,useRoute} from '@react-navigation/native';

const Header = (props)=>{
    const navigation = useNavigation();

    return (        
        <View style={{height:60,backgroundColor:"white",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,elevation:1}}>
            <StatusBar backgroundColor={colorPrimary}/>
            <Text style={{fontSize:20,color:colorPrimary}} numberOfLines={1}>{props.pagename}</Text>
            {props.isShowNotiBell == null ? 
                    <Icon name="bell" size={24} color={colorPrimary} onPress={()=>{navigation.navigate('NotificationScreen')}}/>
                : <View/>
            }
        </View>
    )
}

export default Header;