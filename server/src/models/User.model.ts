import mongoose from 'mongoose';

export interface UserInterface {
  username: string,
  password: string,
  email: string,
  _id: string,
  __v?: number
}

const userSchema: mongoose.Schema<UserInterface> = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

export const UserModel = mongoose.model('User', userSchema);
