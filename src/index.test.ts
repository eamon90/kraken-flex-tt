import {
  getAllOutages,
  getSiteInfo,
  postOutages,
} from '.'
import * as apiCallers from './services/api-caller'
import { infoLogger } from './services/loggers'
import {
  dummyGetOutagesResponse,
  dummyGetSiteInfoResponse,
  dummySiteId,
} from './test-data'

jest.mock('./services/loggers')
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
        'successfully retrieved all outages'
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

describe('GIVEN a request post outages', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('WHEN the api caller accepts the request (no error)', () => {
    it('THEN it should call the relevant loggers', async () => {
      // Arrange
      mockedApiCallers.postData.mockResolvedValue()

      // Act
      await postOutages(dummySiteId, dummyGetOutagesResponse.data)

      // Assert
      expect(mockedInfoLogger).toBeCalledWith(
        `posting outages for siteId: ${dummySiteId}`
      )
      expect(mockedInfoLogger).toBeCalledWith(
        `successfully posted outages for siteId: ${dummySiteId}`
      )
    })
  })
})
