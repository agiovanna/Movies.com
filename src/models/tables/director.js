const db = require('../connection');

const Director = db.sequelize.define('tb_director', {

    tb_director_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    tb_director_name: {
        type: db.Sequelize.TEXT,
    },
},  { freezeTableName: true});

//Director.sync({force: true})

module.exports = Director;