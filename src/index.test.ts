import { getAllOutages, getSiteInfo } from '.'
import * as apiCallers from './services/api-caller'
import { infoLogger } from './services/logger'
import {
  dummyGetOutagesResponse,
  dummyGetSiteInfoResponse,
  dummySiteId,
} from './test-data'

jest.mock('./services/logger')
const mockedInfoLogger = infoLogger as jest.Mocked<typeof infoLogger>

jest.mock('./services/api-caller')
const mockedApiCallers = apiCallers as jest.Mocked<typeof apiCallers>

describe('GIVEN a request get all outages', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('WHEN the api caller provides the requested data', () => {
    it('THEN it should return all outages AND call the relevant loggers', async () => {
      // Arrange
      mockedApiCallers.getData.mockResolvedValue(dummyGetOutagesResponse.data)

      // Act
      const outages = await getAllOutages()

      // Assert
      expect(outages).toEqual(dummyGetOutagesResponse.data)
      expect(mockedInfoLogger).toBeCalledWith('getting all outages')
      expect(mockedInfoLogger).toBeCalledWith(
        'received all outages from KrakenFlex API'
      )
    })
  })
})

describe('GIVEN a request to get site data for a particualr site', () => {
  describe('WHEN the api caller provides the requested data', () => {
    it('THEN it should return the site data AND call the relevant loggers', async () => {
      // Arrange
      mockedApiCallers.getData.mockResolvedValue(dummyGetSiteInfoResponse.data)

      // Act
      const siteInfo = await getSiteInfo(dummySiteId)

      // Assert
      expect(siteInfo).toEqual(dummyGetSiteInfoResponse.data)
      expect(mockedInfoLogger).toBeCalledWith(
        `getting site info for siteId: ${dummySiteId}`
      )
      expect(mockedInfoLogger).toBeCalledWith(
        `successfully retrieved site info for siteId: ${dummySiteId}`
      )
    })
  })
})
