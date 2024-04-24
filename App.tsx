import App from "./app/app";
import { store } from "./app/store/store";
import { Provider } from "react-redux";

export default function ExpoApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
