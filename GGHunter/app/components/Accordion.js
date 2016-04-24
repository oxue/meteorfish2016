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
      date: 'Date',
      month: 'Month',
      year: 'Year',
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
        <Text style={styles.secondText}>{this.state.date + ' ' + this.state.month + ' ' + this.state.year}</Text>
      </View>
    )
  }
  _renderContent(section) {
    return (
      <View style={styles.content}>
      <TextInput ref = 'Date'
        style={{height: 50, width: 60, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({date: text})}
        maxLength = {2}
        placeholder='DD'/>
        <TextInput ref = 'Month'
          style={{height: 50, width: 60, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({month: text})}
          maxLength = {2}
          placeholder='MM'/>
      <TextInput ref = 'Year'
        style={{height: 50, width: 60, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({year: text})}
        maxLength = {4}
        placeholder='YYYY'/>
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

        <Accordion
          sections={SECTIONS}
          initiallyActiveSection = {0}
          duration = {350}
          renderHeader={this._renderHeader.bind(this)}
          renderContent={this._renderContent.bind(this)}
        />
      //</ScrollView>
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
