import React from "react";
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
import { initialValues, validationSchema } from "./register.config";
import { login } from "../../Store/Auth/auth.actions";
import { useDispatch } from "react-redux";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
export const RegisterPage = ({}) => {
  const dispatch = useDispatch();
  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("profile_image", values.avatar);

    const headers = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("/api/register", data, headers)
      .then(res => {
        setSubmitting(false);
        const payload = {
          name: res.data.user.name,
          email: res.data.user.email,
          accessToken: res.data.user.accessToken,
          posts: res.data.user.posts,
          profilePicture: res.data.user.profilePicture
        };
        dispatch(login(payload));
      })
      .catch(err => {
        setSubmitting(false);
      });
  };
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
        <RegisterForm
          errors={errors}
          values={values}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          touched={touched}
          isSubmitting={isSubmitting}
          isValid={isValid}
          handleSubmit={handleSubmit}
        />
      </FormWrapper>
    </>
  );
};
