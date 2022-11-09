import styles from './demo.module.scss';

/* eslint-disable-next-line */
export interface DemoProps {}

export function Demo(props: DemoProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to Demo!</h1>
        </div>
    );
}

export default Demo;
