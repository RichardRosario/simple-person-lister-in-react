import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {
    constructor(props){
        super(props);
        console.log('[Persons.js] INside Constructor');
        this.lastPersonRef = React.createRef();
      }
    
      componentWillMount(){
        console.log('[Persons.js] Inside ComponentWillMount');
      }
    
      componentDidMount(){
        console.log('[Persons.js] Inside ComponentDidMount');
        this.lastPersonRef.current.focus();
      }

      componentWillReceiveProps(){
        console.log('[Persons.js] Inside ComponentWillRecieve');
      }

      shouldComponentUpdate(nextProps, nextState){
        console.log('[Update: Persons.js] Inside shouldComponentUpdate');
        return nextProps.persons !==this.props.persons ||
            nextProps.changed !== this.props.changed || 
            nextProps.clicked !== this.props.clicked;
      }

    render () {
        console.log('[PErsons.js] Inside Persons Render')
        return this.props.persons.map( (person, index) =>{
            return <Person 
                click={() => this.props.clicked(index)} 
                name={person.name} 
                age={person.age} 
                ref={this.lastPersonRef} 
                position={index} 
                key={person.id}  
                changed={(event) => this.props.changed(event, person.id)} />
           
          });
    }
} 

export default Persons;