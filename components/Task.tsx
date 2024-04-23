import { View, ViewStyle, Text, TextStyle } from "react-native";
import React from "react";
import { colors } from "../themes/colors";
import { SizedBox } from "./SizedBox";
import { FontAwesome } from "@expo/vector-icons";

export function Task(props) {
  return (
    <View style={$container}>
      <CheckBox />

      <View style={$textContainer}>
        <Text style={$text}>Task 1</Text>
        <SizedBox height={12} />
        <Text>Ưu tiên cao</Text>
      </View>
      <View style={$endContainer}>
        <FontAwesome name="pencil" size={24} color="black" />
        <SizedBox height={10} />
        <Text>Còn 2 ngày</Text>
      </View>
    </View>
  );
}

const CheckBox = () => {
  return <View style={$checkBox} />;
};

const $endContainer: ViewStyle = {
  marginRight: 24,
  alignItems: "flex-end",
};

const $textContainer: ViewStyle = {
  marginStart: 20,
  flex: 1,
};

const $checkBox: ViewStyle = {
  width: 22,
  height: 22,
  borderRadius: 5,
  backgroundColor: colors.gray,
};

const $container: ViewStyle = {
  width: 327,
  height: 114,
  backgroundColor: colors.white,
  borderRadius: 15,
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingVertical: 32,
};

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
};
