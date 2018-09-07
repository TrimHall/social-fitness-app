import React from 'react';
import axios from 'axios';
import _ from 'lodash';



class TribeAside extends React.Component {
  state = {
    tribeName: 'Gargantuans' // need to figure out a way to dynamically update
  }

  componentDidMount() {
    console.log('TribeAside Component Mounted');
    axios.get(`/api/tribes/${this.state.tribeName}`)
      .then(res => this.setState({ members: res.data} ));
  }

  leadersSort = () => {
    const leaders = this.state.members;
    console.log('Tribe members sorted by grit is', _.orderBy(leaders, ['grit', 'username'], 'desc'));
    return _.orderBy(leaders, ['grit', 'username'], 'desc');
  }


  render() {
    return (
      <div className="columns">
        <div className="column is-4" style={{ backgroundColor: 'green', height: '100vh' }}>
          <div className="dashAsideFollowers" style={{ backgroundColor: 'white', height: '20vh', marginTop: '10px'}}>
            <p>YOUR TRIBE</p>
            {this.state.members && <p>{this.state.tribeName} has {this.state.members.length} members</p>}
          </div>
          <div className="dashAsideLeaders" style={{ backgroundColor: 'white', height: '40vh', marginTop: '10px'}}>
            <p>LEADER BOARD</p>
            {this.state.members && this.leadersSort().slice(0, 10).map(leader =>
              <div key={leader._id}>
                {leader.username}
              </div>
            )}
          </div>
          <div className="dashAsidePrograms" style={{ backgroundColor: 'white', height: '30vh', marginTop: '10px'}}>
            <p>ADOPTED PROGRAMMES</p>
          </div>
        </div>
        <div className="column is-8">
          <div className="columns is-multiline">
            <div className="column is-half" style={{ backgroundColor: 'red', height: '50vh', width: '50%'}}>this is a div</div>
            <div className="column is-half" style={{ backgroundColor: 'yellow', height: '50vh', width: '50%'}}>this is a div</div>
            <div className="column is-half" style={{ backgroundColor: 'blue', height: '50vh', width: '50%'}}>this is a div</div>
            <div className="column is-half" style={{ backgroundColor: 'black', height: '50vh', width: '50%'}}>this is a div</div>
          </div>
        </div>
      </div>
    );
  }
}


export default TribeAside;
