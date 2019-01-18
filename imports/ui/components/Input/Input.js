import React from 'react';


const Input = ({value, change}) => (

    <input type="text"
           value={value}
           onChange={change}
    />
);

export default Input;