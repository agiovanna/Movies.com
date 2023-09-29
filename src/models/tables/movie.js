const db = require('../connection');

const Movie = db.sequelize.define('tb_movie', {

    tb_movie_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    tb_movie_name: {
        type: db.Sequelize.TEXT,
    },

    tb_movie_year: {
        type: db.Sequelize.DATEONLY,
    },

    tb_movie_summary: {
        type: db.Sequelize.TEXT,
    },

    fk_gender: {
        type: db.Sequelize.INTEGER,
        references: { model: 'tb_gender', key: 'tb_gender_id'},
    },

    fk_age_group: {
        type: db.Sequelize.INTEGER,
        references: { model: 'tb_age_group', key: 'tb_age_group_id'},
    },

    fk_director: {
        type: db.Sequelize.INTEGER,
        references: { model: 'tb_director', key: 'tb_director_id'},
    },

}, { freezeTableName: true});

//Movie.sync({force: true});

module.exports = Movie;