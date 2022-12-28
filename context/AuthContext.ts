import React, {createContext, useContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';

type AuthProviderProps = {
    children: React.ReactNode;
}

type authState = {
    accessToken: string | null,
    refreshToken: string | null,
    authenticated: boolean | null,
}

type AuthContextData = {
    authState?: authState;
    logout(): Promise<void>;
    getAccessToken(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const { Provider } = AuthContext;

const AuthProvider = ({children} : AuthProviderProps) => {
  const [authState, setAuthState] = useState<authState>({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (<AuthContext.Provider> </>)

//   return (
//     <AuthContext.Provider value={{
//         authState,
//         getAccessToken,
//         setAuthState,
//         logout,
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );

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

export {AuthContext, AuthProvider, useAuth };