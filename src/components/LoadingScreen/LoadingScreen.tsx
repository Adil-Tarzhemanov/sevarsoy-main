import React from 'react';
import styles from './styles.module.scss'

const LoadingScreen = () => {
    return (
        <div className={styles.loadingScreen}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingScreen;