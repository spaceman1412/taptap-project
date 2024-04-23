import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../themes/colors";
import { SizedBox } from "./SizedBox";

export function Button(props) {
  return (
    <View style={$buttonContainer}>
      <TouchableOpacity style={$button} onPress={() => console.log("aaa")}>
        <>
          <Text style={$text}>Tạo task mới</Text>
          <SizedBox width={10} />
          <AntDesign name="plus" size={14} color="white" />
        </>
      </TouchableOpacity>
    </View>
  );
}

const $text: TextStyle = {
  fontSize: 14,
  fontWeight: "500",
  color: colors.white,
};

const $buttonContainer: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 24,
  justifyContent: "center",
  alignItems: "center",
};

const $button: ViewStyle = {
  width: 335,
  height: 44,
  backgroundColor: colors.pink,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
};
