import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import Camera from 'react-native-camera'

export default class CameraPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View style={styles.captureView}>
          <Text style={{color: 'black'}} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </View>
      </View>
    )
  }
  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  captureView: {
    flex:1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 60,
  },
})
