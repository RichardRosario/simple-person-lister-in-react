import React from 'react';

const userOutput = props => {
  return (
    <div className="userOutput">
      <p>Username: {props.userName} </p>
      <p>Another output from the user!</p>
    </div>
  );
};

export default userOutput;
