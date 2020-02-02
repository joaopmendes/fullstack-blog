import React, { useState } from "react";
import { InputText } from "../../Components/MacroControllers/InputText";
import { FormWrapper } from "../../Components/MacroControllers/FormWrapper";
import { PageHeading } from "../../Components/MacroControllers/PageHeading";
import { MdEmail, MdContacts } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import axios from "axios";
import { useFormik } from "formik";
import { Button } from "../../Components/MacroControllers/Button";
import { FileInput } from "../../Components/MacroControllers/FileInput";
import { WrapperSubmitButton } from "../../globa.styles";
import {initialValues, validationSchema} from "./register.config"
export const RegisterPage = ({}) => {
  const onSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("password", values.password);
    if (values.avatar) data.append("avatar_image", values.avatar);
  
    console.log(data);
    axios
      .post("/api/register", data)
      .then(res => {
        setSubmitting(false);
      })
      .catch(err => {
        setSubmitting(false);
      });
  }
  const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit
    });

  const {
    errors,
    values,
    handleChange,
    setFieldValue,
    handleBlur,
    touched,
    isSubmitting,
    isValid,
    handleSubmit
  } = formik;

  return (
    <>
      <PageHeading title={"Register"} />
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <InputText
            PrefixIcon={MdContacts}
            errorMessage={errors.name}
            error={Boolean(errors.name)}
            touched={touched.name}
            label={"Your Name"}
            resetField={() => setFieldValue("name", "")}
            value={values.name}
            name={"name"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputText
            PrefixIcon={MdEmail}
            errorMessage={errors.email}
            error={Boolean(errors.email)}
            touched={touched.email}
            label={"Your Email"}
            resetField={() => setFieldValue("email", "")}
            value={values.email}
            name={"email"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputText
            PrefixIcon={FaCog}
            type={"password"}
            errorMessage={errors.password}
            resetField={() => setFieldValue("password", "")}
            error={Boolean(errors.password)}
            touched={touched.password}
            label={"Your password"}
            value={values.password}
            name={"password"}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputText
            PrefixIcon={FaCog}
            type={"password"}
            errorMessage={errors.confirmPassword}
            error={Boolean(errors.confirmPassword)}
            resetField={() => setFieldValue("confirmPassword", "")}
            touched={touched.confirmPassword}
            label={"Confirm Password"}
            value={values.confirmPassword}
            name={"confirmPassword"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FileInput onChange={file => setFieldValue("avatar", file)} value={values.avatar} />

          <WrapperSubmitButton>
            <Button
              backgroundColor={isValid ? "success" : "danger"}
              disabled={!isValid || isSubmitting}
            >
              Register
            </Button>
          </WrapperSubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};
