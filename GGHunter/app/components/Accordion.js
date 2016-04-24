import React, {
  Component,
  DatePickerAndroid,
  Easing,
  View,
  Text,
  TextInput,
  StyleSheet,
  LayoutAnimation,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
const Accordion = require('react-native-collapsible/Accordion')
let {width, height} = Dimensions.get('window')
import MapView from 'react-native-maps'

const SECTIONS = [
  {
    firstln: 'Date ghost gear discovered',
    secondln: Date(),
    content: 'Lorem ipsum...',
  },
  {
    firstln: 'Colour',
    secondln: 'Grey',
    content: 'Lorem ipsum...',
  }
]

export default class AccordionPage extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      date: '',
      month: '',
      year: '',
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
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.firstText}>{section.firstln}</Text>
        <Text style={styles.secondText}>{this.state}</Text>
      </View>
    )
  }
  _renderContent(section) {
    return (
      <View style={styles.content}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({date: text})}
        value={this.state.date}


      />
      </View>
    )
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
        <StatusBar backgroundColor='#393593' barStyle="light-content" translucent={false}/>
        <View style={{paddingHorizontal:20, paddingVertical: 34, backgroundColor: '#EEEEEE'}} elevation={8}>
          <Text style={styles.text}>
            Ghost Gear Hunters! Please take a minute and help us to identify the ghost gear by taking a photo of the discovered gear and answering some questions!
          </Text>
          <Text style={[styles.text, {marginTop: 20}]}>
            Your action matters, numerous marine lives will be saved because of you!
          </Text>
          <TouchableOpacity style={{position: 'absolute', right: 0, bottom: 0, padding: 4}} elevation={8}>
            <View style={{backgroundColor: '#FF4366', height: 50, width: 50, borderRadius: 25}} elevation={8}>
            </View>
          </TouchableOpacity>
        </View>

        <MapView style={{height: 200}}
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
        <View style={{backgroundColor: '#4842b8', height:100}}>
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
        <Accordion
          sections={SECTIONS}
          initiallyActiveSection = {0}
          duration = {350}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent.bind(this)}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  header: {
    height: 60,
    backgroundColor: '#6161c2',
  },
  content: {
    height: 60,
    backgroundColor: 'white',
  },
  firstText: {
    fontSize : 14,
    marginLeft: 40,
    marginTop: 10,

    color : '#fff',
    textAlign : 'left'
  },
  secondText: {
    fontSize : 14,
    marginLeft: 40,

    color : '#c5c5c5',
    textAlign : 'left'
  },
  centerButton:{
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  text:{
    color: '#7C7C7C',
    fontSize: 14,
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
