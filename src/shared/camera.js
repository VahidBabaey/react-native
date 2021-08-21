
import React,{Component} from 'react' 
import {Text, Button, Icon, Container, Header, Content, Footer, Left, Body, Right, Title, Subtitle, FooterTab, Form, Item, Label,Input,List, ListItem, Thumbnail} from 'native-base'

import {View} from 'react-native'
import ImagePicker from 'react-native-image-picker'


export default class Camera extends React.Component
{
    state={
        pic:null
    }

    chooseFile = () => {

        let options = {
          title: 'انتخاب تصویر',
          takePhotoButtonTitle: "گرفتن عکس",
          chooseFromLibraryButtonTitle:"اننتخاب عکس از گالری",
          cancelButtonTitle:"انصراف",
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        
        };


        ImagePicker.showImagePicker(options, 
            
            (response) => {
         
     
          if (response.didCancel) {
            
          }
           else if (response.error) {
            
          }
           else {
               
            this.props.getPic(response);
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              pic: response
            });
            
          }
        });
      };

    

    render()
    {
        return (<View style={{margin:5,padding:5,flexDirection:'row'}}>

            <View style={{flex:1}}>
                <Button danger onPress={this.chooseFile}>
                    <Icon name="eye" />
                </Button>
            </View>
            <View style={{flex:1}}>
                {
                    this.state.pic==null?<Text>بدون عکس</Text>:
                     <Thumbnail large source={{uri:this.state.pic.uri}} />
                }
            </View>
        </View>)
    }
}