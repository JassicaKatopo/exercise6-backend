import React from "react";

const Card = ({ email, avatar, fullName }) => {
  return (
    <div className="card mb-3" style={{ width: "18rem " }}>
      <img src={avatar} className="rounded" alt="avatar" />
      <div className="card-body">
        <p className="card-text"><b>Name</b>  : {fullName}</p>
        <p className="card-text"><b>Email</b> : {email}</p>
      </div>
    </div>
  );
};

export default Card;
