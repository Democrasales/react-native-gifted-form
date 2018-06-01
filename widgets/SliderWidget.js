import React from 'react';
import createReactClass from 'create-react-class';
import {
  View,
  PixelRatio,
  Text,
  AsyncStorage
} from 'react-native';
import Slider from 'react-native-slider'

var WidgetMixin = require('../mixins/WidgetMixin.js');

var GiftedSlider = createReactClass({
  _getSlider() {
    return (
      <Slider
        {...this.props}
      />
    );
  },
  render() {
    return (
      <View>
        {this._getSlider()}
      </View>
    );
  },
});


module.exports = createReactClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SliderWidget',
    };
  },

  async _addToAsyncStorage(value) {
    try {
      await AsyncStorage.setItem(this.props.name, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  },

  async _checkIfSelected() {
    let result = await AsyncStorage.getItem(this.props.name);
    parsedResult = JSON.parse(result)

    if (parsedResult !== null)  {
      this._onChange(parsedResult);
      this.props.onChange && this.props.onChange(parsedResult);
      this.setState({
        value: parsedResult
      })
    }
  },

  componentDidMount() {
    this._checkIfSelected();
  },

  render() {
    return (
      <View>
        <GiftedSlider
          onValueChange={(value) => {
            this._onChange(value);
            this.props.onChange && this.props.onChange(value);
            this._addToAsyncStorage(value);
          }}
          step={1}
          minimumValue={1}
          maximumValue={10}
          value={this.state.value}
        />
      </View>
    );
  },

  defaultStyles: {
    textAreaRow: {
      backgroundColor: '#FFF',
      height: 120,
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    },
    textArea: {
      fontSize: 15,
      flex: 1,
    },
  },

});
