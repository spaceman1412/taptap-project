import { StatusBar } from "expo-status-bar";
import { FlatList, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "./themes/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFormattedDate, OpenTask, Task } from "./components/Task";
import { Button } from "./components/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { useState } from "react";
import { addTodo, Todo } from "./store/todoSlice";

const DATA = ["aa", "bb", "cc", "dd"];

export function generateUUID(digits) {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
  let uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join("");
}

export default function App() {
  const todoLists = useSelector(
    (state: RootState) => state.todoReducer.todoLists
  );
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);

  const onAddTodo = (todo: Todo) => {
    dispatch(addTodo(todo));
  };

  console.log("todoLists", todoLists);
  return (
    <SafeAreaView style={$container}>
      <StatusBar style="auto" />

      <Text style={$titleText}>To-do list</Text>

      {add && (
        <OpenTask
          onDone={(todo: Todo) => {
            onAddTodo(todo);
            setAdd(false);
          }}
          onDelete={() => {
            setAdd(false);
          }}
          value={{
            id: generateUUID(10),
            text: "Task",
            date: new Date().toISOString(),
            priority: "high",
          }}
        />
      )}

      <FlatList
        data={todoLists}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <Task value={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        contentContainerStyle={$flatList}
        showsVerticalScrollIndicator={false}
      />

      <Button onClick={() => setAdd(true)} />
    </SafeAreaView>
  );
}

const $buttonTitle: TextStyle = {
  fontSize: 14,
  fontWeight: "500",
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: 24,
  paddingVertical: 16,
  alignItems: "center",
};

const $flatList: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 32,
};

const $titleText: TextStyle = {
  color: colors.white,
  fontSize: 20,
  alignSelf: "center",
  fontWeight: "500",
};
