import React from 'react';

import classes from './Cockpit.css';
import Aux from '../../hoc/myAux';

const cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }

    if( props.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    if( props.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
<Aux>
        <div className={classes.Cockpit}>
        <h1>{props.appTitle}.</h1>
          <h3 className={assignedClasses.join(' ')}>React is RED HOOOT!</h3>
          <button
          className={btnClass}
          onClick={props.clicked}>Toggle Persons</button>
          <button onClick={props.login}>Log In</button>
        </div>
</Aux>
      );
};

export default cockpit;