import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Hamburger from './Hamburger';

export default class Navig extends Component {

	static navigationOptions = {
        title: 'ChekIn',
        headerTitleStyle :{ textAlign: 'center', alignSelf:'center', color: 'white'},
        headerStyle:{
            backgroundColor:'#fa8231',
        },
        headerLeft: <Hamburger />
    };

    constructor(props){
    	super(props);
    	this.state= {
    		services: 'Accountant',
    		location: 'London',
    	};
    }

  render() {
    return (
      <ScrollView style={styles.container}>
       <View>
       <Image source={require('./logo.png')} style = {styles.logo}/>
       </View>
       <Text style = {styles.tagLine}>Find An Accountant in UK</Text>
	   <View style={styles.outerCont}>
      
      <View style={styles.textInputCont}>
      <TextInput style={styles.textInputS} underlineColorAndroid='transparent' placeholder="Enter Serivce"  onChangeText={(service) => this.setState({service : service})}/>
      </View>
      <View style={styles.textInputCont}>
      <TextInput style={styles.textInputS} underlineColorAndroid='transparent' placeholder="Enter Location" onChangeText={(location) => this.setState({location:location})}/>
      </View>
      <View style={styles.searchButton}>
      <Button title="Search" 
       color="#f58220"  onPress = {()=> {this.props.navigation.navigate('Pacific',{service : this.state.service  , location: this.state.location})}}
       style = {styles.button} />
      </View>
      </View>
       
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo : {
    width: 200,
    height : 200,
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'center'
  },
  tagLine : {
    fontWeight:  '900' ,
    textAlign: 'center' ,
    fontSize: 20 , 
  },

  button: {
  	padding: 20,
  },

  containertemp: {
    backgroundColor: 'white',
    padding: 7
  },
  outerCont : {
    marginTop: 20
  },
  textInputCont : {
    marginTop: 8
  }
  ,
  textInputS: { 
    borderColor: '#aaa',
    borderWidth: 1,
    width: '90%',
    marginLeft: '5%',
    textAlign:  'center' ,
    height: 40,
    backgroundColor: '#fff'
  },
  searchButton : {
    width: '60%',
    marginLeft: '20%',
    marginTop: 35,
  }
});

