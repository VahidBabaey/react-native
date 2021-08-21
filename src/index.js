
import React,{Component} from 'react' 

import {MainHome,MapHome,GalleryHome,HomeTabs} from './home/home'

import {PersonList,PersonRegister,PersonTabs} from './person/person'
import {WorkGroupList,WorkGroupRegister,WorkGroupTabs} from './workGroup/workGroup'

import {createAppContainer,createStackNavigator,createDrawerNavigator,createMaterialTopTabNavigator} from 'react-navigation'
import SideBar from './shared/sideBar'
import AppHeader from './shared/AppHeader'
import SelectPersonLocation from './person/selectPersonMap'
import {Text} from 'react-native'

const PersonPagesTab=createMaterialTopTabNavigator({
    PersonListTab:{screen:PersonList},
    PersonRegisterTab:{screen:PersonRegister}
},
{
 initialRouteName:'PersonRegisterTab',
    tabBarComponent:PersonTabs
}
)
const WorkGroupPagesTab=createMaterialTopTabNavigator({
    WorkGroupListTab:{screen:WorkGroupList},
    WorkGroupRegisterTab:{screen:WorkGroupRegister}
},
{
    tabBarComponent:WorkGroupTabs
}
)


const HomePagesTab=createMaterialTopTabNavigator({
    MainHomeTab:{screen:MainHome},
    MapHomeTab:{screen:MapHome},
    GalleryHomeTab:{screen:GalleryHome}
},
{
    
    tabBarComponent:HomeTabs,
    tabBarPosition:'bottom'
}
)

const MainStack=createStackNavigator(
   {
        Home:{screen:HomePagesTab},
        Person:{screen:PersonPagesTab},
        WorkGroup:{screen:WorkGroupPagesTab},
        PersonLocation:{screen:SelectPersonLocation}
    },
    {
      
        defaultNavigationOptions:(options)=>{  


        return {  header:!options.screenProps.options.isConnected?
        <Text style={{fontSize:20,backgroundColor:'red',color:'white'}}>اتصال برقرار نیست</Text>:
            
            <AppHeader navigation={ options.navigation} accountService={options.screenProps.accountService}/>}
        }
    }
)


const UserStack=createStackNavigator(
    {
         Home:{screen:HomePagesTab},
         
     },
     {
       
         defaultNavigationOptions:(options)=>{  
 
 
         return {  header:!options.screenProps.options.isConnected?
         <Text style={{fontSize:20,backgroundColor:'red',color:'white'}}>اتصال برقرار نیست</Text>:
             
             <AppHeader navigation={ options.navigation} accountService={options.screenProps.accountService}/>}
         }
     }
 )

const MainDrawer=createDrawerNavigator({
   stack1:{screen:MainStack}
},{
    drawerPosition:'right',
   contentComponent:SideBar
})

const MainApp=createAppContainer(MainDrawer)
const UserApp=createAppContainer(UserStack);
export {UserApp, MainApp}