
import React from 'react'
import {Alert,ToastAndroid,Platform,View,ActivityIndicator} from 'react-native'
import { placeholder } from '@babel/types';



export const successMessage=()=>{
let msg="عملیات با موفقیت انجام شد";
if(Platform.OS=="android")
{
ToastAndroid.showWithGravity(msg,ToastAndroid.LONG,ToastAndroid.CENTER)
}
else
{
    Alert.alert("اطلاع",msg,
    [
      {text:'بلی'}
       ]
    )
}
}

export const confirmMessage=(okOperation,cancelOperation)=>
{
    let msg="آیا عملیات انجام شود"

    Alert.alert("اطلاع",msg,
    [
      {text:'بلی',onPress:okOperation},
      {text:'خیر',onPress:cancelOperation}

    ],{cancelable:false}
    )
}


export const Loading=()=>{

  return (
     <View style={{ flex: 1,
         justifyContent: 'center',
         flexDirection: 'column'}}>
    
       <ActivityIndicator size="large" color="#0000ff" />

     </View>
   );  
    
}
