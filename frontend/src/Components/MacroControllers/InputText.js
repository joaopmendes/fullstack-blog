import React, {useEffect, useState} from 'react';
import uuid  from "uuid";
import {FaCheck} from "react-icons/fa"
import {MdClose} from "react-icons/md"
import {ErrorMessage, Icon, InputField, InputGroup, InputInfo, InputLabel, InputWrapper} from "./macro.styles";
export const InputText = ({resetField, touched, PrefixIcon, validate, name, minLength, maxLength, type, label, onChange, value, error, errorMessage, regex, onBlur, displayErrorWhenImTrue, placeholder, ...rest}) => {
    const id = uuid();
    return (
       <InputGroup>
           <InputLabel error={error} touched={touched} htmlFor={id}>{label}</InputLabel>
           <InputWrapper error={error} touched={touched}>
               {PrefixIcon && <InputInfo error={error} touched={touched} ><PrefixIcon /></InputInfo> }

               <InputField  placeholder={placeholder} value={value} name={name} id={id} type={type} {...rest} onBlur={onBlur} onChange={onChange}/>
                <Icon error={error && touched}>
                    {!error && touched && <FaCheck />}
                    {error && touched && <MdClose onClick={resetField}/>}
                </Icon>
           </InputWrapper>
           {error && touched && !displayErrorWhenImTrue && <ErrorMessage>{errorMessage}</ErrorMessage>}
           {displayErrorWhenImTrue && <ErrorMessage>{errorMessage}</ErrorMessage>}
       </InputGroup>
    );
};

