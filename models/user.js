const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model
{
  static init(sequelize)
  {
    return super.init({

    email : {
      type : Sequelize.STRING(40),
      allowNull : false
    },
    nick : {
      type : Sequelize.STRING(30),
      allowNull : false
    },
    password : {
      type : Sequelize.STRING(100),
      allowNull : true
    },
    snsId : {
      type : Sequelize.STRING(100),
      allowNull : true
    },
    provider : {
      type : Sequelize.STRING(20),
      allowNull : false,
      defaultValue : 'local'
    }

    },{
      sequelize,
      timestamps : true,
      underscored : false,
      paranoid : true,
      modelName : 'User',
      tableName : 'users',
      charset : 'utf8',
      collate : 'utf8_general_ci'
    })

  }

  static associate(db)
  {

  }
}