import { StatusBar } from "expo-status-bar";
import { FlatList, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "./themes/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "./components/Task";
import { Button } from "./components/Button";

const DATA = ["aa", "bb", "cc", "dd"];

export default function App() {
  return (
    <SafeAreaView style={$container}>
      <StatusBar style="auto" />

      <Text style={$titleText}>To-do list</Text>

      <FlatList
        data={DATA}
        renderItem={(item) => <Task />}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        contentContainerStyle={$flatList}
        showsHorizontalScrollIndicator={false}
      />

      <Button />
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
