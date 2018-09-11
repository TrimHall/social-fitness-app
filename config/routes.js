// BACK END ROUTER
//testing again

const express = require('express');
const Router = express.Router();


// CONTROLLERS
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const exercisePlanController = require('../controllers/exercisePlanController');
const tribeController = require('../controllers/tribeController');
const challengesController = require('../controllers/challengesController');
const feedController = require('../controllers/feedController');

//-------- AUTH ROUTES
Router.route('/login')
  .post(authController.login);
//
Router.route('/register')
  .post(authController.register);

//------- USER ROUTES
Router.route('/users')
  .get(userController.index);

Router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  // .patch(userController.patch)
  .delete(userController.delete);

Router.route('/users/:userId/follow')
  .post(userController.createFollow)
  .put(userController.deleteFollow);

Router.route('/users/:id/grit')
  .post(userController.createGrit);

Router.route('/users/:id/exerciseplan')
  .post(userController.updateExercisePlan);


//------- EXERCISE ROUTES
Router.route('/exerciseplans')
  .get(exercisePlanController.index)
  .post(exercisePlanController.create); // NOTE: also takes care of adopt

Router.route('/exerciseplans/paginate')
  .post(exercisePlanController.paginate);

Router.route('/exerciseplans/:id')
  .get(exercisePlanController.show)
  .put(exercisePlanController.update)
  .patch(exercisePlanController.updateDay)
  .delete(exercisePlanController.delete);

<<<<<<< HEAD

//---------TRIBE ROUTES
=======
// TRIBE ROUTES

>>>>>>> tribe-index-leaders
Router.route('/tribes/:tribeName')
  .get(tribeController.index);

Router.route('/tribes')
  .get(tribeController.index);

<<<<<<< HEAD
//------- FEED ROUTES
Router.route('/feed')
  .post(feedController.create)
  .get(feedController.index);
=======
// CHALLENGES ROUTES

Router.route('/challenges')
  .get(challengesController.index);

// Router.route('/exercise/:id/adopt');

>>>>>>> tribe-index-leaders

Router.route('/feed/:id')
  .get(feedController.show);




module.exports = Router;
