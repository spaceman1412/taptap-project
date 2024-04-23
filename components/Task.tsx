import { View, ViewStyle, Text, TextStyle } from "react-native";
import React from "react";
import { colors } from "../themes/colors";
import { SizedBox } from "./SizedBox";
import { FontAwesome } from "@expo/vector-icons";

export function Task(props) {
  return (
    <View style={$container}>
      <CheckBox />

      <View style={$taskContainer}>
        <Text style={$text}>Task 1</Text>

        <Text style={$priorityText}>Ưu tiên cao</Text>
      </View>
      <View style={$endContainer}>
        <FontAwesome name="pencil" size={24} color="black" />

        <Text style={$dateText}>Còn 2 ngày</Text>
      </View>
    </View>
  );
}

const CheckBox = () => {
  return <View style={$checkBox} />;
};

const $dateText: TextStyle = {
  fontSize: 12,
  fontWeight: "400",
};

const $priorityText: TextStyle = {
  fontSize: 14,
  fontWeight: "400",
  color: colors.green,
};

const $endContainer: ViewStyle = {
  marginRight: 24,
  alignItems: "flex-end",

  justifyContent: "space-between",
};

const $taskContainer: ViewStyle = {
  marginStart: 20,
  flex: 1,
  justifyContent: "space-between",
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
