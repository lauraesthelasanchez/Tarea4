import usersModel from './users.model.js';

export class UsersServices {
  static async create(data) {
    return await usersModel.create(data);
  }
  static async findAll() {
    return await usersModel.findAll({
      attributes: {
        exclude: [
          'password',
          'passwordChangedAt',
          'createdAt',
          'updatedAt',
          'status',
        ],
      }, // entrega datos excluyendo informacion.parseEnglish()
      where: {
        status: 'available',
      },
    });
  }
  static async update(user, data) {
    return await user.update(data);
  }
  static async delete(user) {
    return await user.update({
      status: 'disabled',
    });
  }
  static async findOneById(id) {
    return await usersModel.findOne({
      where: {
        id: id,
        status: 'available',
      },
    });
  }
  static async findOneByEmail(email) {
    return await usersModel.findOne({
      where: {
        email: email,
        status: 'available',
      },
    });
  }
}
