
import React,{Component} from 'react' 
import {I18nManager,YellowBox ,AppState} from 'react-native'
import {UserApp, MainApp} from './src/index'
import personClassService from './src/services/personService'
import workGroupClassService from './src/services/workGroupService'
import AccountService from './src/services/AccountService'

import NetInfo from '@react-native-community/netinfo'

import SplashScreen from './src/shared/splash'

import Login from './src/Account/login'
import AsyncStorage from '@react-native-community/async-storage/lib';

export default class App extends  React.Component
 {


  accountService;
constructor(props)
{
  super(props);
  YellowBox.ignoreWarnings(['ViewPagerAndroid','ListView','NetInfo']);
  if(!I18nManager.isRTL)
  {
    I18nManager.forceRTL(true)
  }
  this.accountService=new AccountService();


  this.accountService.successLogin=()=>{
    this.setState({isLogin:true});
  };

this.accountService.successLogOut=()=>{
  AsyncStorage.clear();
  this.setState({isLogin:false});

};
  this.state={
    isConnected:true,
    isSplash:true,
    isLogin:false
  }

  setTimeout(()=>{
    this.setState({isSplash:false});
  },1500);

  NetInfo.addEventListener((netState)=>{
   this.setState({isConnected:netState.isConnected});
  });

   

}
    render()
    {
      if(this.state.isSplash)
      return (<SplashScreen />)

      if(!this.state.isLogin)
       return (<Login accountService={this.accountService}/>);

       let screens={
        options:{isConnected:this.state.isConnected},accountService:this.accountService,
        personService:new personClassService(),workGroupService:new workGroupClassService()};

        if(!this.accountService.isAdmin)
        {
          return (<UserApp screenProps={screens}/>)

        }
      return (<MainApp screenProps={screens}/>)
    }
}


