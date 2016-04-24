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
  StatusBar,
} from 'react-native'
import MapView from 'react-native-maps'

let {width, height} = Dimensions.get('window')

export default class MapPage extends Component {
  downloadjson(){
	fetch('http://gerrycao.com/gghunter/testFile2.json', {
	  method: 'GET',
	  headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	  }
	}).then((response)=>{
	  // alert(JSON.stringify(response));
	  response.json().then((jsonBody)=>{
		//alert(JSON.stringify(jsonBody))
		//alert(jsonBody.reports[1].firstName)
		var data = jsonBody.reports;

		this.setState({rows: []});
		for(var i in data)
		{
			 var name = data[i].firstName;
			 var status = data[i].statusNow;

			 //alert(name + status);
			 this._addRow("Reported by: " + name + " Status: " + status);
		}
	  })
	})
	.catch((err)=>{
	  //alert("error getting json");
	})
}

  constructor(props, context){
    super(props, context)
    this.state = {
      region: {
        latitude: 49.30080957108101,
        longitude: -123.1337930524565,
        latitudeDelta: 0.0461,
        longitudeDelta: 0.0210,
      },
	  rows: [],
      geoPosition: {
        coords:{
          latitude: 49.30080957108101,
          longitude: -123.1337930524565,
        }
      },
      isUsingCustomPosition: false,
    }
    this.watchID = null

	setInterval(
		() => { this.downloadjson(); },
		5000
	);
  }
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      geoPosition=>{
        this.setState({ geoPosition, region: {...this.state.region, latitude: geoPosition.coords.latitude, longitude: geoPosition.coords.longitude} })
      },
      error => console.log(error),
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
      error => console.log(error),
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

  _addRow(info)
  {

	this.state.rows.push(info);
	this.setState({rows: this.state.rows});
  }

  render() {
	let rows = this.state.rows.map((r, i) => {
		if (r.indexOf("Done") > -1)
		{
		return <View>
			<Text style={{color: 'green', fontSize: 17}}>Record: {i} - {r}</Text>
		</View>
		}
		else if (r.indexOf("Additional Information Required") > -1)
		{
		return <View>
			<Text style={{color: 'red', fontSize: 17}}>Record: {i} - {r}</Text>
		</View>
		}
		else if (r.indexOf("Dispatched") > -1)
		{
		return <View>
			<Text style={{color: 'orange', fontSize: 17}}>Record: {i} - {r}</Text>
		</View>
		}
		else if (r.indexOf("Report Received") > -1)
		{
		return <View>
			<Text style={{color: 'blue', fontSize: 17}}>Record: {i} - {r}</Text>
		</View>
		}
		else
		{
		return <View>
			<Text style={{color: 'black', fontSize: 17}}>Record: {i} - {r}</Text>
		</View>
		}
	})

    return (
      <ScrollView style={styles.container}>
      <StatusBar backgroundColor='#393593' barStyle="light-content" translucent={false}/>

        <View style={{marginTop:64, marginBottom:20}} elevation={8}>
          <Text />
          <Text />
          <Text style={styles.text2}>
		  Submitted Report Statuses
          </Text>
        </View>
		{rows}
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
  text2:{
    color: 'black',
    fontSize:20,
	fontWeight: 'bold',
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
