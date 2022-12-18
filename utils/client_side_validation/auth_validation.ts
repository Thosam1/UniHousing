/* functions for client side validation */
/* will return a tuple with a boolean to say if the validation has succeeded + the message to be displayed */

/* Constants */
const MIN_PASSWORD_LENGTH = 6;
const MIN_FIRST_NAME_LENGTH = 2;
const MIN_LAST_NAME_LENGTH = 2;
const EMAIL_VERIFICATION_CODE_LENGTH = 9;
const FORGOT_PASSWORD_VERIFICATION_CODE_LENGTH = 9; 

// -----------------

/* Exported functions */

export function validateLogin(email: string, password: string) : [boolean, string]{
    const emailValidation: [boolean, string] = validateEmailFormat(email);
    if(emailValidation[0] === false) {
        return emailValidation;
    }   

    const passwordValidation: [boolean, string] = validatePasswordFormat(password); 
    if(passwordValidation[0] === false) {
        return passwordValidation;
    }

    return [true, "Client-side login validation is successful"];
}

export const validateRegister = (first_name: string, last_name: string, email: string, password: string, confirmPassword: string) : [boolean, string] => {

    const firstNameValidation: [boolean, string] = validateFirstName(first_name);
    if(firstNameValidation[0] === false) {
        return firstNameValidation;
    } 

    const lastNameValidation: [boolean, string] = validateLastName(last_name);
    if(lastNameValidation[0] === false) {
        return lastNameValidation;
    } 

    const emailAndBothPasswordsValidation: [boolean, string] = validateResetPassword(email, password, confirmPassword);   
    if(emailAndBothPasswordsValidation[0] === false) {
        return lastNameValidation;
    } 

    return [true, "Client-side login validation is successful"];
}

export const validateEmailVerification = (verificationCode: string) : [boolean, string] => {
    return (verificationCode.length === EMAIL_VERIFICATION_CODE_LENGTH) ? [true, "Correct length"] : [false, "Incorrect length"];
}

export const validateForgotPassword = (email: string) : [boolean, string] => {
    return validateEmailFormat(email);
}

export const validateForgotPasswordVerify = (verificationCode: string) : [boolean, string] => {
    return (verificationCode.length === FORGOT_PASSWORD_VERIFICATION_CODE_LENGTH) ? [true, "Correct length"] : [false, "Incorrect length"];
}

export const validateResetPassword = (email: string, password: string, confirmPassword: string) : [boolean, string] => {
    const emailValidation: [boolean, string] = validateEmailFormat(email);
    if(emailValidation[0] === false) {
        return emailValidation;
    } 

    const passwordValidation1: [boolean, string] = validatePasswordFormat(password);
    if(passwordValidation1[0] === false) {
        return passwordValidation1;
    } 

    const passwordValidation2: [boolean, string] = validatePasswordMatch(password, confirmPassword);
    if(passwordValidation2[0] === false) {
        return passwordValidation2;
    }     

    return [true, "Client-side login validation is successful"];
}

/* Building blocks */

const validateEmailFormat = (inputText: string) : [boolean, string] => {

    const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/

    const result: boolean = expression.test(inputText);
    const display: string = result ? "Correct email format" : "Wrong email format";

    return [result, display];
}

const validatePasswordFormat = (inputText: string) : [boolean, string] => {
    const lengthValidation: [boolean, string] = lengthChecker(inputText, MIN_PASSWORD_LENGTH, "Correct password format", "Password too small");
    return lengthValidation;
}

const validateFirstName = (inputText: string) : [boolean, string] => {
    const lengthValidation: [boolean, string] = lengthChecker(inputText, MIN_FIRST_NAME_LENGTH, "First name ok", "First name too short !");
    return lengthValidation;
}

const validateLastName = (inputText: string) : [boolean, string] => {
    const lengthValidation: [boolean, string] = lengthChecker(inputText, MIN_LAST_NAME_LENGTH, "Last name ok", "Last name too short !");
    return lengthValidation;
}

const validatePasswordMatch = (password: string, confirmPassword: string) : [boolean, string] => {
    let message: string = "";
    let bool: boolean = false;
    if(password === confirmPassword) {
        message = "Passwords match !";
        bool = true;
    } else {
        message = "Password do not match !";
        bool = false;
    }
    return [bool, message];
}

const lengthChecker = (inputText: string, len: number, correctString: string, incorrectString: string) : [boolean, string] => {
    let result: boolean = true;

    if(inputText.length < len) {
        result = false;
    }

    const display: string = result ? correctString : incorrectString;

    return [result, display];
}





