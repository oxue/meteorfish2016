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
} from 'react-native'

export default class Saved extends Component{
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {}
    this.state.dataSource = ds.cloneWithRows(["entry 1","entry 1","entry 1",
                                             "entry 1","entry 1","entry 1",
                                             "entry 1","entry 1","entry 1",
                                             "entry 1","entry 1"]);
}
  render() {
    return (
            <View style={styles.container}>
            <ListView 
                dataSource = {this.state.dataSource}
                renderRow={(rowData) => <Text>{rowData}</Text>}
            />
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:64,
  },
  centerButton:{
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
})
