import React, {
  Component,
  DatePickerAndroid,
  Easing,
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  LayoutAnimation,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Slider,
} from 'react-native'
import {Actions} from 'react-native-router-flux'
const Accordion = require('react-native-collapsible/Accordion')
let {width, height} = Dimensions.get('window')
import MapView from 'react-native-maps'

const SECTIONS = [
  { type: 'Date' },
  { type: 'Colour' },
  { type: 'Mesh' },
  { type: 'Twine' },
  { type: 'Submit' },
]

export default class AccordionPage extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      sliderValue: 125,
      date: 'Date',
      month: 'Month',
      year: 'Year',
      colour: 'Colour',
      isModalOpen: false,
	  animated: true,
	  transparent: false,
      meshSize: 'Size',
      mestTwine: 'Twine',
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
  renderDateHeader(){
    return <View style={styles.header}>
      <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{width: 40, height: 40, marginLeft: 20 }} source={require('../img/ic_date_range_white.png')} resizeMode='contain'/>
        <View style={styles.rowTextContainer}>
          <Text style={styles.firstText}>Date ghost gear discovered</Text>
          <Text style={styles.secondText}>{this.state.date + ' ' + this.state.month + ' ' + this.state.year}</Text>
        </View>
      </View>
    </View>
  }
  renderColourHeader(){
    return <View style={styles.header}>
      <View style={styles.rowTextContainer}>
        <Text style={styles.firstText}>Colour</Text>
        <Text style={styles.secondText}>{this.state.colour}</Text>
      </View>
    </View>
  }
  renderMeshHeader(){
     var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return <View style={styles.header}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <View style={[styles.rowTextContainer, {flex: 0}]}>
          <Text style={styles.firstText}>Mesh Size Measurement</Text>
          <Text style={styles.secondText}>{Math.round(this.state.sliderValue) + ' mm'}</Text>
        </View>
  	    <TouchableOpacity style={{marginLeft: 8, marginTop: 10}} onPress={() => this.openModal()}>
  		    <Image style={styles.question} source={require('../img/question.png')}/>
        </TouchableOpacity>
      </View>
<Modal visible={this.state.isModalOpen} onRequestClose={() => {this.closeModal()}}
style={styles.modal}
animated={this.state.animated}
transparent={this.state.transparent}>

	<View style={[styles.container2, modalBackgroundStyle]}>
		<View style={[styles.innerContainer, innerContainerTransparentStyle]}>
			<Image
			style={styles.icon}
			source={require('../img/mesh_size_instruction.png')}
			/>
			<Text style={styles.titleText}>
			{'The Net Kit uses the standard net measurement of stretched mesh size to determine the net\'s mesh size. Start by selecting a selection of the net that looks undamaged.\n\nStretch a square of net by two of the knots so that the other two knots meet in the middle. If the meshes do not meet, try using the other two knots of the same mesh. If the knots still do not meet evenly, this section of the net is damaged and another section should be used.\n\nMeasure the distance between the inside of the knots, this is the mesh size. Callipers, a 30cm ruler or a measuring tape can be used to take this measurement.'}
			</Text>
			<TouchableOpacity onPress={() => this.closeModal()}>
				<Text
				style={styles.modalCloseText}>
				OKAY
				</Text>
			</TouchableOpacity>
		</View>
	</View>

</Modal>

    </View>
  }
  renderTwineHeader(){
    return <View style={styles.header}>
      <Text style={styles.firstText}>Twine Size Measurement</Text>
    </View>
  }
  renderSubmitHeader(){
    return <View style={{height: 60, backgroundColor: '#FF4366'}} onPress = {() => this.submitAll()}>
      <Text style={styles.firstText}>Submit</Text>
    </View>
  }
  submitAll(){
    console.log('weed');
    var imguri = this.props.img
    var body = new FormData()
    var guid = 'id' + Math.random()
    body.append('picture',
    {
        uri:imguri.toString(),
        type: "image/jpeg",
        name: guid + ".jpeg"
    });

    var req = new XMLHttpRequest();

    req.onreadystatechange = (e) => {
        if(req.readyState !== 4){
            return;
        }
        if(req.status === 200){
            console.log(req.response);
        }else{
            console.log('f');
            console.log(req.responseText);
        }
    }
    req.open('POST', "https://radiant-springs-15984.herokuapp.com/cool");
    //req.open('POST', "https://ghostgearhunter.azurewebsites.net/parse/classes/file");

    req.setRequestHeader("X-Parse-Application-Id","3f945af2-d32f-47cb-aa03-da745c50880d");
    req.setRequestHeader("X-Parse-REST-API-Key", "undefined");

    req.send(body);
  }
  _renderHeader(section) {
    switch(section.type){
      case 'Date':
        return this.renderDateHeader()
      case 'Colour':
        return this.renderColourHeader()
      case 'Mesh':
        return this.renderMeshHeader()
      case 'Twine':
        return this.renderTwineHeader()
      case 'Submit':
        return this.renderSubmitHeader()
    }
  }
  _renderContent(section) {
    switch(section.type){
      case 'Date':
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
      case 'Colour':
      return (<View style={styles.colorButtonContainer}>
        <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#c6c6c6'}]} onPress={ () => this.setState({colour: 'Grey'})} ><View style={styles.colorButtonView}><Text style={styles.textCenter}>Grey</Text></View></TouchableOpacity>
        <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#ffe401'}]} onPress={ () => this.setState({colour: 'Yellow'})} ><View style={styles.colorButtonView}><Text style={styles.textCenter}>Yellow</Text></View></TouchableOpacity>
        <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#d2232a'}]} onPress={ () => this.setState({colour: 'Red'})} ><View style={styles.colorButtonView}><Text style={styles.textCenter}>Red</Text></View></TouchableOpacity>
        <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#dd8200'}]} onPress={ () => this.setState({colour: 'Orange'})} ><View style={styles.colorButtonView}><Text style={styles.textCenter}>Orange</Text></View></TouchableOpacity>
        <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#317a35'}]} onPress={ () => this.setState({colour: 'Green'})} ><View style={styles.colorButtonView}><Text style={styles.textCenter}>Green</Text></View></TouchableOpacity>
        <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#9b471e'}]} onPress={ () => this.setState({colour: 'Brown'})} ><View style={styles.colorButtonView}><Text style={styles.textCenter}>Brown</Text></View></TouchableOpacity>
        <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#0084ce'}]} onPress={ () => this.setState({colour: 'Blue'})} ><View style={styles.colorButtonView}><Text style={styles.textCenter}>Blue</Text></View></TouchableOpacity>
        <TouchableOpacity style={[styles.colorButton, {backgroundColor:'#000'}]} onPress={ () => this.setState({colour: 'Black'})} ><View style={styles.colorButtonView} ><Text style={styles.textCenter}>Black</Text></View></TouchableOpacity>
      </View>)
      case 'Mesh':
        return (
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', height: 60}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 11, marginLeft: 10, textAlign: 'center'}}>Mesh Size (mm)</Text>
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
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 20}) }><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f0.png')}/></TouchableOpacity>
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 33})} ><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f1.png')}/></TouchableOpacity>
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 50})}><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f2.png')}/></TouchableOpacity>
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 65})}><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f3.png')}/></TouchableOpacity>
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 85})}><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f4.png')}/></TouchableOpacity>
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 110})}><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f5.png')}/></TouchableOpacity>
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 145})}><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f6.png')}/></TouchableOpacity>
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 198})}><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f7.png')}/></TouchableOpacity>
              <TouchableOpacity style={styles.fingerButton} onPress = {() => this.setState({sliderValue: 240}) }><Image style={styles.fingerButtonImg} resizeMode='contain' source={require('../img/f8.png')}/></TouchableOpacity>
            </View>
          </View>
        )
      case 'Twine':
        return this.renderTwineHeader()
      case 'Submit':
        return this.renderSubmitHeader()
    }

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
  takePhoto(){
    Actions.tab5()
  }
	openModal() {
		this.setState({isModalOpen: true});

		// let str_json = '{ "reports" : [' +
		// '{ "firstName":"John" , "statusNow":"Report Received" },' +
		// '{ "firstName":"Kyle" , "statusNow":"Done" },' +
		// '{ "firstName":"Kyle" , "statusNow":"Additional Information Required" },' +
		// '{ "firstName":"Anna" , "statusNow":"Personnel Dispatched" },' +
		// '{ "firstName":"Peter" , "statusNow":"Net Retrieved" } ]}';

		// fetch('http://gerrycao.com/gghunter/processjson2.php', {
			// method: 'POST',
			// headers: {
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json',
			// },
			// body: str_json
		// }).then((response) =>
			// console.log('OK!')
		// )
	}

  closeModal() {
    this.setState({isModalOpen: false});
  }
  render() {
    var imageStyle = [styles.image, {width: Dimensions.get('window').width/2, height: 150 , padding: 0, margin: 0}];

    return (

      <ScrollView style={styles.container}>
        <StatusBar backgroundColor='#393593' barStyle="light-content" translucent={false}/>
        <View style={{alignItems: 'center', backgroundColor: '#EEEEEE'}} elevation={8}>
          { this.props.img
            ? <Image source = {{uri : this.props.img}} style = {imageStyle} />
            : <View style={{paddingHorizontal:20, paddingVertical: 34, backgroundColor: '#EEEEEE'}}>
              <Text style={styles.text}>
                Ghost Gear Hunters! Please take a minute and help us to identify the ghost gear by taking a photo of the discovered gear and answering some questions!
              </Text>
              <Text style={[styles.text, {marginTop: 20}]}>
                Your action matters, numerous marine lives will be saved because of you!
              </Text>
              <TouchableOpacity style={{position: 'absolute', right: 0, bottom: 0, padding: 4}} elevation={8} onPress = {this.takePhoto}>
                <Image style={{width: 50, height: 50}} source={require('../img/camera_red.png')}/>
              </TouchableOpacity>
            </View>
          }
          { this.props.img
            ? <TouchableOpacity style={{position: 'absolute', right: 0, bottom: 0, padding: 4}} elevation={8} onPress = {this.takePhoto}>
                <Image style={{width: 50, height: 50}} source={require('../img/camera_red.png')}/>
              </TouchableOpacity>
            : null
          }
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
          {/*<TouchableOpacity style={styles.centerButton} onPress={()=>this.onCenter()}>
            <Text>Center</Text>
          </TouchableOpacity>*/}
        </MapView>

        <Accordion
          sections={SECTIONS}
          initiallyActiveSection = {0}
          duration = {350}
          renderHeader={this._renderHeader.bind(this)}
          renderContent={this._renderContent.bind(this)}
        />
        <View style={{height: 100}}/>
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
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  rowTextContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  firstText: {
    fontSize : 14,
    color : '#fff',
  },
  secondText: {
    fontSize : 14,
    color : '#c5c5c5',
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
  },

  fingerButtonContainer: {
    marginLeft: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  question: {
    width: 25,
	height: 25,
  },
  modal: {
	width: width - 20,
	height: height - 20,
	},
  icon: {
    width: width-40,
	height: 225,
  },
  modalCloseText: {
    fontSize: 15,
    marginRight: 10,
	marginTop: 10,
    textAlign: 'right',
    color: '#2196F3',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
	margin: 10,
  },
  innerContainer: {
    borderRadius: 10,
  },
  fingerButton: {
    width: width*0.315,
    height: 115,
    borderWidth: 1,
    borderColor: '#BBBCBC',
    margin: 1,
  },
  fingerButtonImg: {
    width: width*0.310,
    height: 114,
  },
})
