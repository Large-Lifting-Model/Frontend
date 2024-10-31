import React, { Component } from 'react';

class TestAPI extends Component {
  // Initializing state in the constructor
  constructor(props) {
    super(props);
    this.state = {
      name: 'World',
    };
  }

  

  // Method to update the state
  changeName = () => {
    this.setState({ name: 'React User' });
  };

  // Render method to output the component's UI
  render() {
    return (
      <div>
        <h1>ThereIsNothingToRender!</h1>
      </div>
    );
  }
}

export default TestAPI;