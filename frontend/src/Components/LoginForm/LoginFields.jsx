import React from "react";
import { FaCog, MdEmail } from "react-icons/all";
import { WrapperSubmitButton } from "../../global.styles";
import { Button } from "../MacroControllers/Button";
import { InputText } from "../MacroControllers/InputText";
const LoginFields = ({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => {
  return (
    <>
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
    </>
  );
};
export default LoginFields;
