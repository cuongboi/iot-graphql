import type { FetchMapType } from './fetch.types';

const event = {
  getAll: {
    method: 'GET',
    url: '/events',
  },
  getOne: {
    method: 'GET',
    url: '/events/:uuid',
  },
};

const organization = {
  getAll: {
    method: 'GET',
    url: '/organizations',
  },
};

export default {
  event,
  organization,
} as FetchMapType;
