
import React,{Component} from 'react' 
import {View,StatusBar} from 'react-native'
import {Text, Button, Icon, Container, Header, Content, Footer, Left, Body, Right, Title, Subtitle, FooterTab, Form, Item, Label,Input,List, ListItem} from 'native-base'
import BestPersonList from '../person/bestPersonList'
import MapManager from '../shared/MapManager'
import { Calendar} from 'react-native-general-calendars';

export  class MainHome extends Component {
 
   
    render()
    {
        return  (<View>
          <BestPersonList screenProps={this.props.screenProps} navigation={this.props.navigation}/>
        </View>)
    }

}


export  class MapHome extends Component {
  
  
  constructor(props)
  {
    super(props);

    this.state={locations:[]};

    this.props.navigation.addListener("willFocus",()=>{

      this.load();
    });

  }

 async load()
  {
   await this.props.screenProps.personService.getList();

   for (let person of this.props.screenProps.personService.list) {

     this.state.locations=[...this.state.locations,{lat:Number(person.lat),lng:Number(person.lng),des:person.firstName+' '+person.lastName,uri:person.pic}];
   }
   this.forceUpdate();
  }

    render()
    {
        return  (<View>
          <MapManager  locations={this.state.locations} navigation={this.props.navigation}/>
       

        </View>)
    }

}



export  class GalleryHome extends Component {
 
    render()
    {
        return  (<View><Text>گالری</Text></View>)
    }

}

export  class HomeTabs extends Component {
 
  render()
  {
    let index=this.props.navigationState.index;
      return  (
      <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Button  full danger={index==0} vertical onPress={()=>{this.props.navigation.navigate("MainHomeTab")}}>
              <Icon name="apps" />
              <Text>پیشنهادی</Text>
            </Button>
            </View>
            <View style={{flex:1}}>
            <Button full vertical danger={index==1} onPress={()=>{this.props.navigation.navigate("MapHomeTab")}}>
              <Icon name="map" />
              <Text>نقشه</Text>
            </Button>
           </View>
           <View style={{flex:1}}>
            <Button full vertical danger={index==2} onPress={()=>{this.props.navigation.navigate("GalleryHomeTab")}}>
              <Icon name="image"  type="FontAwesome" />
              <Text>گالری</Text>
            </Button>
            </View>
          
    </View>
      )
  }

}