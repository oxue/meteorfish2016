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
      date: 'Date',
      month: 'Month',
      year: 'Year',
    }}


  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.firstText}>{section.firstln}</Text>
        <Text style={styles.secondText}>{this.state.date + ' ' + this.state.month + ' ' + this.state.year}</Text>
      </View>
    )
  }

  _renderContent(section) {
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Accordion
          sections={SECTIONS}
          initiallyActiveSection = {0}
          duration = {350}
          renderHeader={this._renderHeader.bind(this)}
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
    flexDirection : 'row',

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
