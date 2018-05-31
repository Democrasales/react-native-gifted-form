import React from 'react';
import createReactClass from 'create-react-class';
import {
  View,
  AsyncStorage
} from 'react-native';

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = createReactClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SelectWidget',
      multiple: false,
      onSelect: () => {},
      onClose: () => {},
    };
  },

  unSelectAll() {
    React.Children.forEach(this._childrenWithProps, (child, idx) => {
      this.refs[child.ref]._onChange(false);
    });
  },

  async addToStorage(key, type, val) {
    let hash = await AsyncStorage.getItem(key);
    if (hash === null) {
      hash = {}
    } else {
      hash = JSON.parse(hash)
    }
    hash[type] = val

    try {
      await AsyncStorage.setItem(key, JSON.stringify(hash))
    } catch (error) {
      console.log(error)
    }
  },

  async removeFromStorage(key) {
    await AsyncStorage.removeItem(key);
  },

  render() {
    this._childrenWithProps = React.Children.map(this.props.children, (child, idx) => {
      var val = child.props.value || child.props.title;

      return React.cloneElement(child, {
        formStyles: this.props.formStyles,
        openModal: this.props.openModal,
        formName: this.props.formName,
        navigator: this.props.navigator,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onValidation: this.props.onValidation,
        onValueChange: this.props.onValueChange,

        name: this.props.name+'{'+val+'}',
        ref: this.props.name+'{'+val+'}',
        value: this.props.multiple ? false : val,
        unSelectAll: this.unSelectAll,
        addToStorage: this.addToStorage,
        removeFromStorage: this.removeFromStorage,
        formKey: this.props.name,

        multiple: this.props.multiple,
        onClose: this.props.onClose, // got from ModalWidget
        onSelect: this.props.onSelect, // got from DayPickerWidget
      });
    });

    return (
      <View>
        {this._childrenWithProps}
      </View>
    );
  },
});
