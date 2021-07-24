import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default class Card extends React.Component {

	render() {
		const {item, isOpen, name} = this.props

		let cardName = '?';
		if(isOpen){
			cardName = name;
		}
		
		return (
				<TouchableHighlight 
                    onPress={() => {
						this.props.onCardTap(item)
					}} 
                    underlayColor={"#f1f1f1"} 
                    style={[styles.card, { backgroundColor: isOpen ? '#ffffff' : '#F7CCEF' }]}>
                    <Text styles={styles.cardTextStyle}>
                        {cardName}
                    </Text>
				</TouchableHighlight>		
		);
	}
}


const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center',
        justifyContent: 'center',
		height: 80,
		width: 40
	},
	cardTextStyle: {
		fontSize: 50,
		fontWeight: 'bold'
	}
});