import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findUserById} from "../services/user-service";
import {logoutThunk} from "../thunks/auth-thunks";
import UserList from "../profile/user-list";
import "../profile/profile.css"

function OtherProfile() {
  const {id} = useParams();
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    const response = await findUserById(id);
    setUser(response);
  }
    useEffect(() => {
    fetchUser().then(r => console.log(r));
    } , []);
    return (
        <div className="container">
          <h2>Profile</h2>
          <div className="row">
            <div className="col-md-6">
              <h3>Personal Information</h3>
              {user && (
                  <div className="profile-container my-4">
                    <div className="row">
                      <div className="col-md-4">
                        {user.profilePhoto && (
                            <img src={user.profilePhoto} alt={`${user.firstName} ${user.lastName}`} className="profile-image" />
                        )}
                      </div>
                      <div className="col-md-8">
                        <h2>{`${user.firstName} ${user.lastName}`}</h2>
                        <p className="profile-username"><i className="fas fa-user mr-2"></i>{user.username}</p>
                        <p className="profile-role"><i className="fas fa-user-tag mr-2"></i>{user.role}</p>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
  );
}

export default OtherProfile;