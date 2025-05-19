const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');

const Tenant = sequelize.define('Tenant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'tenants',
    timestamps: true,
});

module.exports = Tenant;
