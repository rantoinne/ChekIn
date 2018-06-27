import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class Hamburger extends Component {

	toggledrawer() {
		this.props.navgationprops.toggleDrawer();
	}

	render() {
		return(
			<View>
				<TouchableOpacity onPress= {() => this.toggledrawer()}>
					 <Image
			            source= {require('./hamburger.png')}
			            style={{ width: 25, height: 25, marginLeft: 5}}
			          />
				</TouchableOpacity>
			</View>
		);
	}
}

export default Hamburger;