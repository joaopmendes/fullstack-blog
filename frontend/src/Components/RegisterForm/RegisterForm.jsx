import React from "react";
import { WrapperSubmitButton } from "../../globa.styles";
import { Button } from "../MacroControllers/Button";
import RegisterFields from "./RegisterFields";

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
      <RegisterFields
        errors={errors}
        values={values}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        handleBlur={handleBlur}
        touched={touched}
      />
      <WrapperSubmitButton>
        <Button backgroundColor={isValid ? "success" : "danger"} disabled={!isValid || isSubmitting}>
          Register
        </Button>
      </WrapperSubmitButton>
    </form>
  );
};

export default RegisterForm;
