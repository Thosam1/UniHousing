
import React from "react";
import SignInScreen from "../screens/SignInScreen";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import SplashScreen from "../screens/SplashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroductionScreen from "../screens/IntroductionScreen";
import SignUpScreen from "../screens/SignUpScreen";

// type definitions
export type AuthStackParamList = {
  // will check if the names param are correct
  Introduction: undefined;
  SignIn: undefined;
  SignUp: undefined;
  EmailVerification: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  SplashScreen: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Introduction"
        component={IntroductionScreen}
        options={{
          title: "Introduction",
        }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: "Sign in",
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          //   animationTypeForReplace: authData ? "pop" : "push",
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: "Sign up",
        }}
      />

      <AuthStack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
        options={{
          title: "Email Verification",
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: "Forgot Password",
        }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          title: "Reset Password",
        }}
      />
      <AuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          title: "Splash Screen",
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
