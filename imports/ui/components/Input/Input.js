import React from 'react';

const Input = ({value, change , placeholder}) => (

    <input type="text"
           value={value}
           onChange={change}
           placeholder={placeholder}
    />
);

export default Input;