import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/myAux';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);


class App extends PureComponent {
  constructor(props){
    super(props);
    console.log('[App.js] INside Constructor');
    //old way of initializing state inside the constructor
    this.state = {
      persons: [
        { id: '12', name: 'Richard', age: 49 }, 
        { id: '31', name: 'Marivic', age: 46 },
        { id: '1231', name: 'Anna', age: 11 }
      ],
      otherState: 'other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log('[App.js] Inside getDerivedStateFromProps',
    nextProps, 
    prevState
  );
  return prevState;
  }

  getSnapshotBeforeUpdate(){
    console.log('[App.js] Inside getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(){
    console.log('[App.js] Inside componentDidUpdate');
  }

  // componentWillMount(){
  //   console.log('[App.js] Inside ComponentWillMount')
  // }

  componentDidMount(){
    console.log('[App.js] Inside ComponentDidMount')
  }

  // componentWillReceiveProps(){
  //   console.log('[App.js] Inside ComponentWillRecieve');
  // }

  //SAME as PureComponent.. use only if updates is required often
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[Update: App.js] Inside shouldComponentUpdate');
  //   return nextState.persons !==this.state.persons ||
  //       nextState.showPersons !== this.state.showPersons;
  // }

  //new way of initializing state 
  //state = {
  //   persons: [
  //     { id: '12', name: 'Richard', age: 49 }, 
  //     { id: '1231', name: 'Anna', age: 11 },
  //     { id: '543', name: 'Levi', age: 16 }
  //   ],
  //   otherState: 'other value',
  //   showPersons: false
  // };

  usernameChangeHandler = ( event ) => {
    this.setState({
      username: event.target.value
    });
  }

   nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    //using spread instead to prevent mutation
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => { 
      return {
        showPersons: !doesShow,  
        toggleClicked: prevState.toggleClicked + 1 
      }
    } );
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js]Inside Render')
    let persons = null;

    if(this.state.showPersons){
      persons = <Persons 
          persons ={this.state.persons} 
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}  />;
    }

     return (

        <Aux>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Person</button>
        <Cockpit 
        appTitle={this.props.title} 
        showPersons={this.state.showPersons} 
        persons={this.state.persons} 
        login={this.loginHandler} 
        clicked={this.togglePersonsHandler} />
        <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
