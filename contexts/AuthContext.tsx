import React, {createContext, useState, useContext} from 'react';

import { authService } from '../api/auth/authService';
import { authData, signInCredentials } from '../types/AuthTypes';

type AuthContextData = {
    authData?: authData;
    loading: boolean;
    signIn(data : signInCredentials): Promise<void>;
    signOut(): void;
  };

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


type AuthProviderProps = {
    children: React.ReactNode;
}

const AuthProvider = ({ children } : AuthProviderProps) => {
  const [authData, setAuthData] = useState<authData>();
  
  //The loading part will be explained in the persist step session
  const [loading, setLoading] = useState(true);

  const signIn = async ({ email, password } : signInCredentials) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    const _authData : authData = await authService.signIn(
      email,
      password,
    );

    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(_authData);
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }
  
  export { AuthContext, AuthProvider, useAuth };

