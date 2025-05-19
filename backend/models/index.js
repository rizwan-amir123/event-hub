const sequelize = require('../utils/db');
const Tenant = require('./tenant');
const User = require('./user');
const Event = require('./event');
const Registration = require('./registration');

// Set up associations
Tenant.hasMany(User, { foreignKey: 'tenant_id', as: 'users' });
User.belongsTo(Tenant, { foreignKey: 'tenant_id', as: 'tenant' });

Tenant.hasMany(Event, { foreignKey: 'tenant_id', as: 'events' });
Event.belongsTo(Tenant, { foreignKey: 'tenant_id', as: 'tenant' });

User.hasMany(Registration, { foreignKey: 'user_id', as: 'registrations' });
Event.hasMany(Registration, { foreignKey: 'event_id', as: 'registrations' });
Registration.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Registration.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

module.exports = {
    sequelize,
    Tenant,
    User,
    Event,
    Registration,
};

