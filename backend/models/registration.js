const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');
const Event = require('./event');

const Registration = sequelize.define('Registration', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event, // References the Event model
            key: 'id',    // References the id field in Event
        },
        onUpdate: 'CASCADE', // Optional: Update behavior
        onDelete: 'CASCADE', // Optional: Delete behavior
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // References the User model
            key: 'id',   // References the id field in User
        },
        onUpdate: 'CASCADE', // Optional: Update behavior
        onDelete: 'CASCADE', // Optional: Delete behavior
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    tableName: 'registrations',
    timestamps: true,
});

module.exports = Registration;

