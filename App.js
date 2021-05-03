import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

export default class App extends Component {
  render() {
    return (
      <View>
        <View>
          <Text>Find Gemstone</Text>
          <Text>Python Neural Network</Text>
        </View>
        <View>
          <Text>Output</Text>
        </View>
        <View>
          <Button
            title="Camera Roll"
            style={styles.button}
            containerStyle={{margin: 5}}
            titleStyle={{fontSize: 20}}></Button>
          <Button
            title="Take a Photo"
            style={styles.button}
            containerStyle={{margin: 5}}
            titleStyle={{fontSize: 20}}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
