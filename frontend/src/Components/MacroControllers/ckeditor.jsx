import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    ErrorMessage,
    InputGroup,
    InputLabel,
} from './macro.styles';

const CkEditorComponent = ({
                               touched,
                               name,
                               label,
                               onChange,
                               value,
                               error,
                               errorMessage,
                               onBlur,
                       ...rest
                   }) => {
    const id = uuid();
    return (
        <InputGroup>
            <InputLabel error={error} touched={touched} htmlFor={id}>
                {label}
            </InputLabel>
            <CKEditor
                {...rest}
                editor={ ClassicEditor }
                data={value}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    onChange(data);
                } }
                onBlur={ ( event, editor ) => {
                    const data = editor.getData();
                    onBlur(data);
                } }
            />
            {error && touched && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
            )}
        </InputGroup>
    );
};

CkEditorComponent.defaultProps = {
    error: false,
    errorMessage: '',
    onBlur: () => {},
    touched: false,
};

CkEditorComponent.propTypes = {

    touched: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    onBlur: PropTypes.func,
};

export { CkEditorComponent };
