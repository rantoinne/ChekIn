import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

type Props = {};
class Profile extends Component<Props> {

  static navigationOptions = {
        title: 'Profile',
        headerTitleStyle :{ textAlign: 'center', alignSelf:'center', color: 'white'},
        headerStyle:{
            backgroundColor:'#fa8231',
        },
    };

  constructor(props){
    super(props);
    this.state={}
    this.rating=[1,2,3,4,5];
    fetch('http://52.56.255.53/api/profile', {
  method: 'POST',
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({aid : this.props.navigation.state.params.aid}),
}).then((response) => response.json())
    .then((responseJson) => {
      this.setState(responseJson);
    });
  }
   render () {
    const contact = this.props.navigation.state.params.contact
   
    return(   
     <View style={styles.container}>
 
    { "company_name"  in this.state ? ( 
    <ScrollView>
    <Image source={require('./default.png')} style = {styles.logo}/>
    <Text style={styles.CompanyName}>{this.state.company_name}</Text>
    <Text style={styles.accountantAddress}> 
        {this.rating.map(rating => {
          return rating > this.state.reviewStat.avgTotal ? <Entypo key={rating}  name='star' size={18} color =  'black'/> :  <Entypo key={rating}  name='star' size={18} color =  'gold'/>        
          })}    
        </Text>

        <Text style={styles.accountantAddress}> 
        {this.state.address1} {this.state.address2} , {this.state.county} , {this.state.town} - {this.state.post_code}
        </Text>
        <TouchableOpacity
         onPress={()=>{if(this.state.showContact){this.setState({showContact : false})} else {this.setState({showContact : true})}}}>
         {this.state.showContact ? (<Text style={styles.showCont} > Hide Contact </Text>) : (<Text style={styles.showCont} > Show Contact </Text>)} 
         </TouchableOpacity>
            
         { this.state.showContact ?  
        (<View><Text style={styles.accountantAddress}><Entypo  name='old-phone' size={16} color =  'black' />  - {this.state.contact_no}</Text>
        <Text style={styles.accountantAddress}><Entypo  name='mail' size={16} color =  'black' />  - {contact}</Text></View>) : (null)
        }


         <Text style={styles.CompanyService}>Services</Text>
         {(!this.state.showLessService) ?
        (
        this.state.CompanyService.slice(0,5).map(service => {
       return <Text style={styles.serviceList} key={service}> {service}</Text>
      })) : (
        this.state.CompanyService.map(service => {
          return <Text style={styles.serviceList} key={service}> {service}</Text>
         }) 
      )}


      {this.state.CompanyService.length > 5 ? (
        <TouchableOpacity
        onPress={()=>{if(this.state.showLessService){this.setState({showLessService : false})} else {this.setState({showLessService : true})}}}>
      <Text style={styles.ServicesMore} >
        
        {this.state.showLessService ? ("Show Less Services") : (  "Show More Services") }

      </Text></TouchableOpacity>
      ) :  null}




      {/* Stay Away From Above Code */}
  <Text style={{marginTop : 20 , marginBottom : 5 ,fontSize : 20 , fontWeight : 'bold', alignSelf: 'center' }}> Client Reviews </Text>
  {this.state.review.map(rev => {
    return  <View style={styles.reviews} key={rev.useremail}>
  <Text>

{this.rating.map(rating => {
          return rating > rev.rating ? <Entypo key={rating}  name='star' size={18} color =  'black'/> :  <Entypo key={rating}  name='star' size={18} color =  'gold'/>        
          })}
          </Text>

          <Text style={{fontWeight : 'bold' , marginTop : 10}}> {rev.title} </Text>
          <Text style={{ marginTop : 10}}> {rev.reviewText} </Text>
      </View>
    })} 


        
    </ScrollView>) :( <Text style={{marginTop : 20 ,textAlign : 'center'}}><Entypo  name='circular-graph' size={25} color =  'gray' /></Text>)
}

    </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    CompanyName : {
      fontSize : 20 , 
      fontWeight : 'bold',
      textAlign : 'center'
    },
    logo : {
        width: 200,
        height : 200,
        marginTop: 30,
        alignSelf: 'center'
      },
      accountantAddress : {
        textAlign:  'center',
        marginTop : 8
    },
    CompanyService :{
      fontSize : 20 , 
      fontWeight : 'bold',
      textAlign : 'center',
      marginTop : 20
    },
    serviceList : {
      textAlign : 'center'
    },
    showCont : {
      textAlign:  'center',
      marginTop : 8,
      fontWeight : 'bold' ,
      color : '#4183c4',
      fontSize : 16
    },
ServicesMore : {
  fontWeight:  '900' ,
  fontSize: 16,
  textAlign:  'center',
  color : '#f58220'
},
reviews : {
  marginTop : 20 ,
  padding :15 ,
  borderTopWidth : 1 ,
  borderBottomWidth : 1,
  borderColor : "#eee",
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}
  });
  
  export default Profile;