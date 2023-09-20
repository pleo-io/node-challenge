import UserModel from '../models/userModel';

export function readUser(userId) {
  return UserModel.findOne({ where: { id: userId } });
}
