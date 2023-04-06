import type { FetchMapType } from './fetch.types';

const event = {
  findAll: {
    method: 'GET',
    url: '/events',
  },
  findOne: {
    method: 'GET',
    url: '/events/:eventId',
  },
};

const eventCondition = {
  findAll: {
    method: 'GET',
    url: '/events/:eventId/condition',
  },
  findOne: {
    method: 'GET',
    url: '/events/:eventId/condition/:conditionId',
  },
};

const eventAction = {
  findAll: {
    method: 'GET',
    url: '/events/:eventId/action',
  },
  findOne: {
    method: 'GET',
    url: '/events/:eventId/action/:conditionId',
  },
};

const organization = {
  findAll: {
    method: 'GET',
    url: '/organizations',
  },
  findOne: {
    method: 'GET',
    url: '/organizations/:organizationId',
  },
};

export default {
  event,
  organization,
  eventCondition,
  eventAction,
} as FetchMapType;
