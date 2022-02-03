'use strict';

/**
 * boisson service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::boisson.boisson');
