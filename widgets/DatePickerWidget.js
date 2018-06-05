import React from 'react';
import createReactClass from 'create-react-class';
import {
  View,
  PixelRatio
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Text } from 'react-native-elements'

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = createReactClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'DatePickerWidget',
      getDefaultDate: () => { return new Date(); }
    };
  },

  getInitialState() {
    return {
      value: new Date(),
    };
  },

  componentDidMount() {
    this._onChange(this.props.getDefaultDate());
  },

  render() {
    return (
      <View style={this.getStyle('row')}>
        <Text style={this.getStyle('title')}>Visit Date</Text>
        <DatePicker
          style={{width: 200}}
          {...this.props}

          onDateChange={this._onChange}
          date={this.state.value}
        />
      </View>
    );
  },

  defaultStyles: {
    row: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    picker: {
    },
    title: {
      flex: 1,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10
    },
  },
});
