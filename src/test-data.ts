import { Outage, SiteDeviceIdNameDictionary } from './types'

export const dummyApiKey = 'dummy-api-key'

export const dummyOutage = {
  id: '44c02564-a229-4f51-8ded-cc7bcb202566',
  begin: '2022-01-01T00:00:00.000Z',
  end: '2022-01-02T12:01:59.123Z',
} as Outage

export const dummyGetOutagesResponse = {
  status: 200,
  statusText: 'OK',
  data: [dummyOutage],
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
    ],
  },
}

export const dummyDictionary = {
  ['44c02564-a229-4f51-8ded-cc7bcb202566']: 'Partridge',
} as SiteDeviceIdNameDictionary

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
