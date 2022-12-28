import { useEffect } from "react";

// tailwind
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

// navigation
import { NavigationContainer } from "@react-navigation/native";

//components
import RootNavigator from "./navigator/RootNavigator";
import { Provider } from "react-redux";
import { store } from "./features/store";

import { BASE_URL } from "./api/RequestManager";

export default function App() {
  // useEffect(() => {

  //   console.log("the use effect from app.tsx");

  //   (async () => {
  //     const response = await fetch(BASE_URL + "users/me", {
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //     }).catch((err) => { return; });

  //     const data = await response.json() // json object we get from the backend
      
  //     console.log("we got the data from the server when app started");
  //     console.log(data);
  //   })();
  // });

  useEffect(() => {

    // look if saved access Token is valid or not
    
    // valid -> set authenticated to true and keep access token

    // not valid -> ask for a new accessToken with refreshToken

    // if fails with refreshToken, then navigate to rootpage by putting "authenticated" to false

  })

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
