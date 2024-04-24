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
import { useDispatch } from "react-redux";
import { getSize } from "../themes/responsive";

interface ButtonProps {
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <View style={$buttonContainer}>
      <TouchableOpacity style={$button} onPress={props.onClick}>
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
  fontSize: getSize.font(14),
  fontWeight: "500",
  color: colors.white,
};

const $buttonContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

const $button: ViewStyle = {
  width: getSize.s(335),
  height: getSize.v(44),
  backgroundColor: colors.pink,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
};
