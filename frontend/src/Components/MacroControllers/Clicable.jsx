import React from 'react';

export default (props) => {
  const { children, ...rest } = props;

  return <div {...rest}>{children}</div>;
};
