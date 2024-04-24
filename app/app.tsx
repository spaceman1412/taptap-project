import { StatusBar } from "expo-status-bar";
import { FlatList, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "./themes/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { OpenTask, Task } from "./components/Task";
import { Button } from "./components/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { useState } from "react";
import { addTodo, Todo } from "./store/todoSlice";
import { getSize } from "./themes/responsive";

export function generateUUID(digits: number) {
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

  const getSortedTodoList = () => {
    let sortedArray = todoLists.concat();
    const getPoint = (priority: string) => {
      if (priority === "high") return 2;
      else if (priority === "medium") return 1;
      else if (priority === "low") return 0;
      else return 0;
    };

    return sortedArray.sort(function (x, y) {
      if (getPoint(x.priority) > getPoint(y.priority)) {
        return -1;
      }
      if (getPoint(x.priority) < getPoint(y.priority)) {
        return 1;
      }
      return 0;
    });
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
          value={{
            id: generateUUID(10),
            text: "Task",
            date: new Date().toISOString(),
            priority: "high",
          }}
        />
      )}

      <FlatList
        data={getSortedTodoList()}
        keyExtractor={(item) => item.id}
        renderItem={(value) => <Task value={value.item} />}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        contentContainerStyle={$flatList}
        showsVerticalScrollIndicator={false}
      />

      <Button onClick={() => setAdd(true)} />
    </SafeAreaView>
  );
}

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
  paddingVertical: 32,
};

const $titleText: TextStyle = {
  color: colors.white,
  fontSize: getSize.font(20),
  alignSelf: "center",
  fontWeight: "500",
};
