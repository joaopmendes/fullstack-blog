import React from 'react';
import PropTypes from 'prop-types';

const CardWrapperHeaderComponent = ({title, message}) => {
    return (
        <>
            <h2 className="h1-responsive font-weight-bold text-center my-5">
                {title}
            </h2>
            {message && <p>{message}</p>}
        </>
    );
};
CardWrapperHeaderComponent.defaultProps = {
    message: ""
};
CardWrapperHeaderComponent.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string
};

export default CardWrapperHeaderComponent;
