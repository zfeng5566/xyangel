import React from 'react';
import { BaseContext } from './context';

function Header() {
    const { count } = React.useContext(BaseContext);
    console.log('Header render');
    return <div>{count}</div>;
}

export default Header;
