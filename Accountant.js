import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';

class Accountant extends Component<Props> {
  constructor(props) {
    super(props);
  this.rating=[1,2,3,4,5];
  this.state={showContact:false};
    
  };
  renderContact(){
    if (this.state.showContact){
      this.setState({showContact:false})
    }
    else{
      this.setState({showContact:true})
    }
    

  }
  render() {
  const services = this.props.services
  const viewMore = <View><Text style={styles.ServicesMore}>{services.length - 5} more.. </Text></View>
  const contact = <View style={styles.contactCont}><Text style={styles.accountantContact}>Contact Number : {this.props.contact}</Text><Text style={styles.accountantContact}>Email Address : {this.props.email}</Text></View>
  const placeholder = <View><Text></Text></View>
  
    return (
      <View style={styles.container}>
        <Text style={styles.accountantName}>{this.props.name}</Text>
        <Text style={styles.accountantAddress}> 
        {this.rating.map(service => {
          return service > this.props.rating ? <Entypo key={service}  name='star' size={18} color =  'black'/> :  <Entypo key={service}  name='star' size={18} color =  'gold'/>        
          })}    
        </Text>
       <View style={styles.accountantCont}> 
       <Text style={styles.accountantAddress}> <Entypo  name='location-pin' size={16} color =  '#4CAF50'/>{this.props.address}</Text></View>
        <Text style={styles.ServicesHeader} >Services</Text>



        
        {this.props.services.slice(0,5).map(service => {
       return <Text style={styles.accountantAddress} key={service}> {service}</Text>
      })}
      
      

      {services.length > 5 ? viewMore :  placeholder}
       <View style={styles.accountantCont}> 
       <TouchableOpacity
         style={styles.button}
         onPress={()=>{this.props.navigate.navigate('Profile', { aid: this.props.aid, contact: this.props.email })}}>
         <Text style={{color: '#f58220' , 'textAlign':  'center' }}> View Profile </Text>
       </TouchableOpacity>
        <TouchableOpacity
         style={styles.button}
         onPress={() => {this.renderContact()}}>
         <Text style={{color: '#f58220' , 'textAlign':  'center' }}> Contact Details </Text>
       </TouchableOpacity>

       {this.state.showContact ? contact : placeholder}
      
       </View>



      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#aaa',
    padding: 10,
    borderWidth: 1,
    width: '95%',
    marginLeft: '2.5%',

  },
  contactCont : {
    borderColor : '#eee',
    borderWidth : 1,
    padding : 10
  },
  accountantContact :{
    fontWeight : 'bold' 
  },
  accountantName : {
    fontWeight:  '900' ,
    fontSize: 18,
    textAlign : 'center'
  },
  
  accountantAddress : {
    textAlign:  'center',
},
button : {
  borderColor: '#ccc',
  borderWidth: 0.5,
  backgroundColor: '#eee',
  padding: 10
},
accountantCont : {
  marginTop: 8,
},
ServicesHeader : {
  fontWeight:  '900' ,
  fontSize: 16,
  textAlign:  'center'
},
ServicesMore : {
  fontWeight:  '900' ,
  fontSize: 16,
  textAlign:  'center',
  color : '#f58220'
}
});

export default Accountant;