import React, { useState } from 'react';
import logger from 'consola';
const log = logger.withScope('ObjectHookDemo');

function ObjectHookDemo() {
    const [obj, setObj] = useState({ id: '1', name: '1' });

    log.start('start');
    log.info('ObjectHookDemo render');
    return (
        <div>
            <h2>id: {obj.id}</h2>
            <h2>name: {obj.name}</h2>
            <button
                onClick={() => {
                    setObj(obj);
                }}
            >
                更新ID
            </button>
        </div>
    );
}

export default ObjectHookDemo;
