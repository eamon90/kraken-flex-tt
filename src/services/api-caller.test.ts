import axios from 'axios'
import { krakenFlexApiBaseUrl, krakenFlexApiPaths } from '../constants'
import { dummyApiKey, dummyGetResponse } from '../test-data'
import { getData } from './api-caller'
import { errorLogger } from './logger'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('./logger')
const mockedErrorLogger = errorLogger as jest.Mocked<typeof errorLogger>

const headers = {
  'x-api-key': dummyApiKey,
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
  })
  describe('WHEN the API responds with an error', () => {
    it('SHOULD throw an error AND write to the error logger', async () => {
      // Arrange
      const mockError = { error: 'some error' }
      mockedAxios.get.mockRejectedValue(mockError)

      // Act
      let result
      try {
        result = await getData(url, headers)
      } catch (error) {
        // Assert
        expect(error).toEqual(mockError)
        expect(mockedErrorLogger).toHaveBeenCalledWith(
          `Failed to GET data from ${url}`,
          mockError
        )
        return
      }
      expect(result).toEqual(`Function didn't throw`)
      // note that I added the above line and the return because the jest documentation (https://jestjs.io/docs/asynchronous#asyncawait) says to use this try/catch approach but I noticed that without a test to fail then this unit test will pass in the event of the function not throwing.
    })
  })
})
