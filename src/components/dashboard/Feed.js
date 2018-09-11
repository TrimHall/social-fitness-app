import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import NewsFeed from './NewsFeed';
import axios from 'axios';

class Feed extends React.Component {
  state = {
    render: false,
    dotsArr: [],
    timeArr: [],
    userChallenges: []
  }

  componentDidMount() {
    axios.get('/api/challenges')
      .then(res => this.setState({ challenges: res.data },
        () => {
          console.log('challenges are', this.state.challenges);
          this.checkChallenges();
        }));

    this.setState({ exercises: this.props.exercises }, () => {
      // console.log('feed looks like', this.state.exercises);
      this.createDots();
    });

  }

  componentDidUpdate(prevProps) {
    // console.log('prev props is ==>', prevProps.exercises);
    // console.log('state exercises is ==>', this.state.exercises);
    if (prevProps.exercises !== this.props.exercises) {
      // console.log('this.props.exercise is', this.props.exercises);
      this.setState({ exercises: this.props.exercises, dotsArr: [] }, () => {
        this.createDots();
      });
    }
  }

  checkChallenges = () => {
    const myChallenges = this.state.userChallenges;
    this.state.challenges.forEach(challenge => {
      if (challenge.challengers.includes(Auth.currentUserId())) {
        myChallenges.push(challenge);
        this.setState({ userChallenges: myChallenges },
          () => console.log('updated user challenge is', this.state.userChallenges));
      }
    });
  }

  parentUpdate = () => {
    // console.log('feed called');
  }

  createDots = () => {
    const timeArr = [];
    for (let i = 1; i < 8; i++) {
      if(this.state.exercises.day1.exerciseCompleted || !this.state.exercises.day1.exerciseCompleted  ){
        switch(this.state.exercises[`day${i}`].exerciseCompleted) {
          case (null):
            // console.log('grey');
            this.getGrit(this.props.exercises[`day${i}`]);
            this.state.dotsArr.push({color: 'grey', grit: this.getGrit(this.props.exercises[`day${i}`]) });
            break;

          case (true):
            // console.log('green');
            this.getGrit(this.props.exercises[`day${i}`]);
            if (this.props.exercises[`day${i}`].rest === true) {
              this.state.dotsArr.push({color: 'orange', grit: this.getGrit(this.props.exercises[`day${i}`]) });

            } else {
              timeArr.push(this.getCompletedTime(this.props.exercises[`day${i}`]));
              this.state.dotsArr.push({color: 'green', grit: this.getGrit(this.props.exercises[`day${i}`]) });
            }
            // timeArr.push(this.getCompletedTime(this.props.exercises[`day${i}`]));
            // this.state.dotsArr.push({color: 'green', grit: this.getGrit(this.props.exercises[`day${i}`]) });
            break;

          case (false):
            // console.log('red');
            this.getGrit(this.props.exercises[`day${i}`]);
            this.state.dotsArr.push({color: 'red', grit: this.getGrit(this.props.exercises[`day${i}`]) });
            break;
        }
      }
      // if (i === 7) this.forceUpdate();
      if (i === 7) {
        this.setState({ timeArr: this.reduceTimeArr(timeArr) });
      }

    }
  }

  getGrit = (exercise) => {
    return exercise.dailyGrit ? exercise.dailyGrit : null;
  }

  getCompletedTime = (exercise) => {
    return !exercise.rest ? exercise.time : 0;
  }

  reduceTimeArr = (timeArr) => {
    return timeArr.reduce((sum, time) =>{
      return sum + time;
    }, 0);
  }

  render() {
    const {dotsArr} = this.state;
    return(
      <div className="column is-10 container" style={{ height: '100vh', overflow: 'auto'}}>
        <div className="dashFeed">
          <div style={{marginBottom: '15px' }}>
            <h3 className="title is-3">Your Grit: <i className="fas fa-bolt" style={{color: '#363636'}}></i> {this.props.userGrit}</h3>
          </div>

          {this.state.userChallenges.length &&
            <div className="card program-card">
              <div className="card-content">
                <div className="columns is-multiline is-vcentered">
                  <div className="column is-1 is-pulled-left">
                    <h3 className="title is-3"><i className="far fa-plus-square fas"></i></h3>
                  </div>
                  <div className="column is-pulled-left">
                    <h4 className="title is-4 white">Current challenges:</h4>
                    {this.state.userChallenges.map(challenge =>
                      <h5 className="title is-5" key={challenge._id}>{challenge.name}</h5>
                    )}
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="card program-card">
            <div className="card-content">
              <div className="columns is-multiline is-vcentered">
                <div className="column is-1 is-pulled-left">
                  <h3 className="title is-3"><i className="far fa-plus-square fas"></i></h3>
                </div>
                <div className="column is-pulled-left">
                  <Link className="navbar-item" to="/exerciseplan/new">
                    <h4 className="title is-4 white">Create a program</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>


          <div className="card program-card">
            <div className="card-content">
              <div className="columns is-multiline is-vcentered">
                <div className="column is-1 is-pulled-left">
                  <h3 className="title is-3"><i className="far fa-plus-square fas"></i></h3>
                </div>
                <div className="column is-pulled-left">
                  <Link
                    className="navbar-item"
                    to={ {
                      pathname: `/profile/${Auth.currentUserId()}`,
                      hash: '#history'
                    } }>

                    <h4 className="title is-4 white">View your history</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>


          <div className="card program-card-unlogged">
            <div className="card-content">
              <h4 className="title is-4 white">This week</h4>
              <div className="columns">
                { dotsArr.length === 7 && dotsArr.map((dot, i) =>
                  <div className="column is-1 has-text-centered" key={i}>
                    <i className={`animated infinite swing title is-4 fas fa-circle dot-${dotsArr[i].color}`} key={i}></i>
                    <h5 className="subtitle is-5 white animated infinite swing"><i className="fas fa-bolt animated infinite swing"></i> {dotsArr[i].grit}</h5>
                  </div>
                )
                }
              </div>
              <h4 className="title is-5 white">Time spent working out: {this.state.timeArr && this.state.timeArr} mins</h4>
              <h4 className="title is-5 white">Predicted average per day: {this.state.exercises && this.state.exercises.workoutTimeAvg} mins</h4>
            </div>
          </div>

          <section className='container'>
            <NewsFeed />
          </section>


        </div>
      </div>

    );
  }
}

export default Feed;
