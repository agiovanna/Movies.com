const db = require('../connection');

const User = db.sequelize.define('tb_user', {
    tb_user_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    tb_user_name: {
        type: db.Sequelize.TEXT,
    },

    tb_user_email: {
        type: db.Sequelize.TEXT,
    },

    tb_user_password: {
        type: db.Sequelize.TEXT,
    }, 
}, { freezeTableName: true});

//User.sync({force: true})

module.exports = User;
