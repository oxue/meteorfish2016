import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Geolocation,
} from 'react-native'
import CameraPage from './CameraPage'
import MapPage from './MapPage'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapPage />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

AppRegistry.registerComponent('GGHunter', () => App)
