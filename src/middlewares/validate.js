import { check } from 'express-validator/check';

/**
 * [validate description]
 * @type {Object}
 */
const validate = {
  register: [
    check('fullname')
      .not().isEmpty({ ignore_whitespace: false })
      .withMessage('Please provide your fullname'),
    check('email')
      .not().isEmpty({ ignore_whitespace: false })
      .withMessage('Please provide a valid email address'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password cannot be shorter than 8 charaters')
  ],
  login: [
    check('email')
      .isEmail()
      .withMessage('Please provide a valid email address'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password cannot be shorter than 8 charaters')
  ],
  create: [
    check('firstName')
      .not().isEmpty({ ignore_whitespace: false })
      .withMessage('Please provide your contact firs tname'),
    check('lastName')
      .not().isEmpty({ ignore_whitespace: false })
      .withMessage('Please provide your contact las tname'),
    check('phoneNumber')
      .not().isEmpty({ ignore_whitespace: false })
      .withMessage('Please enter a valid phone Number')
  ],
  update: [
    check('firstName')
      .not().isEmpty({ ignore_whitespace: false })
      .withMessage('First name should not be empty'),
    check('lastName')
      .not().isEmpty({ ignore_whitespace: false })
      .withMessage('Last name should not be empty'),
    check('phoneNumber')
      .not().isEmpty({ ignore_whitespace: false })
      .withMessage('Phone Number should not be empty')
  ]
};

export default validate;
