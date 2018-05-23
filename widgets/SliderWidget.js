import React from 'react';
import createReactClass from 'create-react-class';
import {
  View,
  PixelRatio,
  Text
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

  render() {
    return (
      <View>
        <GiftedSlider
          onValueChange={(value) => {
            this._onChange(value);
            this.props.onChange && this.props.onChange(value);
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
