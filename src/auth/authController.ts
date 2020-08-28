import asyncHandler from '../middleware/asyncHandler';
import { IUser } from '../users/userModel';
import { AuthError } from '../common/errors';
import UsersService from '../users/usersService';
import { Request, NextFunction } from 'express';

export default class AuthController {
  constructor(private usersService: UsersService) {}

  login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return next(new AuthError('Invalid credentials'));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new AuthError('Invalid credentials'));
    }
    sendTokenResponse(user, 200, res);
  });

  register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await this.usersService.findOneByEmail(req.body.email);
    if (user) {
      return next(new AuthError('Email already taken!'));
    }

    user = await this.usersService.create(req.body);

    return sendTokenResponse(user, 200, res);
  });
}

const sendTokenResponse = (user: IUser, statusCode: number, res: any) => {
  const token = user.getSignedJwtToken();

  const options = {
    // @ts-ignore
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
    });
};
