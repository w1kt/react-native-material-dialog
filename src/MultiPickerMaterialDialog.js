import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback
} from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialDialog from './MaterialDialog';

import colors from './colors';

export default class MultiPickerMaterialDialog extends Component {
  constructor(props) {
    super(props);

    const { selectedItems } = props;
    const selected = new Map();
    selectedItems.forEach(item => {
      selected.set(item.value, true);
    });

    this.state = { selected };
  }

  onPressItem(value) {
    this.setState(prevState => {
      const selected = new Map(prevState.selected);
        selected.set(value, !selected.get(value));
      return { selected };
    });
  }

  onAll() {
    this.setState(prevState => {
      const selected = new Map(prevState.selected);
      this.props.items.forEach(item => {
        selected.set(item.value, true);
      });
      return { selected };
    });
  }
  
  onClear() {
    this.setState(prevState => {
      const selected = new Map(prevState.selected);
      this.props.items.forEach(item => {
        selected.set(item.value, false);
      });
      return { selected };
    });
  }

  keyExtractor = item => String(item.value);

  renderItem = ({ item }) => (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(this.props.androidRippleColor)}
      onPress={() => this.onPressItem(item.value)}
    >
      <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
          <Icon
            name={
              this.state.selected.get(item.value)
                ? 'check-box'
                : 'check-box-outline-blank'
            }
            color={
              this.state.selected.get(item.value)
                ? this.props.colorAccent
                : this.props.borderColor
            }
            size={24}
          />
        </View>
        <Text
          style={[material.subheading, { color: this.props.pickerTextColor }]}
        >
          {item.label}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );

  render() {
    return (
      <MaterialDialog
        title={this.props.title}
        titleColor={this.props.titleColor}
        borderColor={this.props.borderColor}
        colorAccent={this.props.colorAccent}
        backgroundColor={this.props.backgroundColor}
        colorAccent={this.props.colorAccent}
        visible={this.props.visible}
        okLabel={this.props.okLabel}
        scrolled={this.props.scrolled}
        onOk={() =>
          this.props.onOk({
            selectedItems: this.props.items.filter(item =>
              this.state.selected.get(item.value)
            )
          })
        }
        cancelLabel={this.props.cancelLabel}
        onCancel={this.props.onCancel}
        allButton={this.props.allButton}
        clearButton={this.props.clearButton}
        onAll={() => this.onAll()}
        onClear={() => this.onClear()}
      >
        <FlatList
          data={this.props.items}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </MaterialDialog>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    height: 56,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  iconContainer: {
    marginRight: 16
  }
});

MultiPickerMaterialDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  titleColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  pickerTextColor: PropTypes.string,
  colorAccent: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  scrolled: PropTypes.bool,
  androidRippleColor: PropTypes.string,
  allButton: PropTypes.bool,
  clearButton: PropTypes.bool
};

MultiPickerMaterialDialog.defaultProps = {
  selectedItems: [],
  title: undefined,
  titleColor: undefined,
  backgroundColor: colors.background,
  pickerTextColor: colors.androidPrimaryTextColor,
  colorAccent: colors.androidColorAccent,
  cancelLabel: undefined,
  okLabel: undefined,
  scrolled: false,
  androidRippleColor: colors.androidRippleColor,
  allButton: false,
  clearButton: false
};
