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
import MapView from 'react-native-maps'

export default class MapPage extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0461,
        longitudeDelta: 0.0210,
      },
      geoPosition: {
        coords:{
          latitude: 37.78825,
          longitude: -122.4324,
        }
      },

    }
    this.watchID = null
  }
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (geoPosition)=>{
        this.setState({ geoPosition, region: {...this.state.region, latitude: geoPosition.coords.latitude, longitude: geoPosition.coords.longitude} })
      },
      (error) => console.err(error),
      {enableHighAccuracy: true, timeout: 20000},
    )
    navigator.geolocation.watchPosition(
      (geoPosition)=>{
        this.setState({ geoPosition, region: {...this.state.region, latitude: geoPosition.coords.latitude, longitude: geoPosition.coords.longitude} })
      },
      (error) => console.err(error),
      {enableHighAccuracy: true, timeout: 20000},
    )
  }
  onRegionChange(region) {
    this.setState({ region })
  }
  onCenter(){
    console.warn('On Center')
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.container}
          region={this.state.region}
          onRegionChange={(region)=>this.onRegionChange(region)}>
          <MapView.Marker
            coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
          />
          <MapView.Marker
            coordinate={{latitude: this.state.geoPosition.coords.latitude, longitude: this.state.geoPosition.coords.longitude}}
          />
        </MapView>
        <TouchableOpacity style={styles.centerButton} onPress={()=>this.onCenter()}>
          <Text>Center</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerButton:{
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
})
