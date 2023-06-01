import { Schema,model, Query , Document } from "mongoose";
import validator from 'validator';
import {hash,compare} from 'bcrypt';
import * as crypto from "crypto";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;
    passwordChangedAt: Date;
    passwordResetToken: String | undefined;
    passwordResetExpires: Date | undefined;
    active: boolean;

    comparePassword(inputPassword:string,userPassword:string):Promise<boolean> ;
    changePasswordAfter(JWTTimeStamp: number): boolean;
    createResetToken():string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'User must have a name'],
      },
      email: {
        type: String,
        required: [true, 'User must have email'],
        unique: true,
      },
      password: {
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8,
        select: false,
      },
      passwordConfirm: {
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8,
        select: false,
        validate: {
          validator : function (this: IUser, el:string) {
            return validator.equals(el,this.password);
          },
          message: 'Password and PasswordConfirm do not match',
        },
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
      active: {
        type: Boolean,
        default: true,
        select: false,
      },
})

userSchema.pre<Query<IUser,IUser>>(/^find/, function (next) {
    this.select('-__v');
    this.select('-passwordChangedAt');
    this.select('-passwordResetToken')
    this.select('-passwordResetExpires')
    next();
  });
userSchema.pre<Query<IUser,IUser>>(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
  });
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password, 12);
    this.passwordConfirm = '';
    next();
  });
  
userSchema.pre<IUser>('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
  });
userSchema.methods.comparePassword = async function (
    inputPassword:string,
    userPassword:string
  ): Promise<boolean> {
    return await compare(inputPassword, userPassword);
  };
userSchema.methods.changePasswordAfter = function (JWTTimeStamp: number) {
    if (this.passwordChangedAt) {
      const changeTimeStamp = this.passwordChangedAt.getTime() / 1000;
      return JWTTimeStamp < changeTimeStamp;
    }
    return false;
  };
userSchema.methods.createResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  
    console.log({resetToken},this.passwordResetToken);
    return resetToken;
  };

export const User = model<IUser>('User',userSchema);