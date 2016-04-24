import React, {
  Component,
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
} from 'react-native'
const Accordion = require('react-native-collapsible/Accordion')

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
]

export default class Accordion extends Component {
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    )
  }
  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Accordion
          sections={SECTIONS}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  header: {
    height: 40,
    backgroundColor: 'red',
  }
})
