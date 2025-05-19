const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Tenant = require('./tenant'); // Import the Tenant model

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
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
    tableName: 'events',
    timestamps: true,
});

module.exports = Event;

