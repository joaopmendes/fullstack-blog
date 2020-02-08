import React from "react";
import { WrapperSubmitButton } from "../../global.styles";
import { Button } from "../MacroControllers/Button";
import LoginFields from "./LoginFields";

const RegisterForm = ({
  errors,
  values,
  handleChange,
  setFieldValue,
  handleBlur,
  touched,
  isSubmitting,
  isValid,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <LoginFields
        errors={errors}
        values={values}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        handleBlur={handleBlur}
        touched={touched}
      />
      <WrapperSubmitButton>
        <Button backgroundColor={isValid ? "success" : "danger"} disabled={!isValid || isSubmitting}>
          Login
        </Button>
      </WrapperSubmitButton>
    </form>
  );
};

export default RegisterForm;
