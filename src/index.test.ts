import {
  addDeviceNamesToOutages,
  createSiteDeviceIdNameDictionary,
  getAllOutages,
  getSiteInfo,
} from '.'
import * as apiCallers from './services/api-caller'
import { infoLogger } from './services/loggers'
import {
  dummyDictionary,
  dummyGetOutagesResponse,
  dummyGetSiteInfoResponse,
  dummyOutage,
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

describe('GIVEN a request to create a site`s Devices ID x Name dictionary', () => {
  it('THEN it should return a dictionary ', () => {
    // Arrange
    const devices = dummyGetSiteInfoResponse.data.devices
    const expectedDictionary = {
      [devices[0].id]: devices[0].name,
    }

    // Act
    const dictionary = createSiteDeviceIdNameDictionary(devices)

    // Assert
    expect(dictionary).toEqual(expect.objectContaining(expectedDictionary))
    expect(mockedInfoLogger).toBeCalledWith(
      'filtered all outages down to just those for the requested site and timeframe'
    )
  })
})

describe('GIVEN a request to add device names to outages', () => {
  it('THEN it should return an array of outages with names included', () => {
    // Arrange
    const expectedOutput = [
      {
        ...dummyOutage,
        name: 'Partridge',
      },
    ]

    // Act
    const outagesWithNames = addDeviceNamesToOutages(
      dummyGetOutagesResponse.data,
      dummyDictionary
    )

    // Assert
    expect(outagesWithNames).toEqual(expectedOutput)
    expect(mockedInfoLogger).toBeCalledWith('added device name to outages')
  })
})
