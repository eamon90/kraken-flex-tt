import { Outage, SiteDeviceIdNameDictionary } from './types'

export const dummyApiKey = 'dummy-api-key'

export const dummyOutages = [
  {
    id: '44c02564-a229-4f51-8ded-cc7bcb202566',
    begin: '2022-01-01T00:00:00.000Z',
    end: '2022-01-02T12:01:59.123Z',
  },
  {
    id: '27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1',
    begin: '2021-04-12T00:00:00.000Z',
    end: '2021-04-13T12:01:59.123Z',
  },
  {
    id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
    begin: '2022-05-03T00:00:00.000Z',
    end: '2022-05-04T12:01:59.123Z',
  },
] as Outage[]

export const dummyGetOutagesResponse = {
  status: 200,
  statusText: 'OK',
  data: dummyOutages,
}

export const dummySiteId = 'pear-tree'

export const dummyGetSiteInfoResponse = {
  status: 200,
  statusText: 'OK',
  data: {
    id: 'pear-tree',
    name: 'Pear Tree',
    devices: [
      {
        id: '44c02564-a229-4f51-8ded-cc7bcb202566',
        name: 'Partridge',
      },
      {
        id: '27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1',
        name: 'Brent',
      },
    ],
  },
}

export const dummyDictionary = {
  ['44c02564-a229-4f51-8ded-cc7bcb202566']: 'Partridge',
  ['27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1']: 'Brent',
} as SiteDeviceIdNameDictionary

export const dummyOutagesFrom = new Date('2022-01-01T00:00:00.000Z')

export const dummyError = {
  message: 'Request failed with status code 403',
  response: {
    status: 403,
  },
}

export const dummyPostRequestData = [
  {
    id: '44c02564-a229-4f51-8ded-cc7bcb202566',
    name: 'Partridge',
    begin: '2022-01-01T00:00:00.000Z',
    end: '2022-01-02T12:01:59.123Z',
  },
]

export const dummyPostResponse = {
  status: 200,
  statusText: 'OK',
}
