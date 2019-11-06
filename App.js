/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import _ from 'lodash';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      firstOperation: true,
      dotPlaced: false,
      operationDone: false,
      operationSelected: false,
      resultText: '0',
      operations: ['x2', 'log'],
      advancedOperations: ['-', '=', '+', '/', 'x'],
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'],
    };
    const changeDim = () => {};
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  makeOperation(operation) {
    let result = 0;
    if(operation != '=') {
      switch (operation) {
        case 'x2':
          result =
            parseFloat(this.state.resultText) *
            parseFloat(this.state.resultText);
          break;
        case 'log':
          result = Math.log10(parseFloat(this.state.resultText));
          break;
      }
    } else {
      const operationString = this.state.resultText.split(' ');
      let [left, operator, right] = operationString;
      switch (operator) {
        case '+':
          result =
            parseFloat(left) +
            parseFloat(right);
          break;
        case '-':
          result =
            parseFloat(left) -
            parseFloat(right);
          break;
        case '/':
          result =
              parseFloat(left) /
              parseFloat(right);
          break;
        case 'x':
          result =
              parseFloat(left) *
              parseFloat(right);
          break;
      }
    }
    this.setState({
      resultText: result,
      operationDone: true,
    });
  }
  whatIsPressed(pressedOne) {
    if (this.state.operations.includes(pressedOne)) {
      this.makeOperation(pressedOne);
    } else if (pressedOne == 'AC') {
      this.setState({
        resultText: '0',
        operationDone: false,
        operationSelected: false,
        dotPlaced: false,
        firstOperation: true,
      });
    } else if (this.state.resultText == '0') {
      if (pressedOne == '.') {
        this.setState({
          resultText: this.state.resultText + pressedOne,
          firstOperation: false,
          dotPlaced: true,
        });
      } else if(['1','2','3','4','5','6','7','8','9'].includes(pressedOne)) {
        this.setState({
          resultText: pressedOne,
          firstOperation: false,
          dotPlaced: false,
        });
      }
    } else if (pressedOne == '=' && this.state.operationSelected == true) {
      this.makeOperation(pressedOne);
      this.setState({
        operationSelected: false,
      });
    } else if(this.state.numbers.includes(pressedOne)) {
      if(pressedOne == '.' && this.state.dotPlaced == false){
        this.setState({
          resultText: this.state.resultText + pressedOne,
          dotPlaced: true,
        });
      }else if(pressedOne != '.'){
        this.setState({
          resultText: this.state.resultText + pressedOne,
        });
      }
    } else {
      if (this.state.advancedOperations.includes(pressedOne) && this.state.operationSelected == false && this.state.firstOperation == false) {
          this.setState({
            resultText: this.state.resultText + ' ' + pressedOne + ' ',
            operationSelected: true,
          dotPlaced: false,
          });
        }
      }
    }
  renderIf() {
    if (this.state.orientation === 'portrait') {
      return (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            key="AC"
            onPress={() => this.whatIsPressed('AC')}
            style={styles.buttonNormalFirstLine}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spaceButton} />
          <TouchableOpacity
            key="/"
            onPress={() => this.whatIsPressed('/')}
            style={styles.buttonOperation}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            key="AC"
            onPress={() => this.whatIsPressed('AC')}
            style={styles.buttonNormalFirstLine}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="x²"
            onPress={() => this.whatIsPressed('x2')}
            style={styles.buttonOperation}>
            <Text style={styles.buttonText}>x²</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="log"
            onPress={() => this.whatIsPressed('log')}
            style={styles.buttonOperation}>
            <Text style={styles.buttonText}>log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="/"
            onPress={() => this.whatIsPressed('/')}
            style={styles.buttonOperation}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultBar}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        {this.renderIf()}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            key="7"
            onPress={() => this.whatIsPressed('7')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="8"
            onPress={() => this.whatIsPressed('8')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="9"
            onPress={() => this.whatIsPressed('9')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="x"
            onPress={() => this.whatIsPressed('x')}
            style={styles.buttonOperation}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            key="4"
            onPress={() => this.whatIsPressed('4')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="5"
            onPress={() => this.whatIsPressed('5')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="6"
            onPress={() => this.whatIsPressed('6')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.whatIsPressed('-')}
            style={styles.buttonOperation}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            key="1"
            onPress={() => this.whatIsPressed('1')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="2"
            onPress={() => this.whatIsPressed('2')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="3"
            onPress={() => this.whatIsPressed('3')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="+"
            onPress={() => this.whatIsPressed('+')}
            style={styles.buttonOperation}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            key="0"
            onPress={() => this.whatIsPressed('0')}
            style={styles.buttonZero}>
            <Text style={[styles.buttonText, 'textAlign: left']}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="dot"
            onPress={() => this.whatIsPressed('.')}
            style={styles.buttonNormal}>
            <Text style={styles.buttonText}>,</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="="
            onPress={() => this.whatIsPressed('=')}
            style={styles.buttonOperation}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#4A4A4A',
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonRow: {
    backgroundColor: '#4A4A4A',
    flexDirection: 'row',
    flex: 0.139,
    justifyContent: 'space-between',
  },
  buttonNormal: {
    backgroundColor: '#686767',
    flex: 0.249,
    justifyContent: 'center',
  },
  buttonNormalFirstLine: {
    backgroundColor: '#595959',
    flex: 0.249,
    justifyContent: 'center',
  },
  buttonOperation: {
    backgroundColor: 'orange',
    flex: 0.25,
    justifyContent: 'center',
  },
  resultBar: {
    backgroundColor: '#4A4A4A',
    justifyContent: 'center',
    flex: 0.301,
  },
  resultText: {
    color: 'white',
    textAlign: 'right',
    fontSize: 60,
  },
  spaceButton: {
    backgroundColor: '#595959',
    flex: 0.499,
    justifyContent: 'center',
  },
  buttonZero: {
    backgroundColor: '#686767',
    flex: 0.499,
    justifyContent: 'center',
  },
});
