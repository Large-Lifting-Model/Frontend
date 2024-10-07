import styles from "./LLMError.module.css";

const LLMError = ({ errormsg }) => {
  return (
    <div className={styles.llmErrorContainer}>
      <div className = {styles.errormsg}>
        <h2> Sorry, there was an error </h2>
        <h3>{errormsg}</h3>
      </div>
    </div>
  );
}

export default LLMError;
