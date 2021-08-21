import React,{Component} from 'react' 
import {View,Text,Image,TouchableOpacity} from 'react-native'


export class MyButton extends Component
{
    render()
    {
        let bgColor='white';
        if(this.props.info)
        {
            bgColor="#459cee";
        }
        if(this.props.success)
        {
            bgColor="#2fc726";
        }
        if(this.props.danger)
        {
            bgColor="#f73f5d";
        }
        return (<TouchableOpacity onPress={this.props.onClick}>
        <Text style={{margin:10,fontSize:20,textAlign:'center',padding:10,  backgroundColor:bgColor}}>
            {this.props.caption}
        </Text>
    </TouchableOpacity>)
    }
}



export class RemoveButton extends Component
{
    render()
    {
        
        return (<TouchableOpacity onPress={this.props.onClick}>
            <Image source={require('../asset/remove.png')} style={{...this.props.style}}/>
                </TouchableOpacity>)
    }
}

