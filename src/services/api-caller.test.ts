import axios from 'axios'
import { krakenFlexApiBaseUrl, krakenFlexApiPaths } from '../constants'
import {
  dummyApiKey,
  dummyError,
  dummyGetOutagesResponse,
  dummyPostRequestData,
  dummyPostResponse,
} from '../test-data'
import { getData, postData } from './api-caller'
import { errorLogger } from './loggers'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('./loggers')
const mockedErrorLogger = errorLogger as jest.Mocked<typeof errorLogger>

const headers = {
  'x-api-key': dummyApiKey,
}

describe('API Caller', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('GIVEN a request to GET data from an API', () => {
    const url = `${krakenFlexApiBaseUrl}${krakenFlexApiPaths.allOutages}`

    describe('WHEN the API responds with a 200 and some data', () => {
      it('THEN it should make an API call AND return the requested data', async () => {
        // Arrange
        mockedAxios.get.mockResolvedValue(dummyGetOutagesResponse)

        // Act
        const data = await getData(url, headers)

        // Assert
        expect(mockedAxios.get).toHaveBeenCalledWith(url, { headers })
        expect(data).toEqual(dummyGetOutagesResponse.data)
      })
    })
    describe('WHEN the API responds with an error', () => {
      it('THEN it should throw an error AND write to the error logger', async () => {
        // Arrange
        mockedAxios.get.mockRejectedValue(dummyError)

        // Act
        try {
          await getData(url, headers)
        } catch (error) {
          // Assert
          expect(error).toEqual(dummyError)
          expect(mockedErrorLogger).toHaveBeenCalledWith(
            `Failed to GET data from ${url}`,
            dummyError
          )
          return
        }
        expect(`Function didn't throw`).toBeFalsy()
        // note that I added the above line and the return because the jest documentation (https://jestjs.io/docs/asynchronous#asyncawait) says to use this try/catch approach but I noticed that without a test to fail then this unit test will pass in the event of the function not throwing.
      })
    })
  })
  describe('GIVEN a request to POST data to an API', () => {
    const url = `${krakenFlexApiBaseUrl}${krakenFlexApiPaths.siteOutages}`
    describe('WHEN the API responds with a 200 and some data', () => {
      it('THEN it should make an API call with the data passed into the function on the request body', async () => {
        // Arrange
        mockedAxios.post.mockResolvedValue(dummyPostResponse)

        // Act
        await postData(url, dummyPostRequestData, headers)

        // Assert
        expect(mockedAxios.post).toHaveBeenCalledWith(
          url,
          dummyPostRequestData,
          { headers }
        )
      })
    })
    describe('WHEN the API responds with an error', () => {
      it('THEN it should throw an error AND write to the error logger', async () => {
        // Arrange
        mockedAxios.post.mockRejectedValue(dummyError)

        // Act
        try {
          await postData(url, dummyPostRequestData, headers)
        } catch (error) {
          // Assert
          expect(error).toEqual(dummyError)
          expect(mockedErrorLogger).toHaveBeenCalledWith(
            `Failed to POST data to ${url}`,
            dummyError
          )
          return
        }
        expect(`Function didn't throw`).toBeFalsy()
      })
    })
  })
})
