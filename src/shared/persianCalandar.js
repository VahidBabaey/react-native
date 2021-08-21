import  React,{Component} from 'react'
import {Modal} from 'react-native'
import {Body,Header,Container,Content, Label, Item, Title} from 'native-base'
import { Calendar} from 'react-native-general-calendars';

export default class PersianCalander extends React.Component
{

    state={
        ModalVisibile:false,
        selectDate:''
    };
ShowCalendar()
{
    this.setState({
        ModalVisibile:true
       
    });
}

render(){
  


    return (

     <Item  style={{padding:4}}>
      <Label  style={{flex:1,padding:10}} onPress={()=>{
         this.ShowCalendar(); }}>
             {this.props.title} : {this.state.selectDate==''?this.props.selectDate:this.state.selectDate}
         </Label>
            <Modal animationType="slide" animated  onRequestClose={()=>{
                this.setState({
                    ModalVisibile:false });  }}
            visible={this.state.ModalVisibile}  transparent={true} >
            <Container style={{padding:10}}>
                <Header >
                    <Body>
                        <Title style={{textAlign:'center'}}>{this.props.title} را انتخاب نمایید</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Calendar type="jalaali"  onDayPress={(day,localday)=>{
                     
                       if(this.props.getDate!=null)
                          this.props.getDate(localday.dateString);
                        
                        this.setState({
                            selectDate:localday.dateString,ModalVisibile:false
                        });
                      
                     
                    }}/>
                </Content>
            </Container>
           </Modal>
      </Item>
        
    );}
};
