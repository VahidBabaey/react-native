
import React,{Component} from 'react' 
import {View} from 'react-native'
import { Container, Content, Footer, Button,Text } from 'native-base';
import MapManager from '../shared/MapManager';



export default class SelectPersonLocation extends React.Component
{
    state={
        selectedLat:0,
        selectedLng:0
    }
    render()
    {
        return(<Container>
            <Content>
                <MapManager selectLocation={(lat,lng)=>{
                    this.state.selectedLat=lat;
                    this.state.selectedLng=lng;
                }}/>
            </Content>
            <Footer>
                <View>
                    <Button large onPress={()=>{
                       this.props.screenProps.personService.setLocation(this.state.selectedLat,this.state.selectedLng);
                       this.props.navigation.goBack();
                         
                        }}>
                        <Text>تایید انتخاب محل</Text>
                    </Button>
                </View>
            </Footer>
        </Container>)
    }
}