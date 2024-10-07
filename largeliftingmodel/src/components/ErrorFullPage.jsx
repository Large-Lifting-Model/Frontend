import LLMError from "./LLMError";
import styles from "./ErrorFullPage.module.css";

const ErrorFullPage = ({ errormsg }) => {
  return (
    <div className={styles.errorFullPage}>
      <LLMError errormsg = {errormsg}/>
    </div>
  );
}

export default ErrorFullPage;
