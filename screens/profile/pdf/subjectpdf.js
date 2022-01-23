import React from 'react';
import {View,Text, SafeAreaView,Image, ScrollView,TextInput, TouchableOpacity} from 'react-native';
import Header from '../../../components/header';
import Icon from 'react-native-vector-icons/Fontisto';
import * as SecureStore from 'expo-secure-store';
import {useNavigation,useRoute} from '@react-navigation/native';
import { width } from '../../../constants/dimensions';
import { colorPrimary } from '../../../constants/colors';

const SubjectPDFScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();
    let [pdfs,setPdfs] = React.useState(null);

    React.useEffect(()=>{
        setPdfs(
            route.params.pdfs.map((pdf)=>{
                return <View key={Math.random()} style={{width:width-24,backgroundColor:"white",padding:8,marginVertical:8}}>
                        <Text style={{fontSize:20,fontWeight:"bold",color:colorPrimary}}>{pdf['title']}</Text>
                        <Text style={{fontSize:16,color:"black"}}>{pdf['description']}</Text>
                        <View style={{flexDirection:"row",alignItems:"center",paddingVertical:6,justifyContent:"space-between"}}>
                            <Text style={{fontWeight:"bold"}}>{pdf['date']}</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate("ViewPDFScreen",{path:pdf['path'],title:pdf['title']})}}>
                                <View style={{paddingHorizontal:16,paddingVertical:6,backgroundColor:colorPrimary}}>
                                    <Text style={{color:"white",fontWeight:"bold"}}>Read Now</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
            })
        )
    },[])

    return (
        <View style={{flex:1}}>
            <Header pagename={route.params.title + " PDF"}/>
            <ScrollView >
                <View style={{padding:12}}>
                   {pdfs}
                </View>
            </ScrollView>
        </View>
    )
}

export default SubjectPDFScreen;