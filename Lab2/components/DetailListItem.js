import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import colors from "../utility/colors";

const DetailListItem = ({ title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

DetailListItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
  },
  contentContainer: {
    flexDirection: 'column', // sửa lại cho subtitle nằm dưới title
  },
  title: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: colors.blue,
    marginTop: 6,
  },
});

export default DetailListItem;
