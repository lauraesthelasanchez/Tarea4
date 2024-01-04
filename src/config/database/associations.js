import usersModel from '../../modules/users/users.model.js';
import repairsModel from '../../modules/repairs/repairs.model.js';

export const initModel = () => {
  usersModel.hasMany(repairsModel, { foreignKey: 'userId' });
  repairsModel.belongsTo(usersModel, { foreignKey: 'userId' });
};
