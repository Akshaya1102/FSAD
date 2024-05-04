import useMyHook from "./useMyHook";

const User = ({ username }) => {
 
  const {user, loading, error} = useMyHook(username);
  console.log(user, loading, error);
  console.log(typeof(user), user);
  
  return (
    <div>
      {loading && <p>Loading...</p> }
      {error && <p>{error.message}</p>}
    
      {
      user && (
        <ul >
          <li>
            <img src={user[0].avatar_url} alt={user[0].name}/>
          </li>
          <li>
            Name: {user[0].name}
          </li>          
          <li>
           Location:{user[0].location ? user[0].location : "NA"}
          </li>          
          <li>
            skill: {user[0].skill}
          </li>
        </ul>
      )}
    </div>
  );
};
export default User;