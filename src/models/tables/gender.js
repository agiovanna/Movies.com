const db = require('../connection');

const Gender = db.sequelize.define('tb_gender', {

    tb_gender_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    tb_gender_name: {
        type: db.Sequelize.TEXT,
    },
}, { freezeTableName: true});

//Gender.sync({force: true})

module.exports = Gender;