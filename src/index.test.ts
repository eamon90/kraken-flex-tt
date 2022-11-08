import { getAllOutages } from '.'
import * as apiCallers from './services/api-caller'
import { infoLogger } from './services/logger'
import { dummyGetResponse } from './test-data'

jest.mock('./services/logger')
const mockedInfoLogger = infoLogger as jest.Mocked<typeof infoLogger>

jest.mock('./services/api-caller')
const mockedApiCallers = apiCallers as jest.Mocked<typeof apiCallers>

describe('GIVEN a request get all outages', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('WHEN the api-caller provides the requested data', () => {
    it('SHOULD return all outages AND call the relevant loggers', async () => {
      // Arrange
      mockedApiCallers.getData.mockResolvedValue(dummyGetResponse.data)

      // Act
      const outages = await getAllOutages()

      // Assert
      expect(outages).toEqual(dummyGetResponse.data)
      expect(mockedInfoLogger).toBeCalledWith('getting all outages')
      expect(mockedInfoLogger).toBeCalledWith(
        'received all outages from KrakenFlex API'
      )
    })
  })
})
