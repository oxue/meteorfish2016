import React, {
  AppRegistry,
  Component,
  View,
  Text,
} from 'react-native'

export default class App extends Component {
  render(){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello World</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('GGHunter', () => App)
