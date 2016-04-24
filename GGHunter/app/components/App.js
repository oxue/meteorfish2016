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
    fetch(server_url + '/parse/classes/gear', {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': app_id,
        'X-Parse-REST-API-Key': undefined,
      }
    }).then((response)=>response.json()).then((jsonResponse)=>{
      console.log(jsonResponse.results[0].picture.url)
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
