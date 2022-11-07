import axios from 'axios'
import {
  krakenFlexApiBaseUrl,
  krakenFlexApiKey,
  krakenFlexApiPaths,
} from '../constants'
import { dummyGetResponse } from '../test-data'
import { getData } from './api-caller'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const headers = {
  'x-api-key': krakenFlexApiKey,
}

describe('GIVEN a request to GET data from KrakenFlex`s API', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  const url = `${krakenFlexApiBaseUrl}${krakenFlexApiPaths.allOutages}`

  describe('WHEN the API responds with a 200 and some data', () => {
    it('SHOULD make an API call AND return the requested data', async () => {
      // Arrange
      mockedAxios.get.mockResolvedValue(dummyGetResponse)

      // Act
      const data = await getData(url, headers)

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(url, { headers })
      expect(data).toEqual(dummyGetResponse.data)
    })
    // handles error
  })
})
