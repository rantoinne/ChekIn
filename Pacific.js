import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Accountant from './Accountant';
import Spinner from 'react-native-spinkit';


export default class Pacific extends Component {

	static navigationOptions = {
        title: 'ChekIn',
        headerTitleStyle :{ textAlign: 'center', alignSelf:'center', color: 'white'},
        headerStyle:{
            backgroundColor:'#fa8231',
        },
    };
	
	
constructor(props) {
    super(props);
  this.skip=0
    this.state={ 
    	accountants: [],
    	activityVisible: true,
	};
    this.getData(this.skip)
  };	


  isCloseToBottom ({layoutMeasurement, contentOffset, contentSize}) {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

  getData(skip){
    const request = {"data":{"skip":skip,"sort":{"cat":"Recommended","order":"desc"}}}
    this.skip=this.skip + 1
    if ("service" in this.props.navigation.state.params) {
      request["data"]["searchVal"]=this.props.navigation.state.params.service
    }
    if ("location" in this.props.navigation.state.params) {
      request["data"]["zipcode"]=this.props.navigation.state.params.location
    }
    
    fetch('http://52.56.255.53/api/accountants', {
  method: 'POST',
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(request),
}).then((response) => response.json())
    .then((responseJson) => {
      let temp = this.state.accountants
      for (x=0 ; x<responseJson.data.length ; x++)
      {temp.push(responseJson.data[x])}
       this.setState({ accountants: temp,
       				   activityVisible: false });
       
    });
  }

	render() {
	  return (
				<View style={styles.container}>
				{
					this.state.activityVisible ? 
					<Spinner style= {styles.activity} size = {100} color = {'#f58220'} type = {'Circle'} /> : 
             	(	<ScrollView onScroll={({nativeEvent}) => {
      				if (this.isCloseToBottom(nativeEvent)) {
        			this.getData(this.skip);
      			}
    		}}
    				scrollEventThrottle={400}>
		       		{ this.state.accountants.map(accountant => {
		        	return <Accountant name={accountant.company_name} 
		        	address = {accountant.address} key={accountant.name} services={accountant.services}
		        	rating = {accountant.rating} contact={accountant.contact_no} email={accountant.email_id} aid = {accountant.id} navigate={this.props.navigation} />
		    })}
  					</ScrollView> ) 
  		}
  			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activity: {
  	alignSelf: 'center'
  }
});