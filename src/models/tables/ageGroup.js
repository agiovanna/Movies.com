const db = require('../connection');

const AgeGroup = db.sequelize.define('tb_age_group', {

    tb_age_group_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    tb_age_group_description: {
        type: db.Sequelize.STRING,
    },
}, { freezeTableName: true});

//AgeGroup.sync({force: true});

module.exports = AgeGroup;