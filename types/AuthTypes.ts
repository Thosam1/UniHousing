// when signing in
export type signInCredentials = {
  email: string;
  password: string;
};

// when register in
export type registerCredentials = {
  name: string;
  email: string;
  password: string;
};

// data we get back when logged in
export type authData = {
  token: string;
  email: string;
  name: string;
};
