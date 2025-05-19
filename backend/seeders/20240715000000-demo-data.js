'use strict';

const bcrypt = require('bcrypt');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Import models directly
      const { Tenant, User, Event, Registration } = require('../models');

      // 1. Create Tenants
      const tenants = await Tenant.bulkCreate([
        { name: 'Tenant A', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Tenant B', createdAt: new Date(), updatedAt: new Date() },
      ]);

      // 2. Create Users
      const hashedPassword = await bcrypt.hash('password123', 10);
      const users = await User.bulkCreate([
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password_hash: hashedPassword,
          role: 'user',
          tenant_id: tenants[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          password_hash: hashedPassword,
          role: 'user',
          tenant_id: tenants[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password_hash: hashedPassword,
          role: 'admin',
          tenant_id: tenants[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      // 3. Create Events
      const events = await Event.bulkCreate([
        {
          title: 'Event A',
          description: 'Description for Event A',
          start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          end_time: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),   // 8 days from now
          capacity: 100,
          price: 25.00,
          tenant_id: tenants[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Event B',
          description: 'Description for Event B',
          start_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
          end_time: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),   // 15 days from now
          capacity: 50,
          price: 0.00,
          tenant_id: tenants[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      // 4. Create Registrations
      await Registration.bulkCreate([
        {
          event_id: events[0].id,
          user_id: users[0].id,
          status: 'confirmed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          event_id: events[1].id,
          user_id: users[1].id,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

    } catch (error) {
      console.error('Error during up migration:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Remove all the data in reverse order of insertion
      await queryInterface.bulkDelete('registrations', {}, { truncate: true, cascade: true });
      await queryInterface.bulkDelete('events', {}, { truncate: true, cascade: true });
      await queryInterface.bulkDelete('users', {}, { truncate: true, cascade: true });
      await queryInterface.bulkDelete('tenants', {}, { truncate: true, cascade: true });
    } catch (error) {
      console.error('Error during down migration:', error);
      throw error;
    }
  },
};

