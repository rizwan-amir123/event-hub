const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // Import your Sequelize connection
const Tenant = require('./tenant');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'), // Use ENUM for roles
        allowNull: false,
        defaultValue: 'user',
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tenant, // References the Tenant model
            key: 'id',     // References the id field in Tenant
        },
        onUpdate: 'CASCADE', // Optional: Update behavior
        onDelete: 'CASCADE', // Optional: Delete behavior
    },
}, {
    tableName: 'users', // Specify the table name explicitly
    timestamps: true,       // Add createdAt and updatedAt columns
});

module.exports = User;
