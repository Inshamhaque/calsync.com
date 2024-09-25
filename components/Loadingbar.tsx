// components/LoadingBar.tsx
import React from 'react';
import styles from './LoadingBar.module.css'; // Create this CSS module

interface LoadingBarProps {
  isLoading: boolean;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  return (
    <div className={`${styles.loadingBar} ${isLoading ? styles.active : ''}`} />
  );
};

export default LoadingBar;
