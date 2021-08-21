import React,{Component} from 'react' 
import {Button, Icon,Text, Form, Item, Input, Label, Thumbnail} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage/lib/index'
import {Loading} from '../shared/common'
import {View} from 'react-native'


export default  class Login extends Component {

    constructor(props){
      super(props);
     
      this.state={
       userName:'',
       password:'',
      isLoding:true
        };
 

    }

 



   async componentDidMount()
    {
      await this.CheckLogin();
    }

    async CheckLogin()
    {
      let userName=await AsyncStorage.getItem("userName");
      let password=await AsyncStorage.getItem("password");
      if(userName!=null && password!=null)
      {
        try
        {
         await this.props.accountService.login(userName,password);
        
        }
        catch(err)
        {
        this.setState({isLoding:false});

        }
      }
      else
      {
        this.setState({isLoding:false});
      }

    }


     render()
    {
   
  if(this.state.isLoding)
  return Loading();
     
     return     (
        <View style={{alignContent:'center',padding:60}}>

        <View style={{alignItems:'center'}}>
        <Thumbnail
          source={require('../asset/sidebar.jpeg')} style={{ width: 200, height: 200 }}/>
        </View>
        <Form style={{marginTop:20}}>
            <Item >
            <Label>کلمه کاربری</Label>
            <Input value={this.state.userName} onChangeText={(text)=>{this.setState({userName:text})}}/> 
            </Item>
            <Item   >
            <Label>رمز عبور</Label>
            <Input secureTextEntry={true} value={this.state.password} onChangeText={(text)=>{this.setState({password:text})}}/> 
            </Item>
       </Form>
       <Button  full  style={{marginTop:20}}   onPress={async ()=>{ 
        try
        {
         await this.props.accountService.login(this.state.userName,this.state.password);
         AsyncStorage.setItem("userName",this.state.userName);
         AsyncStorage.setItem("password",this.state.password);

        }
        catch(err)
        {
          alert(err);
        }
       }}>
        <Text style={{fontSize:19}}>ورود</Text>
        <Icon name="key" type="FontAwesome5"/>
      </Button>
      <Button full  style={{marginTop:10}}  danger >
        
        <Text style={{fontSize:19}}>خروج</Text>
        <Icon name="power-off" type="FontAwesome5"/>
      </Button>
       </View> )
    }
  }