import React from 'react';
import {IoMdCog, MdEmail} from 'react-icons/all';
import PropTypes from 'prop-types';
import {InputText} from '../MacroControllers/input-text.component';
import {FileInput} from "../MacroControllers/file-input.component";
import {CkEditorComponent} from "../MacroControllers/ckeditor";

const CreatePostFieldsComponent = ({
                                       errors,
                                       touched,
                                       values,
                                       handleChange,
                                       handleBlur,
                                       setFieldValue,
                                       setTouched
                                   }) => (
    <>
        <InputText
            PrefixIcon={MdEmail}
            errorMessage={errors.subject}
            error={Boolean(errors.subject)}
            touched={touched.subject}
            label="Subject"
            value={values.subject}
            name="subject"
            resetField={() => setFieldValue('subject', '')}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        <InputText
            PrefixIcon={IoMdCog}
            errorMessage={errors.tags}
            error={Boolean(errors.tags)}
            touched={touched.tags}
            label="Tags"
            value={values.tags}
            name="tags"
            resetField={() => setFieldValue('tags', '')}
            placeholder={'sport, music, dance'}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        <CkEditorComponent
            PrefixIcon={MdEmail}
            errorMessage={errors.body}
            error={Boolean(errors.body)}
            touched={touched.body}
            label="Body"
            value={values.body}
            name="body"
            onChange={(data) => {
                setFieldValue('body', data)
            }}
            onBlur={(data) => {
                setFieldValue('body', data);
                setTouched({...touched, body: true});
            }}
        />
        <FileInput
            label={'Thumbnail'}
            onChange={(file) => setFieldValue('thumbnail', file)}
            value={values.avatar}
        />
    </>
);
CreatePostFieldsComponent.defaultProps = {
    errors: {},
    touched: {},
};
CreatePostFieldsComponent.propTypes = {
    errors: PropTypes.object,
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    touched: PropTypes.object,
};
export default CreatePostFieldsComponent;
