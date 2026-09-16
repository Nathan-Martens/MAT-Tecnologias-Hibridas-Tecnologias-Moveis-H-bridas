const {DataTypes} = require('sequelize');
const { toDefaultValue } = require('sequelize/lib/utils');

module.exports = (sequelize) => {
    return sequelize.define("Tarefa",
        {
            /*id:{
                type: DataTypes.INTEGER, 
                primaryKey: true, 
                autoIncrement: true
            },*/
            titulo:{
                type: DataTypes.STRING(150),
                allowNull: false
            },
            descricao:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            preco:{
                type: DataTypes.DECIMAL(10,2),
                allowNull: true,
                toDefaultValue: 0.00
            },
            status:{
                type: DataTypes.ENUM('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO'),
                allowNull: false,
                toDefaultValue: 'PENDENTE'
            },
           /* data_criacao:{
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            data_atualizacao:{
                type: DataTypes.DATEONLY,
                allowNull: false
            }*/
        },
        {
            tableName: "tarefas",
            timestamps: true
        }
    );
};