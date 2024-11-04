import ClipLoader from 'react-spinners/ClipLoader';
import styles from './Loader.module.css'
import formStyles from './Form.module.css'


const Loader = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="var(--color-brand--2)" size="10rem"/>
        <p className={formStyles.h2}>Loading... please wait</p>
      </div>
    );
  }

  return <>{children}</>; // Render children when loading is false
};

export default Loader;
