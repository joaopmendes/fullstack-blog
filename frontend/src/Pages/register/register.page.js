import React, {useState} from 'react';
import {InputText} from "../../Components/MacroControllers/InputText";
import {FormWrapper} from "../../Components/MacroControllers/FormWrapper";
import {PageHeading} from "../../Components/MacroControllers/PageHeading";
import {MdEmail, MdContacts} from "react-icons/md"
import {FaCog} from "react-icons/fa"
import {Button} from "../../Components/MacroControllers/Button";
import styled from "styled-components"
import {FileInput} from "../../Components/MacroControllers/FileInput";
import {ErrorMessage} from "../../Components/MacroControllers/macro.styles";
import axios from "axios"
export const RegisterPage = ({}) => {
    // Name relative
    const [name, setName] = useState("");
    const [isNameValid, setIsNameValid] = useState(false);

    // Email relative
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const emailPatter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Password relative
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPassworrdValid] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("You must provide a valid password (3 or more lower case letters, 2 or more upper case letters, 2 or more numbers, 1 or more special characters ).");
    const passwordPattern = /.+/;

    // ConfirmPassword
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("You must provide a confirm password equals to previous password.");

    // ConfirmPassword
    const [file, setFile] = useState("");
    // Form Geral
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const validateForm = () => {
        if(isEmailValid && isPasswordValid && isConfirmPasswordValid && isNameValid) {
            setIsFormValid(true);
            setErrorMessages([]);
            return true;
        }
        setIsFormValid(false);
        setErrorMessages(["Please fill the required fields."]);
        return false;

    };
    const sendForm = () => {
        if(validateForm()) {
            var formData = new FormData();
            if(file) {
                formData.append('profile_image', file);
            }
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);

            axios.post("/api/register", formData)
                .then(res => console.log(res))
                .catch(err => console.log(err))

        }
    }
    // Name relative
    const onNameChange = (name, valid) => {
        setName(name);
        setIsNameValid(valid);
        validateForm();
    };

    // Email relative
    const onEmailChange = (email, valid) => {
        setEmail(email);
        setIsEmailValid(valid);
        validateForm();

    };

    // Password relative
    const onPasswordChange = (email, valid) => {
        setPassword(email);
        setIsPassworrdValid(valid);
        validateForm();
    };

    // ConfirmPassword
    const onConfirmPasswordChange = (password, valid) => {
        setConfirmPassword(password);
        setIsConfirmPasswordValid(valid);
        validateForm();
    };
    const validateConfirmPassword = (value) => {
        return value === password;
    };
    return (
        <>
            <PageHeading title={"Register"}/>
            <FormWrapper>
                <InputText
                    PrefixIcon={MdContacts}
                    errorMessage={"You must provide a first and last name."}
                    regex={"\\w+ \\w+.+"}
                    label={"Your Name"}
                    value={name}
                    onChange={(name, valid) => onNameChange(name, valid)}/>
                <InputText
                    PrefixIcon={MdEmail}
                    errorMessage={"You must provide a email."}
                    label={"Your Email"}
                    regex={emailPatter}
                    value={email}
                    onChange={(email, valid) => onEmailChange(email, valid)}/>
                <InputText
                    PrefixIcon={FaCog}
                    type={"password"}
                    errorMessage={passwordErrorMessage}
                    label={"Your Password"}
                    regex={passwordPattern}
                    value={password}
                    onChange={(password, valid) => onPasswordChange(password, valid)}/>

                <InputText
                    PrefixIcon={FaCog}
                    type={"password"}
                    errorMessage={confirmPasswordErrorMessage}
                    validate={validateConfirmPassword}
                    label={"Confirm Password"}
                    value={confirmPassword}
                    onChange={(confirmPassword, valid) => onConfirmPasswordChange(confirmPassword, valid)}/>
                    <FileInput onChange={(file) => setFile(file) } value={file}/>

                {errorMessages.map(error => <ErrorMessage>{error}</ErrorMessage>)}
                <WrapperSubmitButton>
                    <Button onClick={sendForm} backgroundColor={isFormValid ? "success" : "danger"} disabled={!isFormValid} >Register</Button>
                </WrapperSubmitButton>
            </FormWrapper>
        </>
    );
};
const WrapperSubmitButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 2rem auto
`;