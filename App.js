import React from 'react';
import { StyleSheet, View, FlatList, Alert, BackHandler } from 'react-native';
import Counter from './components/Counter';
import Card from './components/Card';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 0, // Number of matches made by user
      attempts: 0, // Number of attempts made by user
      selectedCards: [], // To store cards selected in an attempt 
      cards: [
        {
          name: 'A',
          open: false
        },
        {
          name: 'B',
          open: false
        },
        {
          name: 'C',
          open: false
        },
        {
          name: 'D',
          open: false
        },
        {
          name: 'E',
          open: false
        },
        {
          name: 'F',
          open: false
        },
        {
          name: 'G',
          open: false
        },
        {
          name: 'H',
          open: false
        },
      ]
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress",this.backAction)
    // Clone & add same cards A,B,C...H to existing cards array to make them 16 (2 of each)
    let clone = JSON.parse(JSON.stringify(this.state.cards))
    let totalCards = [...this.state.cards.concat(clone)]

    // Assign unique id to each card in the array
    totalCards.map(card => {
      let id = Math.random().toString(36).substring(7);
      card.id = id
      card.open = false
    })

    // Shuffle position of the cards randomly in the cards array
    this.shuffle(totalCards)
    this.setState({
      cards: totalCards
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress",this.backAction)
  }

  /**
   *  To handle back press action
   */
  backAction = () => {
    Alert.alert("Exit", "Are you sure you want to leave ?", [
      {
        text: "Cancel",
        onPress: () => null
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };


  /**
   *  Fisher-Yates shuffle used for shuffling the cards position randomly
   */
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   *  To handle when a card is tapped
   */
  cardTapped = (item) => {
    let score = this.state.score
    let attempts = this.state.attempts
    let selectedCards = this.state.selectedCards
    let cards = [...this.state.cards];

    // Find index of the card selected by user in the cards array
    let index = this.state.cards.findIndex(card => {
      return card.id == item.id
    });

    // To check if current card selected is not already opened 
    if (cards[index].open == false) {
      cards[index].open = true

      // add the card in the selectedCards array
      selectedCards.push({
        index: index,
        name: cards[index].name
      });

      if (selectedCards.length == 2) {
        // Tapping on 2 cards counts as 1 attempt
        attempts += 1;

        // If 2 cards tapped contain the same alphabet
        if (selectedCards[0].name == selectedCards[1].name) {
          score += 1;
        }
        // If 2 cards tapped doesn't contain the same alphabet, then close both the cards
        else {
          // Card tapped first closed
          cards[selectedCards[0].index].open = false;
          
          // Card tapped second closed with a delay after the first card is closed
          setTimeout(() => {
            cards[index].open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }
        // Clear this array after every attempt
        selectedCards = [];
      }

      this.setState({
        score: score,
        attempts: attempts,
        cards: cards,
        selectedCards: selectedCards
      });
    }
  }

  /**
   *  Renders 4x4 grid/board of 16 cards containing A,B,C...H cards (2 of each)
   */
  renderGrid() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.state.cards}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <Card
              item={item}
              onCardTap={this.cardTapped}
              isOpen={item.open}
              name={item.name}
            />
          )
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          {this.renderGrid()}
        </View>
        <View style={styles.counter}>
          <Counter 
            score={this.state.score} 
            attempts={this.state.attempts}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 0.8,
    marginTop: 80,
    marginBottom: 20,
    marginHorizontal: 16
  },
  counter: {
   flex: 0.2
  }
})