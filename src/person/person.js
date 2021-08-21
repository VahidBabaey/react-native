
import React,{Component} from 'react' 
import {View,TextInput,Modal,Keyboard} from 'react-native'

import {successMessage,confirmMessage,Loading} from '../shared/common'
import Camera from '../shared/camera'

import {Text,CheckBox, Button, Icon, Container, Header, Content, Picker, Left, Body, Right, Title, Subtitle, FooterTab, Form, Item, Label,Input,List, ListItem, Thumbnail} from 'native-base'
import PersianCalander from '../shared/persianCalandar'

export  class PersonList extends Component {
 

  personService=null;
  constructor(props)
  {

    super(props);
    this.personService=this.props.screenProps.personService;
    this.state={
      isLoading:false,
      Persons:[]
    }

    this.props.navigation.addListener("willFocus",()=>{
      
      this.load();
      
      });
 
 
  }


 async load()
  {
    this.setState({isLoading:true});
   await this.personService.getList();
    this.setState({Persons:this.personService.list,isLoading:false});
  }


  render()
  {
   if(this.state.isLoading)
   {
     return Loading();
   }
    return (
        <Container>
          
            <Content padder>
          <List>
            {
              this.state.Persons.map(
                (value,index)=>{
                  return (<ListItem key={index} >
                   <Left>
                   <Thumbnail  source={{uri:value.pic}}/>
                   
                   </Left>
                   <Body>
                    <Text  >{value.firstName+' '+value.lastName}</Text>
                    <Text note>{' تلفن: '+value.tel}</Text>
                   </Body>
                   <Right >
                      <Button danger rounded onPress={async()=>{await this.personService.remove(value.id);this.load()}} >
                          <Icon name="remove" />
                        </Button>
                   </Right>
                  </ListItem>)

                }

              )
            }
            </List>

            </Content>
           
        </Container>
    
    )
  }
}


export  class PersonRegister extends Component {
 

  personService=null;
  workGroupService=null;
  constructor(props)
  {
    super(props);
    this.personService=this.props.screenProps.personService;
    this.workGroupService=this.props.screenProps.workGroupService;

    this.state={
      isLoading:false,
      firstName:'',
      lastName:'',
      tel:'',
      picture:null,
      groups:[],
      workGroupId:'',
      showInHomePage:false,
      showInGallery:false,
      createDate:''
       };

       this.props.navigation.addListener("willFocus",()=>{
      
        this.load();
        
        });
  }

   async load()
  {
    this.setState({isLoading:true});
   await this.workGroupService.getList();
    this.setState({groups:this.workGroupService.list,isLoading:false});

  }
  
  
    render()
    {
    
      return (
          <Container>
             
              <Content padder>
               
               
               <Form style={{margin:10}}>
                 <Item success={this.state.firstName!=""} error={this.state.firstName==""} floatingLabel>
                    <Label>نام</Label>
                    <Input value={this.state.firstName} onChangeText={(text)=>{this.setState({firstName:text})}} />
                 </Item>
                 <Item error={this.state.lastName==""} success={this.state.lastName!=""} floatingLabel>
                    <Label>نام خانوادگی</Label>
                    <Input value={this.state.lastName} onChangeText={(text)=>{this.setState({lastName:text})}} />
                 </Item>
                 <Item success={this.state.tel!=""} error={this.state.tel==""} floatingLabel>
                    <Label>تلفن</Label>
                    <Input value={this.state.tel} keyboardType='phone-pad' onChangeText={(text)=>{this.setState({tel:text})}} />
                 </Item>
                 <PersianCalander selectDate="1398-06-05" title='تاریخ ایجاد' getDate={(date)=>{this.setState({createDate:date})}}/>
                 <Item style={{padding:5,margin:5}}>
                  <CheckBox style={{margin:10}} checked={this.state.showInHomePage} onPress={()=>{this.setState({showInHomePage:!this.state.showInHomePage})}}/>
                  <Label>نمایش در صفحه اصلی</Label>
                 </Item>

                 <Item  style={{padding:5,margin:5}}>
                  <CheckBox style={{margin:10}} checked={this.state.showInGallery} onPress={()=>{this.setState({showInGallery:!this.state.showInGallery})}}/>
                  <Label>نمایش در گالری</Label>
                 </Item>
                 <Item>
                 <Picker
                   placeholder="گروه را انتخاب نمایید"
                    note
                    mode="dropdown"
                    style={{ width: 120 }} 
                    
                    onValueChange={(id)=>{this.setState({workGroupId:id})}}

                    selectedValue={this.state.groupId}>
                      
                   {
                     this.state.groups.map((value,index)=>{

                      return ( <Picker.Item label={value.groupName+' کد '+value.groupCode} value={value.id}/>)
                     })
                   }

                   </Picker>
                 </Item>
               </Form>
               <View style={{margin:10}}>
                 <Button danger onPress={()=>{this.props.navigation.navigate('PersonLocation');}}>
                   <Icon name="map" />
                   <Text>انتخاب محل</Text>
                   {
                     this.personService.model.lat==0?null:
                     <Text>{  this.personService.model.lat+' '+  this.personService.model.lng}</Text>
                   }
                 </Button>
               </View>
               <Camera getPic={(value)=>{ this.setState({picture:value})}}/>
               
  
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1,padding:2}}>
                <Button block success onPress={()=>{

                  this.personService.model.firstName=this.state.firstName;
                  this.personService.model.lastName=this.state.lastName;
                  this.personService.model.tel=this.state.tel;
                  this.personService.model.pic=this.state.picture.data;
                  this.personService.model.workGroupId=this.state.workGroupId;
                  this.personService.model.showInHomePage=this.state.showInHomePage;
                  this.personService.model.showInGallery=this.state.showInGallery;
                  this.personService.model.createDate=this.state.createDate;

                //  for (let key in this.personService.model) {
                //   this.personService.model[key]=this.state[key];
                //  }

                  this.personService.register();
                  successMessage();
                  this.props.navigation.navigate("PersonListTab")
                }}>
                   <Icon name="check" type="FontAwesome"/>
                   <Text>ثبت</Text>
                 </Button>
                
                </View>
                
              </View>
               
          
  

  
              </Content>
            
          </Container>
      
      )
    }
  }
  
  
export  class PersonTabs extends Component {
 
  render()
  {
    let index=this.props.navigationState.index;
      return  (
      <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Button  full danger={index==0} vertical onPress={()=>{this.props.navigation.navigate("PersonListTab")}}>
              <Icon name="person" />
              <Text>لیست افراد</Text>
            </Button>
            </View>
            <View style={{flex:1}}>
            <Button full vertical danger={index==1} onPress={()=>{this.props.navigation.navigate("PersonRegisterTab")}}>
              <Icon name="add" />
              <Text>ثبت جدید</Text>
            </Button>
           </View>
           
          
    </View>
      )
  }

}