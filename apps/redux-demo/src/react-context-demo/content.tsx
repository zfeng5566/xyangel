import React from 'react';
import { BaseContext } from './context';

function Content() {
    const { content, setContent } = React.useContext(BaseContext);
    console.log('Content render');
    return (
        <div>
            <div>{content}</div>
            <button
                onClick={() => {
                    setContent(content + '1');
                }}
            >
                content udpated
            </button>
        </div>
    );
}

export default Content;
