/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Card,
  ScrollView,
  RefreshControl
} from 'react-native';
import StatusBarBackground from './StatusBarBackground';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      data: 'The next message will be false.',
      refreshing: false,
    };
  }

  fetchData = (onSuccess, onFail) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.state.toggle) {
          this.setState({data: 'The next message will be true.', refreshing: false, toggle: false})
        } else {
          this.setState({data: 'The next message will be false.', refreshing: false, toggle: true})
        }
      }, 2000)
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData()
    .then(() => {
      this.setState({refreshing: false})
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBarBackground />
        <ScrollView style={styles.scrollView}
          contentContainerStyle={{flexGrow:1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.data}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  }
})
