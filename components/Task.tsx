import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../themes/colors";
import { SizedBox } from "./SizedBox";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export function Task(props) {
  return <OpenTask />;
}

const CloseTask = () => {
  return (
    <View style={$openContainer}>
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
};

const getFormattedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}/${month}/${year}`;

  return currentDate;
};

const OpenTask = () => {
  const [text, onChangeText] = useState("Task 1");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View style={$closeContainer}>
      <View
        style={{
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <Feather name="trash-2" size={24} color="black" />
        <SizedBox width={5} />
        <Text style={$deleteText}>Xóa</Text>
      </View>
      <SizedBox height={8} />
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={{
          borderBottomWidth: 1,
          fontSize: 16,
          fontWeight: "500",
          paddingVertical: 8,
        }}
      />

      <SizedBox height={22} />
      <TouchableOpacity
        onPress={showMode}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={$text}>Thời hạn</Text>
        <Text>{getFormattedDate(date)}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <SizedBox height={8} />

      <View style={{ height: 1, backgroundColor: colors.gray }} />

      <SizedBox height={8} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={$text}>Mức độ ưu tiên</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          style={{ width: 120 }}
        >
          <Picker.Item label="Cao" value="high" style={$text} />
          <Picker.Item label="Trung bình" value="medium" style={$text} />
          <Picker.Item label="Thấp" value="low" style={$text} />
        </Picker>
      </View>

      <View style={{ height: 1, backgroundColor: colors.gray }} />

      <SizedBox height={32} />

      <TouchableOpacity style={$confirmButton}>
        <Text style={{ color: colors.white }}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
};

const CheckBox = () => {
  return <View style={$checkBox} />;
};

const $confirmButton: ViewStyle = {
  width: 85,
  height: 28,
  borderRadius: 20,
  backgroundColor: colors.green,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
};

const $deleteText: TextStyle = {
  fontSize: 14,
  fontWeight: "400",
};

const $closeContainer: ViewStyle = {
  width: 327,
  height: 299,
  backgroundColor: colors.white,
  borderRadius: 15,
  paddingHorizontal: 24,
  paddingVertical: 32,
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

const $openContainer: ViewStyle = {
  width: 327,
  height: 114,
  backgroundColor: colors.white,
  borderRadius: 15,
  flexDirection: "row",
  paddingHorizontal: 24,
  paddingVertical: 32,
};

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
};
