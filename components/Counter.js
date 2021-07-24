import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Counter extends React.Component {
	
	render() {
		const { score, attempts } = this.props
		return (
			<View style={styles.score_container}>
				<Text style={styles.score}>{`Score: ${score}`}</Text>
				<Text style={styles.score}>{`Attempts: ${attempts}`}</Text>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	score_container: {
		flex: 1,
		alignItems: 'center'
	},
	score: {
		fontSize: 30,
		fontWeight: '100'
	}
});