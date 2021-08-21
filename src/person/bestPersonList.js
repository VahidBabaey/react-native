import React,{Component} from 'react' 

import {View,ScrollView,Image} from 'react-native'
import { Thumbnail ,Text, Button, Icon,Fab} from 'native-base';
 import Communications from 'react-native-communications'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import {IndicatorViewPager,PagerDotIndicator} from 'rn-viewpager'

export default class BestPersonList extends React.Component {

    personService=null;
    constructor(props)
    {
      super(props);
      this.personService=props.screenProps.personService;
      this.state={
        isLoading:false,
        persons:[],
        selections:[],
        fabActive:false
    }

      this.props.navigation.addListener("willFocus",()=>{
        this.load();
        
        });
    }

    async load()
  {
    try
    {
      this.setState({isLoading:true});
      await this.personService.getBestList();
    this.setState({persons:this.personService.list,isLoading:false});
   
    }
    catch(err)
    {
      alert(err);
    }
  
  
  }

  shouldComponentUpdate(nextProp, nextState) {
    if(this.props.screenProps.options.isConnected==false 
      && nextProp.screenProps.options.isConnected==true)
      {

        this.load();
      }

    return true;
  }
  
    render()
    {
     
        
        return(
        
        <View >
          {
            this.state.selections.length==0?null:
            <View style={{ position:'absolute',top:-15,right:-15 }}>
          <Fab
            active={this.state.fabActive}
            direction="left"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="topRight"
            onPress={() => this.setState({ fabActive: !this.state.fabActive })}>
            <Icon name="share" />
           {
             !this.state.fabActive?null:
             <Button style={{ backgroundColor: '#34A34F' }} 
             
             onPress={()=>{

              let msg="";
              
              for (let value of this.state.selections) {
                msg+=value.firstName+" "+value.lastName +" تلفن:"+value.tel +"  \n\n"
              }
              const shareOptions = {
                title: 'اشتراک در',
                message: msg,
                // url: 'some share url',
                
                //social: Share.Social.WHATSAPP,
              //  whatsAppNumber: "9199999999"  // country code + phone number(currently only works on Android)
            };
            Share.open(shareOptions);
              
             }}
             >
             <Icon name="logo-whatsapp" />
           </Button>
           }
           {
             !this.state.fabActive?null:
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
           }
           {
             !this.state.fabActive?null:
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
           }
          </Fab>
        </View>

          }
        
        <View style={{marginTop:20}}>
               


            <Text style={{margin:5,padding:10,fontSize:22,width:'70%',borderBottomColor:'red',borderBottomWidth:2}}> برترین ها </Text>
            <ScrollView horizontal={true}>
            {
              this.state.persons.map((value,index)=>{

                let bgcolor="white";
                if(this.state.selections.length!=0)
                {
                  let i=this.state.selections.findIndex(p=>p.id==value.id);
                  if(i!=-1)
                  {
                    bgcolor="aliceblue";
                  }
                }
                return(
                  
                  <TouchableWithoutFeedback  style={{height:180}}
                  
                  onLongPress={()=>{
                    
                    this.setState( {selections:[...this.state.selections,value]});
                  }}
                  
                  
                  onPress={()=>{
                    if(this.state.selections.length!=0)
                    {
                      let i=this.state.selections.findIndex(p=>p.id==value.id);
                      if(i!=-1)
                      {
                        this.state.selections.splice(i,1);
                        this.forceUpdate();
                      }
                      else
                      {
                        this.setState( {selections:[...this.state.selections,value]});
                      }
                    }
                  }}
                  >
                        <View style={{flex:1, padding:5,alignItems:'center',alignContent:'center',margin:5,width:140,backgroundColor:bgcolor}}>
                        <Thumbnail large source={{uri:value.pic}}/>
                        <Text note>{value.lastName}</Text>
                        <View style={{flexDirection:'row'}}>
                          <View style={{flex:1}}>
                            <Button  success style={{margin:5}} onPress={()=>{Communications.phonecall(value.tel,true)}}>
                              <Icon name="phone" type="FontAwesome5" />
                            </Button>
                          </View>
                          <View style={{flex:1}}>
                          <Button  danger style={{margin:5}} onPress={()=>{this.props.navigation.navigate('MapHomeTab',{lat:value.lat,lng:value.lng})}}>
                              <Icon name="map" type="FontAwesome5" />
                            </Button>
                          </View>
                        </View>
                      </View>
                      </TouchableWithoutFeedback>

)
})
}
            </ScrollView>
</View>


      <IndicatorViewPager
          style={{ height: 280}}
          indicator={this._renderDotIndicator()}>
         
         {
             this.state.persons==null?null: this.state.persons.map((value,index)=>{
                 return (
                     <View style={{flex:1,backgroundColor:'white'}}>
                          <Image source={{uri:value.pic}} style={{flex:1,resizeMode:'stretch'}}/>
                     </View>
                
               )
             })
         }
          
        </IndicatorViewPager>


        </View>)
    }


    _renderDotIndicator() {
      return <PagerDotIndicator pageCount={this.state.persons.length} />;
     }

}