import React, {useState} from 'react';
import * as Yup from "yup";
import {useFormik, ErrorMessage} from "formik";
import axios from "axios";
import {PageHeading} from "../../Components/MacroControllers/PageHeading";
import {FormWrapper} from "../../Components/MacroControllers/FormWrapper";
import {InputText} from "../../Components/MacroControllers/InputText";
import {Button} from "../../Components/MacroControllers/Button";
import {FaCog, MdEmail} from "react-icons/all";
import {WrapperSubmitButton} from "../../globa.styles";

export const LoginPage = ({}) => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email not valid.").required("Email is required!"),
        password: Yup.string()
            .min(6, 'Password has to be longer than 6 characters!')
            .required('Password is required!'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);
            const data = new FormData();
            data.append("email", values.email);
            data.append("password", values.password);
            axios.post("/api/login", data)
                .then(res => {
                    setSubmitting(false)

                })
                .catch(err => {
                    setSubmitting(false)
                });
        },
    });
    const {errors, values, handleChange, handleBlur, touched, isSubmitting, isValid, handleSubmit, setFieldValue} = formik;

    return (
        <>
            <PageHeading title={"Login"}/>
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <InputText
                        PrefixIcon={MdEmail}
                        errorMessage={errors.email}
                        error={Boolean(errors.email)}
                        touched={touched.email}
                        label={"Your Email"}
                        value={values.email}
                        name={"email"}
                        resetField={() => setFieldValue("email", "")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <InputText
                        PrefixIcon={FaCog}
                        type={"password"}
                        errorMessage={errors.password}
                        error={Boolean(errors.password)}
                        resetField={() => setFieldValue("password", "")}
                        touched={touched.password}
                        label={"Your password"}
                        value={values.password}
                        name={"password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    
                    <WrapperSubmitButton>
                        <Button backgroundColor={isValid ? "success" : "danger"}
                                disabled={!isValid || isSubmitting}>Login</Button>
                    </WrapperSubmitButton>
                </form>
            </FormWrapper>
        </>
    );
};
