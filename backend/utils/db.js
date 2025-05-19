// backend/utils/db.js
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();
// Option 1:  Database URL (for production/cloud databases)
// const sequelize = new Sequelize(process.env.DATABASE_URL);

// Option 2:  Connecting to a local database (SQLite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, process.env.DB_STORAGE), // Store in the project root
    logging: false, // Disable logging; set to console.log to see SQL queries
});

// Option 3: For in-memory databases (for testing - data is lost on server restart)
// const sequelize = new Sequelize('sqlite::memory:');

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
        //  No need to define tables here.  They should be defined in separate model files.
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();

module.exports = sequelize;

