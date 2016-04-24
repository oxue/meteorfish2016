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
  ScrollView,
} from 'react-native'
import MapView from 'react-native-maps'

let {width, height} = Dimensions.get('window')

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
      error => console.error(error),
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
      error => console.error(error),
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
      <ScrollView style={styles.container}>
        <View style={{marginTop:64, marginBottom:20}} elevation={8}>
          <Text style={styles.text}>Ghost Gear Hunters! Please take a minute and help us to identify the ghost gear by taking a photo of the discovered gear and answering some questions!

          </Text>
          <Text />
          <Text />
          <Text style={styles.text}>
                          Your action matters, numerous marine lives will be saved because of you!
          </Text>
        </View>
        <MapView style={[styles.container, {marginTop: 20, height: 300}]}
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
        <View style={[styles.container, {backgroundColor: '#4842b8', height:100}]}>
          <Text style={[styles.text, {color:'#c5c5c5'}]}>color</Text>
        </View>
        <View style={styles.colorButtonContainer}>
          <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#c6c6c6'}]}><View style={styles.colorButtonView}><Text style={styles.textCenter}>Grey</Text></View></TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#ffe401'}]}><View style={styles.colorButtonView}><Text style={styles.textCenter}>Yellow</Text></View></TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#d2232a'}]}><View style={styles.colorButtonView}><Text style={styles.textCenter}>Red</Text></View></TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#dd8200'}]}><View style={styles.colorButtonView}><Text style={styles.textCenter}>Orange</Text></View></TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#317a35'}]}><View style={styles.colorButtonView}><Text style={styles.textCenter}>Green</Text></View></TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#9b471e'}]}><View style={styles.colorButtonView}><Text style={styles.textCenter}>Brown</Text></View></TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#0084ce'}]}><View style={styles.colorButtonView}><Text style={styles.textCenter}>Blue</Text></View></TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#000'}]}><View style={styles.colorButtonView}><Text style={styles.textCenter}>Black</Text></View></TouchableOpacity>
        </View>
      </ScrollView>
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
  text:{
    color: 'black',
    fontSize:20,
  },
  colorButtonContainer:{
    height: 200,
    marginLeft: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  colorButton:{
    width: width*0.235,
    height: 70,
    borderWidth: 1,
    borderColor: '#BBBCBC',
    margin: 1,
    justifyContent:'flex-end'
  },
  colorButtonView:{
    height:25,
    backgroundColor:'white'
  },
  textCenter:{
    textAlign:'center'
  }

})
