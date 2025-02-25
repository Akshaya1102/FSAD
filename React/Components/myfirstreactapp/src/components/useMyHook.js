import { useState, useEffect } from "react";

const useMyHook = (username) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
    const fetchData = async () => {
      setLoading(true);

      try {
        
        const response = await fetch(
          `http://localhost:3001/users?name=${username}`
        );
        const responseData = await response.json();
        setUser(responseData);
        setLoading(false);
        console.log(responseData);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  },[username]);

  return {user, loading, error};
}

export default useMyHook;