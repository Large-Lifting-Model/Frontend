import { useState, useCallback } from "react";

const useLoader = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const withLoader = useCallback( async (asyncFunction) => {
		setIsLoading(true)
		try {
			await asyncFunction()
		} catch (e) {
			console.error(e.message)
			setError(e)
		}
		setIsLoading(false)
	  }, []);
  
	return {
		error,
		isLoading,
		withLoader,
	};
  };
  
  export default useLoader;