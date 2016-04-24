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
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} from 'react-native-router-flux'
import CameraPage from './CameraPage'
import MapPage from './MapPage'
import Saved from './Saved'
import Accordion from './Accordion'

const app_id = '3f945af2-d32f-47cb-aa03-da745c50880d'
const server_url = 'https://ghostgearhunter.azurewebsites.net'

class TabIcon extends React.Component {
  render(){
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
          <Scene key="tabbar" tabs={true}   >
            <Scene key="tab3" component={Saved} title="New Ghost Gear" icon={TabIcon} titleStyle={{color: 'white'}} navigationBarStyle={{backgroundColor:'#4842B8'}}/>
            <Scene key="tab4" component={MapPage} title="Map" icon={TabIcon}/>
            <Scene key="tab5" component={CameraPage} title="Photo" icon={TabIcon} />
            <Scene key="accordion" initial={true} component={Accordion} title="New Ghost Gear" icon={TabIcon} titleStyle={{color: 'white', top:10, bottom:0}} navigationBarStyle={{backgroundColor:'#4842B8'}}/>
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
