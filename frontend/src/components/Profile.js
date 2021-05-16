import React, {useState, useEffect} from "react";
import { getCurrentUser } from "../services/user.service";


import '../styles/register.css';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(async() => {
    const user = await getCurrentUser();

    setCurrentUser(user)
  }, [])

  if(!currentUser){
    return <></>
  }

  return (

    <div className="container">
     
      <header className="jumbotron">
        <h3>
        Twój profil <strong>{currentUser.username}</strong>
        </h3>
      </header>
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p> */}
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Przydzielone Role:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role.name}</li>)}
      </ul>
    </div>
  );
};

export default Profile;