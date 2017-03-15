import React from 'react';

const Head = (props) => {
  return (
    <head>
      <title>{props.title}</title>
    </head>
  );
}

// Specifies the default values for props:
Head.defaultProps = {
  title: 'Fame and Partners'
};

export default Head;
