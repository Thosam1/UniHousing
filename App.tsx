// tailwind
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

// navigation
import { NavigationContainer } from "@react-navigation/native";

//components
import RootNavigator from "./navigator/RootNavigator";

export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TailwindProvider>
  );
}
