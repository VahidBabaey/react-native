import React,{Component} from 'react' 
import {Text, Button, Icon, Container, Header, Content, Footer, Left, Body, Right, Title, Subtitle, FooterTab, Form, Item, Label,Input,List, ListItem} from 'native-base'

const titles={
    Home:"صفحه اصلی",
    Person:"مدیریت افراد"
}

export default  class AppHeader extends Component {
 

    render()
    {

       
       let key=this.props.navigation.state.routeName;
        return  (
            <Header>
              <Left>
                {
                  !this.props.accountService.isAdmin?null:
                  <Button transparent onPress={()=>{this.props.navigation.openDrawer()}}>
                  <Icon name='menu' />
                </Button>
                }
             
            </Left>
            <Body>
              <Title>{ titles[key]}</Title>
            </Body>
            <Right>
              
            {
                key=="Home"?
                <Button transparent onPress={()=>{ this.props.accountService.logOut();}}>
                <Icon name='power-off' type="FontAwesome"/>
               </Button>
                :
                <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                <Icon name='arrow-back' />
              </Button>
            }
             
              
            </Right>
              </Header>
        )
    }

}
