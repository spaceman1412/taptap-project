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

const newTodo: Todo = {
  id: Date.now().toString(),
  text: "Task",
  date: getFormattedDate(new Date()),
  priority: "high",
};

export default function App() {
  const todoLists = useSelector(
    (state: RootState) => state.todoReducer.todoLists
  );
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);

  const onAddTodo = (todo: Todo) => {
    dispatch(addTodo(todo));
  };

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
          value={newTodo}
        />
      )}

      <FlatList
        data={todoLists}
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
