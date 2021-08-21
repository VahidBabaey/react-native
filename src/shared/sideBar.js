

import React, {Component} from 'react';

import {Image} from 'react-native'
import {Container,Content,ListItem,List,Left,Right,Icon,Text, Body} from 'native-base'


export default class SideBar extends React.Component
{

    render()
    {
      if(!this.props.screenProps.options.isConnected)
      return null;
        let {navigation} =this.props;
  
        return (
            <Container style={{height:500}}>
                <Content>
            
                <Image  source={ require('../asset/sidebar.jpeg') } style={{ width:'100%', height:200 }}  />
             
             <List style={{padding:0}}>
              <ListItem  onPress={()=>{ navigation.navigate('Home');this.props.navigation.closeDrawer(); }} >
                <Left >
                  <Icon name='home' />
                </Left>
                <Body>
                <Text >صفحه اصلی</Text>
                </Body>
                <Right >
                <Icon   name="arrow-back" />
                </Right>
             </ListItem>
        <ListItem   onPress={()=>{ navigation.navigate('Person');this.props.navigation.closeDrawer() }} >
          <Left >
          <Icon name='person' />
        
          </Left>
          <Body>
          <Text >مدیریت افراد</Text>
          </Body>
          <Right >
          <Icon   name="arrow-back" />
          </Right>
        </ListItem>
        <ListItem  onPress={()=>{ navigation.navigate('WorkGroup');this.props.navigation.closeDrawer(); }}>
          <Left>
            <Icon name='group' type="FontAwesome" color="blue"/>  
          </Left>
          <Body>
          <Text>گروه ها</Text>
          </Body>
          <Right>
            <Icon name="arrow-back" />
          </Right>
        </ListItem>
      
      </List>
                </Content>
            </Container>
        )
    }
}