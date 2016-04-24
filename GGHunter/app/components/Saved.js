import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ListView,
  Geolocation,
  Slider,
  ScrollView,
  StatusBar,
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class Saved extends Component{
  constructor(props) {
    super(props)
    this.state = {
      sliderValue: 150
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor='#393593' barStyle="light-content" translucent={false}/>
        <View style={{margin: 20}}>
          <Text>Ghost Gear Hunter (GGHunter) is a mobile app that facilitates crowdsourcing of fishing gear debris location and contextual data. This leverages the wide distribution of keen environmentalists and ‘citizen scientists’ as well as the GPS, data and photo capabilities  of mobile devices to convey a precise location of aquatic fishing debris to researchers. An easy and intuitive user interface encourages data collection by members of the public by making it easy to report lost fishing gear. Users can submit photos as well as identifying data that will help researchers more accurately understand the distribution and impact of various types of fishing gear. Lastly the app provides users with information regarding how their data submission has been helpful to researchers, providing them with positive motivation to continue contributing to the dataset and the ongoing efforts to clean up debris from our coastal waters.</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:64,
  },
  fingerButtonContainer: {
    height: 200,
    marginLeft: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  fingerButton: {
    width: width*0.185,
    height: 70,
    borderWidth: 1,
    borderColor: '#BBBCBC',
    margin: 1,
  }
})
