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

const app_id = '3f945af2-d32f-47cb-aa03-da745c50880d'
const server_url = 'https://ghostgearhunter.azurewebsites.net'

export default class Storage extends Component {
	static async getGears(){
    fetch(server_url + '/parse/classes/gear', {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': app_id,
        'X-Parse-REST-API-Key': undefined,
      }
    }).then((response)=>response.json()).then((jsonResponse)=>{
      console.log(jsonResponse.results[0].color)
    })
    
}

}