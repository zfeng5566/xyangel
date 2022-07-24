import React from 'react';
import cn from 'classnames';

import styles from './header.module.scss';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
    return (
        <div className={cn(styles['container'], 'text-zinc-900 bg-white')}>
            <div className="flex align-middle justify-between items-center h-full pl-10 pr-10">
                <h1>Welcome to Header!</h1>

                <div className={styles['avator-box']}>
                    <div className={styles['avator']}>
                        <img
                            src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-1.jpg"
                            alt=""
                        />
                    </div>
                    <span className="text-slate-600 hover:text-slate-900 ml-2">
                        千仞雪
                    </span>
                </div>
            </div>
        </div>
    );
}
