import React from 'react';


const Input = ({value, change}) => (

    <input type="text"
           value={value}
           onChange={change}
           className="Input"
    />
);

export default Input;