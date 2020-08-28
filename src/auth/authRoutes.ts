import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import AuthController from './authController';
import services from '../services';

const router = Router();
const controller = new AuthController(services.usersService);

router.post('/auth/login', loginValidationRules(), validate, controller.login);
router.post('/auth/signup', registrationValidationRules(), validate, controller.register);

function loginValidationRules() {
  return [body('email').isEmail(), body('password').notEmpty()];
}
function registrationValidationRules() {
  return [body('email').isEmail(), body('password').isLength({ min: 5 }), body('name').notEmpty()];
}

function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, message: errors.array() });
  }
  next();
}

export default router;
