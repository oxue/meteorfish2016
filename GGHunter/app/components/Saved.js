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
      <View style={styles.container}>
        <View>
          <Text>{this.state.sliderValue.toFixed(0, 10)}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 11, marginLeft: 10}}>Mesh Size (mm)</Text>
          </View>
          <View style={{flex:2, marginHorizontal: 10}}>
            <Slider
              value={this.state.sliderValue}
              onValueChange={(sliderValue)=>this.setState({sliderValue})}
              onSlidingComplete={(sliderValue)=>{}}
              maximumValue={250}
              minimumValue={0}
            />
          </View>
        </View>
        <View style={styles.fingerButtonContainer}>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
          <TouchableOpacity style={styles.fingerButton}></TouchableOpacity>
        </View>
      </View>
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
