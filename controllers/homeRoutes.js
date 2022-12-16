const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// get all projects
router.get('/', async (req, res) => {
    try {
      const allProjects = await Project.findAll( { include: [ { model: User }]});
      const projects = allProjects.map((project) =>
      project.get({ plain: true }));
      res.render('homepage', { projects })
    } catch (err) {
      res.status(400).json(err);
    }
  })

// get profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
       include: [{ model: Project }]
    });
    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', { ...user, loggedIn: true });

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   // req.session.logged_in = true;
    // });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;