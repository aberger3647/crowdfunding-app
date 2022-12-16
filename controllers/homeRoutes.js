const router = require('express').Router();
const { Project, User } = require('../models');

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
router.get('/profile', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    res.render('profile', { user });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;