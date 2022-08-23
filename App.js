import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Box from './src/components/Box/Box';
import MyButton from './src/components/Button/Button';
import checkWinner from './src/components/Winner/Winner';

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameBoard, setGameBoard] = useState(new Array(9).fill(null));
  const [painted, setPainted] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('MULTIPLAYER'); // MULTIPLAYER - vsPHONE

  useEffect(() => {
    let possibleChoice = [];
    for (let i = 0; i < 9; i++) {
      if (gameBoard[i] === null) {
        possibleChoice.push(i);
        // console.log(possibleChoice)
      }
    }

    if (
      currentPlayer === 'O' &&
      possibleChoice.length > 0 &&
      gameMode === 'vsPHONE'
    ) {
      let randomBox =
        possibleChoice[Math.floor(Math.random() * possibleChoice.length)];
      setTimeout(() => handlePress(randomBox), 100);
    }
  }, [currentPlayer, gameMode]);

  const handlePress = index => {
    const newGameBoard = [...gameBoard];
    newGameBoard[index] = currentPlayer;
    setGameBoard(newGameBoard);

    const winnerCondition = checkWinner(newGameBoard);

    if (winnerCondition) {
      setPainted(winnerCondition);
      setWinner(currentPlayer);
    } else{
      setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    }
  };

  const handleRestart = () => {
    setCurrentPlayer('X');
    setGameBoard(new Array(9).fill(null));
    setWinner(null);
    setPainted([]);
  };

  const renderBox = index => (
    <Box
      value={gameBoard[index]}
      onPress={() => handlePress(index)}
      disabled={winner || gameBoard[index]}
      painted={painted.includes(index)}
    />
  );

  const handleMultiplayer = () => {
    handleRestart();
    setGameMode('MULTIPLAYER');
  };

  const handlePhone = () => {
    handleRestart();
    setGameMode('vsPHONE');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.text_container}>
        {winner ? (
          <View style={styles.winner_container}>
            <Text style={styles.winner_text}> {currentPlayer} </Text>
            <Text style={styles.winner_text}> Win </Text>
          </View>
        ) : (
          <Text style={styles.turn_text}>Turn: {currentPlayer}</Text>
        )}
      </View>

      <View style={styles.box_container}>
        {renderBox(0)}
        {renderBox(1)}
        {renderBox(2)}
      </View>
      <View style={styles.box_container}>
        {renderBox(3)}
        {renderBox(4)}
        {renderBox(5)}
      </View>
      <View style={styles.box_container}>
        {renderBox(6)}
        {renderBox(7)}
        {renderBox(8)}
      </View>
      <View style={styles.button_container}>
        <MyButton
          title={'     Restart     '}
          onPress={() => handleRestart()}
          color={'steelblue'}
          textColor={'white'}
        />
      </View>
      <View style={styles.select_button_container}>
        <MyButton
          title={'MULTIPLAYER'}
          onPress={handleMultiplayer}
          color={gameMode === 'MULTIPLAYER' ? 'steelblue' : 'white'}
          textColor={gameMode === 'MULTIPLAYER' ? 'white' : 'steelblue'}
        />
        <MyButton
          title={'vs PHONE'}
          onPress={handlePhone}
          color={gameMode === 'vsPHONE' ? 'steelblue' : 'white'}
          textColor={gameMode === 'vsPHONE' ? 'white' : 'steelblue'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'coral',
    fontSize: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  text_container: {
    marginVertical: 20,
  },
  turn_text: {
    color: '#8DB3B8',
    fontSize: 45,
    fontWeight: '500',
  },
  winner_container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'steelblue',
    borderRadius: 10,
  },
  winner_text: {
    color: 'white',
    fontSize: 40,
    fontWeight: '500',
  },
  box_container: {
    flexDirection: 'row',
  },
  button_container: {
    marginTop: 15,
  },
  select_button_container: {
    flexDirection: 'row',
    //marginTop:-20,
    marginHorizontal: 25,
    justifyContent: 'space-evenly',
  },
});
