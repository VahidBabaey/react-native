import React, { Component } from 'react';
import { View, Text, Image,StatusBar } from 'react-native';
 
export default class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      align: 'center',
      alignsecond: false,
    };
    
  }
   render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent:'center',
          marginHorizontal: 40,
        }}>
         

        <Image
          source={require('../asset/sidebar.jpeg')} style={{ width: 100, height: 100 }}/>
       
          <View style={{ margin: 10 }}>
            <Text
              style={{ color: '#114998', fontSize: 20, fontWeight: 'bold' }}>
             نرم افزار خدمت یار
            </Text>
          </View>
      </View>
    );
  }
}
