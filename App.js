import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Tflite from 'tflite-react-native';

let tflite = new Tflite();
var modelFile = 'models/model.tflite';
var labelsFile = 'models/labels.txt';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognitions: null,
      source: null,
    };
    tflite.loadModel(
      {
        model: modelFile,
        labels: labelsFile,
      },
      (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      },
    );
  }

  selectGalleryImage() {
    const options = {};
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User Cancelled Image');
      } else if (response.error) {
        console.log('Error encountered');
      } else if (response.customButton) {
        console.log('User pressed Custom Button');
      } else {
        console.log('Opened Library');
        this.setState({
          source: {uri: response.uri},
        });

        tflite.runModelOnImage(
          {
            path: response.path,
            imageMean: 128,
            imageStd: 128,
            numResults: 50,
            threshold: 0.5,
          },
          (err, res) => {
            if (err) console.log(err);
            else {
              console.log(res[res.length - 1]);
              this.setState({recognitions: res[res.length - 1]});
            }
          },
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Find Gemstone</Text>
          <Text style={styles.subtitle}>Python Neural Network</Text>
        </View>
        <View style={styles.outputContainer}>
          <Image
            source={require('./assets/gems3.png')}
            style={styles.gemsImage}></Image>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Camera Roll"
            buttonStyle={styles.button}
            containerStyle={{margin: 5}}
            titleStyle={{fontSize: 20}}
            onPress={this.selectGalleryImage.bind(this)}></Button>
          <Button
            title="Take a Photo"
            buttonStyle={styles.button}
            containerStyle={{margin: 5}}
            titleStyle={{fontSize: 20}}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a061fe',
  },
  titleContainer: {
    marginTop: 70,
    marginLeft: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  outputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 57,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  gemsImage: {
    width: 570,
    height: 350,
    resizeMode: 'stretch',
  },
});
