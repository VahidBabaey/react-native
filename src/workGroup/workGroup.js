
import React,{Component} from 'react' 
import {View,TextInput,Modal,Keyboard,FlatList,RefreshControl} from 'react-native'

import {styles} from '../styleSheet/styles'
import {MyButton,RemoveButton} from '../shared/Buttons'
import {successMessage,confirmMessage,Loading} from '../shared/common'
import Camera from '../shared/camera'

import {Text, Button, Icon, Container, Header, Content, Footer, Left, Body, Right, Title, Subtitle, FooterTab, Form, Item, Label,Input,List, ListItem, Thumbnail} from 'native-base'

export  class WorkGroupList extends Component {
 

  workGroupService=null;
  constructor(props)
  {

    super(props);
    this.workGroupService=this.props.screenProps.workGroupService;
    this.state={
      isLoading:false,
      groups:[]
    }

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
   if(this.state.isLoading)
   {
     return Loading();
   }
    return (
      <View style={{flex:1,justifyContent:'center',marginTop:10}}>
      <FlatList style={{flex:1}}
      
      data={this.state.groups}
      ListEmptyComponent={(<Text style={{fontSize:20,padding:10,textAlign:'center',borderBottomColor:'red',borderBottomWidth:1}}>لیست خالی است</Text>)}
   
      enableEmptySections={true}
      keyExtractor={(item,index)=>index}
      
      renderItem={({item}) => (
        <ListItem >
          <Left>
          <Button danger  onPress={async ()=>{
                try
                {
                await this.workGroupService.remove(item.id);  
                  
                this.load(); 
                }
                catch(err)
                {
                  alert(err);
                }
                  
                  }}>
                    <Icon name='remove'/>
                </Button>
                <Button primary onPress={()=>{this.props.navigation.navigate('WorkGroupRegisterTab',{workGroupId:item.id})}}>
                <Icon name='edit' type="FontAwesome5"/>
                </Button>
          </Left>
            <Body>
             <Text >{item.groupName}</Text>
             <Text note>{"کد:"+ item.groupCode}</Text>
            </Body>
            <Right>
               
            </Right></ListItem>
      )}

      refreshControl={
        <RefreshControl  refreshing={this.state.isLoading}  onRefresh={()=>{this.load()}} />  }  />
     </View>
    
    )
  }
}


export  class WorkGroupRegister extends Component {
 

  workGroupService=null;
  constructor(props)
  {
    super(props);
    this.workGroupService=this.props.screenProps.workGroupService;
    this.state={
     groupName:'',
     groupCode:''
       };

       this.props.navigation.addListener("willFocus",()=>{
      
        this.load();
        
        });
  }

  
 async load()
  {
    let id=this.props.navigation.getParam('workGroupId');
    if(id==null || id==0)
    {
      // Register
      this.workGroupService.model.id=0;
      this.setState({groupCode:'',groupName:''});
    }
    else
    {
      let model=await this.workGroupService.find(id);
      if(model!=null)
      {
        this.setState({groupName:model.groupName,groupCode:model.groupCode});
      }
    }
  }
  
    render()
    {
    
      return (
          <Container>
             
              <Content padder>

               <View style={{margin:20,backgroundColor:'white',padding:10}}>
               
               <Form style={{margin:20}}>
                 <Item success={this.state.groupName!=""} error={this.state.groupName==""} floatingLabel>
                    <Label>نام</Label>
                    <Input value={this.state.groupName} onChangeText={(text)=>{this.setState({groupName:text})}} />
                 </Item>
                 <Item error={this.state.groupCode==""} success={this.state.groupCode!=""} floatingLabel>
                    <Label>کد</Label>
                    <Input value={this.state.groupCode} keyboardType="number-pad" onChangeText={(text)=>{this.setState({groupCode:text})}} />
                 </Item>
                
                
               </Form>

              
  
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1,padding:2}}>
                <Button block success onPress={async ()=>{

                  this.workGroupService.model.groupName=this.state.groupName;
                  this.workGroupService.model.groupCode=this.state.groupCode;

                try
                {
                  await this.workGroupService.register();
                  successMessage();
                  this.setState({groupCode:'',groupName:''})
                  this.props.navigation.navigate("WorkGroupListTab");

                }
                catch(err)
                {
                  alert(err);
                }



                }}>
                   <Icon name="check" type="FontAwesome"/>
                   <Text>ثبت</Text>
                 </Button>
                
                </View>
                
              </View>
               </View>
          
  

  
              </Content>
            
          </Container>
      
      )
    }
  }
  
  
export  class WorkGroupTabs extends Component {
 
  render()
  {
    let index=this.props.navigationState.index;
      return  (
      <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Button  full danger={index==0} vertical onPress={()=>{this.props.navigation.navigate("WorkGroupListTab")}}>
              <Icon name="person" />
              <Text>لیست گروه ها</Text>
            </Button>
            </View>
            <View style={{flex:1}}>
            <Button full vertical danger={index==1} onPress={()=>{this.props.navigation.navigate("WorkGroupRegisterTab",{workGroupId:0})}}>
              <Icon name="add" />
              <Text>ثبت جدید</Text>
            </Button>
           </View>
           
          
    </View>
      )
  }

}