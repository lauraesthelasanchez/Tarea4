import repairsModel from './repairs.model.js';

export class RepairsServices {
  static async create(data) {
    return await repairsModel.create(data);
  }
  static async findAll() {
    return await repairsModel.findAll({
      where: {
        status: 'pending',
      },
    });
  }
  static async update(repair) {
    return await repair.update({
      status: 'completed',
    });
  }
  static async delete(repair) {
    return await repair.update({
      status: 'cancelled',
    });
  }
  static async findOneById(id) {
    return await repairsModel.findOne({
      where: {
        id: id,
      },
    });
  }
  static async findOneByIdPending(id) {
    return await repairsModel.findOne({
      where: {
        id: id,
        status: 'pending',
      },
    });
  }
}
