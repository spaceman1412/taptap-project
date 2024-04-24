import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { memo, useState } from "react";
import { colors } from "../themes/colors";
import { SizedBox } from "./SizedBox";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Animated, { FadeOutDown, FadeOutUp } from "react-native-reanimated";
import { editTodo, removeTodo, Todo } from "../store/todoSlice";
import { useDispatch } from "react-redux";
import { getSize } from "../themes/responsive";

interface TaskProps {
  value: Todo;
}

export function Task(props: TaskProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const changeStatus = () => {
    setOpen((currentOpen) => !currentOpen);
  };

  return (
    <>
      {open ? (
        <OpenTask
          value={props.value}
          onDelete={() => {
            dispatch(removeTodo(props.value.id));
          }}
          onDone={(todo) => {
            dispatch(editTodo(todo));
            changeStatus();
          }}
        />
      ) : (
        <CloseTask onClick={changeStatus} value={props.value} />
      )}
    </>
  );
}

const getDatesBetween = (day: string) => {
  const date = new Date(day);
  const currentDate = new Date();
  // Calculating the time difference
  // of two dates
  let Difference_In_Time = date.getTime() - currentDate.getTime();

  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  return Difference_In_Days > 0 ? Difference_In_Days : 0;
};

interface CloseTaskProps {
  onClick: () => void;
  value: Todo;
}

const CloseTask = (props: CloseTaskProps) => {
  const { value, onClick } = props;

  let priorityText;
  let priorityColor;

  if (value.priority === "high") {
    priorityText = "Ưu tiên cao";
    priorityColor = colors.green;
  } else if (value.priority === "medium") {
    priorityText = "Ưu tiên trung bình";
    priorityColor = colors.yellow;
  } else if (value.priority === "low") {
    priorityText = "Ưu tiên thấp";
    priorityColor = colors.red;
  }

  return (
    <Animated.View exiting={FadeOutDown} style={$openContainer}>
      <CheckBox />
      <View style={$taskContainer}>
        <Text style={$text}>{value.text}</Text>
        <Text style={[$priorityText, { color: priorityColor }]}>
          {priorityText}
        </Text>
      </View>
      <View style={$endContainer}>
        <TouchableOpacity onPress={onClick}>
          <FontAwesome name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <Text style={$dateText}>{`Còn ${getDatesBetween(
          value.date
        )} ngày`}</Text>
      </View>
    </Animated.View>
  );
};

export const getFormattedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}/${month}/${year}`;

  return currentDate;
};

interface OpenTaskProps {
  onDone: (todo: Todo) => void;
  onDelete: () => void;
  value: Todo;
}

interface PickerTextBoxProps {
  selectedLanguage: "high" | "medium" | "low";
  setSelectedLanguage: (value: "high" | "medium" | "low") => void;
}

const PickerTextBox = (props: PickerTextBoxProps) => {
  const { selectedLanguage, setSelectedLanguage } = props;
  return (
    <>
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
          style={{ width: getSize.s(110) }}
        >
          <Picker.Item label="Cao" value="high" style={$text} />
          <Picker.Item label="Trung bình" value="medium" style={$text} />
          <Picker.Item label="Thấp" value="low" style={$text} />
        </Picker>
      </View>

      <View style={{ height: 1, backgroundColor: colors.gray }} />
    </>
  );
};

interface DateTextBoxProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateTextBox = (props: DateTextBoxProps) => {
  const { date, setDate } = props;
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <>
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
    </>
  );
};

export const OpenTask = memo((props: OpenTaskProps) => {
  const { onDone, onDelete, value } = props;
  const [text, onChangeText] = useState(value.text);
  const [date, setDate] = useState(new Date(value.date));
  const [selectedLanguage, setSelectedLanguage] = useState(value.priority);

  const currentTodo: Todo = {
    text,
    date: date.toISOString(),
    priority: selectedLanguage,
    id: value.id,
  };

  const checkError = () => {
    if (text === "" || text === undefined) {
      return true;
    }
  };

  const handleOnDone = () => {
    if (checkError()) {
      Alert.alert("Please enter text");
      return;
    }
    onDone(currentTodo);
  };

  return (
    <Animated.View exiting={FadeOutUp} style={$closeContainer}>
      <View
        style={{
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={onDelete}>
          <Feather name="trash-2" size={24} color="black" />
          <SizedBox width={5} />
          <Text style={$deleteText}>Xóa</Text>
        </TouchableOpacity>
      </View>
      <SizedBox height={8} />

      <TextInput
        value={text}
        autoFocus
        onChangeText={onChangeText}
        style={{
          borderBottomWidth: 1,
          fontSize: 16,
          fontWeight: "500",
          paddingVertical: 8,
        }}
      />

      <SizedBox height={22} />

      <DateTextBox date={date} setDate={setDate} />

      <SizedBox height={8} />

      <PickerTextBox
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      <SizedBox height={32} />

      <TouchableOpacity onPress={handleOnDone} style={$confirmButton}>
        <Text style={{ color: colors.white }}>Xong</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const CheckBox = () => {
  return <View style={$checkBox} />;
};

const $confirmButton: ViewStyle = {
  width: getSize.s(85),
  height: getSize.v(28),
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
  width: getSize.s(327),
  height: getSize.v(250),
  backgroundColor: colors.white,
  borderRadius: 15,
  paddingHorizontal: 24,
  paddingVertical: 24,
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
  width: getSize.s(327),
  height: getSize.v(100),
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
