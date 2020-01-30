import React, {useEffect, useState} from 'react';
import styled, {keyframes} from "styled-components"
import uuid  from "uuid";
import {FaCheck} from "react-icons/fa"
import {MdClose} from "react-icons/md"
import {ErrorMessage, Icon, InputField, InputGroup, InputInfo, InputLabel, InputWrapper} from "./macro.styles";
export const InputText = ({PrefixIcon, validate, minLength, maxLength, type, label, onChange, value, errorMessage, regex, onBlur, displayErrorWhenImTrue, placeholder, ...rest}) => {
    const [error, setError] = useState(false);
    const [touched, setTouched] = useState(false);
    const [id, setId] = useState();
    useEffect(() => {
        setId( uuid());

    }, []);
    const validations = (value) => {
        let valid = true;

        if(regex) {
            let pattern;
            typeof regex === "string" ?
                pattern = new RegExp(regex):
                pattern = regex;
            if(!pattern.test(value)) {
                valid = false
            }
        }
        if(validate) {
            valid = validate(value)
        }
        if(value !== undefined && value.length < minLength) {
            valid = false;
        }
        if(maxLength && maxLength < value.length) {
            valid = false;
        }
        return valid;
    };
    const onChangeValue = (value) => {
        const valid = validations(value);
        setError(!valid);
        onChange(value, valid)
    };
    const onBlurChange = (value) => {
        const valid = validations(value);
        setError(!valid);
        setTouched(true);
        onBlur && onBlur(value, valid)
    };
    return (
       <InputGroup>
           <InputLabel error={error} touched={touched} htmlFor={id}>{label}</InputLabel>
           <InputWrapper error={error} touched={touched}>
               {PrefixIcon && <InputInfo error={error} touched={touched} ><PrefixIcon /></InputInfo> }

               <InputField  placeholder={placeholder} value={value} id={id} type={type} {...rest} onBlur={e => onBlurChange(e.target.value)} onChange={e => onChangeValue(e.target.value)}/>
                <Icon error={error && touched}>
                    {!error && touched && <FaCheck />}
                    {error && touched && <MdClose onClick={() => onChangeValue("")}/>}
                </Icon>
           </InputWrapper>
           {error && touched && !displayErrorWhenImTrue && <ErrorMessage>{errorMessage}</ErrorMessage>}
           {displayErrorWhenImTrue && <ErrorMessage>{errorMessage}</ErrorMessage>}
       </InputGroup>
    );
};

