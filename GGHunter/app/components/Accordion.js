import React, {
  Component,
  DatePickerAndroid,
  Easing,
  View,
  Text,
  TextInput,
  StyleSheet,
  LayoutAnimation,
} from 'react-native'
const Accordion = require('react-native-collapsible/Accordion')

const SECTIONS = [
  {
    firstln: 'Date ghost gear discovered',
    secondln: Date(),
    content: 'Lorem ipsum...',
  },
  {
    firstln: 'Colour',
    secondln: 'Grey',
    content: 'Lorem ipsum...',
  }

]

export default class AccordionPage extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      date: '',
      month: '',
      year: '',
    }}


  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.firstText}>{section.firstln}</Text>
        <Text style={styles.secondText}>{this.state}</Text>
      </View>
    )
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({date: text})}
        value={this.state.date}


      />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Accordion
          sections={SECTIONS}
          initiallyActiveSection = {0}
          duration = {350}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  header: {
    height: 60,
    backgroundColor: '#6161c2',
  },
  content: {
    height: 60,
    backgroundColor: 'white',
  },
  firstText: {
    fontSize : 14,
    marginLeft: 40,
    marginTop: 10,

    color : '#fff',
    textAlign : 'left'
  },
  secondText: {
    fontSize : 14,
    marginLeft: 40,

    color : '#c5c5c5',
    textAlign : 'left'
  }

})
