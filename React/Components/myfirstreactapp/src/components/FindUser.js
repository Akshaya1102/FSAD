import { useState } from "react";
import User from "./User";

const FindUser = () => {
  const [userName, setUserName] = useState("");
  const [isShown, setIsShown] = useState(false);

  const handleClick = (e) => {
       setIsShown(true);   
       e.preventDefault();
  };

  return (
    <div className="find-user">
      <h1>Find User</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username"></label>
         
          <input
            type="text"
            id="idname"
            placeholder="Enter username"
            onChange={(event) => setUserName(event.target.value)}
          />
           <button onClick={handleClick}>View </button>
        </div>
      </form>

      <div className="result">
        {isShown ? 
          <User username={userName} /> : 
          <p>enter a name to search</p>
        }
      </div>
    </div>
  );
};

export default FindUser;