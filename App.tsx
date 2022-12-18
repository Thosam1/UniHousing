// tailwind
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

// navigation
import { NavigationContainer } from "@react-navigation/native";

//components
import RootNavigator from "./navigator/RootNavigator";
import { Provider } from "react-redux";
import { store } from "./features/store";




export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </TailwindProvider>
  );
}
