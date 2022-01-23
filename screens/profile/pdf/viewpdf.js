import * as React from 'react'
import { View ,ActivityIndicator} from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import {useRoute} from '@react-navigation/native'; 
import Header from '../../../components/header';
import { colorPrimary } from '../../../constants/colors';
import { height, width } from '../../../constants/dimensions';


export default function ViewPDFScreen(){
    const route = useRoute();
    let [loading,setLoading] = React.useState(true);

    return (
        <View style={{flex:1}}>
            <Header pagename={route.params.title}/>
            {loading ? <View style={{flex:1,height:height,width:width,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator color={colorPrimary} size="large"/>
            </View> :<View/>}
            <PDFReader
                    onLoad={()=>{setLoading(false)}}
                    withPinchZoom={true}
                    source={{
                    uri: route.params.path,
                }}
            />
        </View>
    )
}