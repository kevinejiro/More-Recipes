import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models';


const {
  User,
  Recipe
} = db;

const userCtrl = {
  /**
   *@returns {Object} user
   * @param {*} req
   * @param {*} res
   */
  createUser(req, res) {
    console.log('creating user------>>>>>');
    const username = req.body.username ? req.body.username.trim() : '';
    const email = req.body.email ? req.body.email.trim() : '';
    const password = req.body.password ? req.body.password.trim() : '';
    const passwordConfirmation = req.body.passwordConfirmation ?
      req.body.passwordConfirmation.trim() : '';

    // checking for valid input data using regex
    const EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    const USERNAME_REGEXP = /^(\w){4,15}$/;

    let errMsg;

    if (username === '') {
      errMsg = 'Username is required';
    } else if (email === '') {
      errMsg = 'Email is required';
    } else if (!USERNAME_REGEXP.test(username)) {
      errMsg = `Username must be between 4 and 
      15 characters long, with no space between characters`;
    } else if (email.length <= 7 ||
      email.length > 30 ||
      !EMAIL_REGEXP.test(email)) {
      errMsg = 'invalid email address';
    } else if (password === '') {
      errMsg = 'Password is required';
    } else if (password.length < 7) {
      errMsg = 'Password must be at least 7 characters long';
    } else if (passwordConfirmation !== password) {
      errMsg = 'Password is\'nt the same as above';
    }
    if (errMsg) {
      return res.status(400)
        .json({
          success: false,
          message: errMsg
        });
    }

    return User
      .create({
        username,
        email,
        password: bcryptjs.hashSync(password, 10),
        fullname: req.body.fullname
      })
      .then((user) => {
        const token = jwt.sign({
            user
          },
          process.env.SECRET_KEY, {
            // expiresIn: '60m'
          }
        );
        res.status(201).json({
          success: true,
          message: 'Account created successfully',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
          token
        });
      })
      .catch(err => res.status(400).json({
        status: 'fail',
        message: err.errors[0].message
      }));
  },
  /**
   *@returns {Object} user
   * @param {*} req
   * @param {*} res
   */
  signIn(req, res) {
    const username = req.body.username ? req.body.username.trim() : '';
    const {
      password
    } = req.body;

    if (!(username && password)) {
      return res.status(400)
        .json({
          success: false,
          message: 'username and password are required'
        });
    }

    return User
      .findOne({
        where: {
          username: req.body.username,
        }
      })
      .then((user) => {
        const token = jwt.sign({
          user
        }, process.env.SECRET_KEY, {
          // expiresIn: '60m'
        });
        bcryptjs.compare(password, user.password).then((check) => {
          if (check) {
            res.status(200).json({
              status: 'pass',
              message: 'Log in was successful',
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
              },
              token
            });
          } else {
            res.status(401).json({
              status: 'fail',
              message: 'Username or password incorrect'
            });
          }
        }).catch(err => res.status(400).json({
          success: false,
          message: err.errors[0].message
        }));
      });
  },
  /**
   * @returns {Object} recipes
   * @param {*} req
   * @param {*} res
   */
  getUserRecipes(req, res) {
    const {
      userId
    } = req.params;
    Recipe
      .findAll({
        where: {
          userId
        }
      })
      .then((recipes) => {
        const recipesCount = recipes.length;
        if (recipesCount === 0) {
          return res.status(200).json({
            status: 'pass',
            message: 'User has not posted any recipes',
          });
        }
        return res.status(200).json({
          success: true,
          message: `${recipesCount} recipes posted`,
          recipes
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Something went wrong '
      }));
  }
};

export default userCtrl;
