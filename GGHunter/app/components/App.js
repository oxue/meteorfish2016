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
import ParseServerAzure from'parse-server-azure'

const app_id = '3f945af2-d32f-47cb-aa03-da745c50880d'
const server_url = 'https://ghostgearhunter.azurewebsites.net'

const api = new ParseServer({
  appId: app_id,
  serverURL: server_url
})

class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    )
  }
}

export default class App extends Component {
  componentDidMount(){
    const Gear = api.Object.extend('gear')
    const gear = new Gear()
    gear.save({
      color:'green'
    }, gear=>{

    }, (gear, error)=>{
      alert('error')
    })
  }
  render() {
    return (
      <Router sceneStyle={{backgroundColor:'#F7F7F7'}}>
        <Scene key="root" hideNavBar={true}>
          <Scene key="tabbar" tabs={true} >
            <Scene key="tab3" component={MapPage} title="Tab #3" icon={TabIcon}/>
            <Scene key="tab4" component={MapPage} title="Tab #4" icon={TabIcon}/>
            <Scene key="tab5" component={CameraPage} title="Tab #5" icon={TabIcon} />
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
