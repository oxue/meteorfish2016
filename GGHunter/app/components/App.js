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
  Image,
} from 'react-native'
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} from 'react-native-router-flux'
import CameraPage from './CameraPage'
import MapPage from './MapPage'
import Saved from './Saved'
import Accordion from './Accordion'

const app_id = '3f945af2-d32f-47cb-aa03-da745c50880d'
const server_url = 'https://ghostgearhunter.azurewebsites.net'

class TabIcon extends React.Component {
  render(){
    if(this.props.title === 'New Ghost Gear') {
      return <Image style={{height: 50}} resizeMode='contain' tintColor={this.props.selected ? 'white' :'#c8c8c8'} source={require('../img/ic_fiber_new_white_24dp.png')}/>
    } else if(this.props.title === 'About') {
      return <Image style={{height: 50}} resizeMode='contain' tintColor={this.props.selected ? 'white' :'#c8c8c8'} source={require('../img/ic_save_white_24dp.png')}/>
    } else if(this.props.title === 'Report Statuses') {
      return <Image style={{height: 50}} resizeMode='contain' tintColor={this.props.selected ? 'white' :'#c8c8c8'} source={require('../img/ic_remove_red_eye_white_24dp.png')}/>
    }
    return (
      <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    )
  }
}

export default class App extends Component {
  componentDidMount(){
    // fetch(server_url + '/parse/classes/gear?where='+encodeURIComponent('{"color":"green"}'), {
    //   method: 'GET',
    //   headers: {
    //     'X-Parse-Application-Id': app_id,
    //     'X-Parse-REST-API-Key': undefined,
    //     //'Content-Type': ''
    //   },
    // }).then((response)=>response.json()).then((jsonResponse)=>{
    //   //console.log(jsonResponse.results[0].picture.url)
    //   alert(JSON.stringify(jsonResponse.results))
    // })
  }
  render() {
    return (
      <Router sceneStyle={{backgroundColor:'#F7F7F7'}}>
        <Scene key="root" hideNavBar={true}>
          <Scene key="tabbar" tabs={true}   tabBarStyle={{backgroundColor: '#4842B8'}} >
            <Scene key="tab3" component={Saved} title="About" icon={TabIcon} titleStyle={{color: 'white'}} navigationBarStyle={{backgroundColor:'#4842B8'}}/>
            <Scene key="accordion" initial={true} component={Accordion} title="New Ghost Gear" icon={TabIcon} titleStyle={{color: 'white', top:10, bottom:0}} navigationBarStyle={{backgroundColor:'#4842B8'}}/>
            <Scene key="tab4" component={MapPage} title="Report Statuses" icon={TabIcon}/>
          </Scene>
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

AppRegistry.registerComponent('GGHunter', () => App)
