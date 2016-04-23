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
        latitude: 49.30080957108101,
        longitude: -123.1337930524565,
        latitudeDelta: 0.0461,
        longitudeDelta: 0.0210,
      },
      geoPosition: {
        coords:{
          latitude: 49.30080957108101,
          longitude: -123.1337930524565,
        }
      },
      isUsingCustomPosition: false,
    }
    this.watchID = null
  }
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      geoPosition=>{
        this.setState({ geoPosition, region: {...this.state.region, latitude: geoPosition.coords.latitude, longitude: geoPosition.coords.longitude} })
      },
      error => console.err(error),
      {enableHighAccuracy: true, timeout: 20000},
    )
    navigator.geolocation.watchPosition(
      geoPosition=>{
        if(this.state.isUsingCustomPosition){
          this.setState({ geoPosition })
        } else {
          this.setState({ geoPosition, region: {...this.state.region, latitude: geoPosition.coords.latitude, longitude: geoPosition.coords.longitude} })
        }
      },
      error => console.err(error),
      {enableHighAccuracy: true, timeout: 20000},
    )
  }
  onRegionChange(region) {
    this.setState({ region, isUsingCustomPosition: true })
  }
  onCenter(){
    let geoPosition = this.state.geoPosition
    this.setState({ region: {...this.state.region, latitude: geoPosition.coords.latitude, longitude: geoPosition.coords.longitude, isUsingCustomPosition: false} })
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
