import React from "react";
import { ColorValue, View } from "react-native";

interface Props {
  children?: React.ReactElement;
  height?: number;
  width?: number;
  backgroundColor?: ColorValue | string;
}

export function SizedBox(props: Props) {
  const { height, width, children, backgroundColor } = props;
  return <View style={{ height, width, backgroundColor }}>{children}</View>;
}
