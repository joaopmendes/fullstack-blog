import React, {useEffect, useState} from 'react';
import styled, {keyframes} from "styled-components";
import {MdFileUpload, MdClose} from "react-icons/md"
import uuid from "uuid";
import {FaCheck} from "react-icons/fa";
import {ErrorMessage, Icon, InputField, InputGroup, InputInfo, InputLabel, InputWrapper} from "./macro.styles";

export const FileInput = ({label, placeholder, value, displayErrorWhenImTrue,onChange, ...rest}) => {
    const PrefixIcon = MdFileUpload;
    const [error, setError] = useState(false);
    const [touched, setTouched] = useState(false);

    const [imagePreviewError, setImagePreviewError] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    const [id, setId] = useState();
    useEffect(() => {
        setId(uuid());
    }, []);
    const onChangeFile = (e) => {
        if(e) {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];
            if(file) {
                reader.onloadend = () => {
                    const imgPreview = reader.result;
                    if(!imgPreview) {
                        setImagePreviewError(true)
                    } else {
                        setImagePreviewError(false);
                    }
                    setImagePreview(imgPreview);
                    onChange(file, true);
                    setTouched(true);
                    setError(false)
                };
            } else {
                setError(true)
            }

            reader.readAsDataURL(file);
        } else {
            onChange(null, false);
        }

    };
    return (
        <ImagePreviewWrapper>
            <ImagePreviewImg src={imagePreview} />
            <InputGroup>
                <InputLabel error={error} touched={touched} htmlFor={id}>{label}</InputLabel>
                <InputWrapper error={error} touched={touched}>
                    {PrefixIcon && <InputInfo error={error} touched={touched}><PrefixIcon/></InputInfo>}
                    <WrapperInputField text={value && value.name}>
                        <InputField opacity={"0"}  placeholder={placeholder} id={id} onChange={onChangeFile}
                                                                          type={"file"} {...rest}/>
                    </WrapperInputField>
                    <Icon error={error && touched}>
                        {!error && touched && <FaCheck/>}
                        {error && touched && <MdClose onClick={() => onChangeFile()}/>}
                    </Icon>
                </InputWrapper>
                {error  && touched && !displayErrorWhenImTrue && <ErrorMessage>{"Something went wrong with the upload"}</ErrorMessage>}
                {imagePreviewError  && touched && <ErrorMessage>{"No Image Preview could be loaded"}</ErrorMessage>}
                {displayErrorWhenImTrue && <ErrorMessage>{"No Image Preview could be loaded"}</ErrorMessage>}
            </InputGroup>
        </ImagePreviewWrapper>

    );
};
const ImagePreviewImg = styled.img`
  max-width: 120px;
  height: 120px;
`
const ImagePreviewWrapper = styled.div`
  display: flex;
  align-items: center;
`
const WrapperInputField = styled.div`
  width: 100%;
  background-color: white;
  
  &:before {
    content: "${props => props.text || ""}";
    color: black;
    position: absolute;
    top: 5px;
  }
`;
