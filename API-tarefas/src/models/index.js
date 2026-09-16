require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: true
    }
);
const ResponsavelModel = require("./Responsavel");
const TarefaModel = require ("./Tarefa");

const Responsavel = ResponsavelModel(sequelize);
const Tarefa = TarefaModel(sequelize);

Responsavel.hasMany(Tarefa,{
    foreignKey: 'id_responsavel',
    as: 'tarefas'
});

Tarefa.belongsTo(Responsavel,{
    foreignKey: 'id_responsavel',
    as: 'responsavel'
})

module.exports={
    sequelize,
    Responsavel,
    Tarefa
}