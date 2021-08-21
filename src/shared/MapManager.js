import React from 'react'

import {View,Dimensions,Image} from 'react-native'


import MapView ,{PROVIDER_GOOGLE,Marker} from 'react-native-maps'
import { Button, Icon } from 'native-base';


export default class MapManager extends React.Component
{
  
 constructor(props)
 {
   super(props);


   this.state={lat:0,lng:0
  ,userLat:0,userLng:0
  };
   this.props.navigation.addListener("willFocus",()=>{
    this.load();
     });
 }

 load()
 {
   let lat=this.props.navigation.getParam('lat');
   let lng=this.props.navigation.getParam('lng');

   if(lat!=null && lng!=null)
   {
     setTimeout(()=>{

      this.setState({lat:0,lng:0});

      this.setState({lat:Number(lat),lng:Number(lng)});
      this.props.navigation.setParams({lat:0,lng:0});
     },50);
   }
 }

  callLocation(){
  
  
    navigator.geolocation.getCurrentPosition(
     
       (position) => {

        if(this.props.selectLocation!=null)
        {
          this.props.selectLocation(position.coords.latitude,position.coords.longitude);
        }
            this.setState({userLat:position.coords.latitude,userLng:position.coords.longitude, lat:position.coords.latitude,lng:position.coords.longitude });
        
       },
       (error) => alert(error.message),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
 }

 componentDidMount()
 {
   this.callLocation();
 }

    render()
    {
      if(this.state.lat==0)
      return null;
    
        return (
            <MapView 
                style={{height:Dimensions.get('window').height}}
                  zoomControlEnabled={true}
                  provider={PROVIDER_GOOGLE}
                  zoomEnabled={true}
                  scrollEnabled={true}
                  showsScale={true}
                  loadingIndicatorColor="#228B22"
                  zoomTapEnabled={true}

                  
                  initialRegion={{
                    latitude: this.state.lat,
                    longitude: this.state.lng,
                    latitudeDelta: .0081,
                    longitudeDelta: .0091,
                 }}

                  onRegionChange={(region)=>{
                    if(this.props.selectLocation!=null)
                    {
                      this.props.selectLocation(region.latitude,region.longitude);
                    }
                    if(this.props.allowMoveUserLocation)
                    {
                      this.setState({ lat:region.latitude,lng:region.longitude,userLat:region.latitude,userLng:region.longitude });

                    }
                    else
                    {

                      this.setState({ lat:region.latitude,lng:region.longitude });
                    }
                  
                  }}>
    
                    

               <Marker 
                coordinate={{ 
                   latitude:this.state.userLat, longitude:this.state.userLng
                }}
                  description="محل شما"
                  title="محل شما"  > 
                  <Image source={require('../asset/pin.png')} style={{height:60,width:60,resizeMode:'stretch'}}/>

             </Marker>
             {
                 this.props.locations && this.props.locations.map((value,index)=>{
                   return   (<Marker 
                coordinate={{ 
                            latitude: value.lat,
                            longitude: value.lng
                         }}
                 
                  title={value.des}  > 
                  <Image source={{uri:value.uri}} style={{height:40,width:40,resizeMode:'stretch'}}/>
               </Marker>)
                 })
               }
          </MapView>

        )
    }
}