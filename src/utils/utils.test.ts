import { infoLogger } from '../services/loggers'
import {
  dummyGetSiteInfoResponse,
  dummyOutages,
  dummyGetOutagesResponse,
  dummyDictionary,
  dummyOutagesFrom,
} from '../test-data'
import {
  createSiteDeviceIdNameDictionary,
  addDeviceNamesToOutages,
  filterOutages,
} from './utils'

jest.mock('../services/loggers')
const mockedInfoLogger = infoLogger as jest.Mocked<typeof infoLogger>

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
  })
})

describe('GIVEN a request to filter outages', () => {
  it('THEN it should return a filtered set of outages', () => {
    // Arrange & Act
    const filteredOutages = filterOutages(
      dummyOutages,
      dummyOutagesFrom,
      dummyDictionary
    )

    // Assert
    filteredOutages.map((outage) => {
      expect(dummyDictionary.hasOwnProperty(outage.id))
      
      const outageBeginTimestamp = Date.parse(outage.begin)
      const fromTimestamp = dummyOutagesFrom.getTime()
      expect(outageBeginTimestamp).toBeGreaterThan(fromTimestamp - 1)
    })
  })
})

describe('GIVEN a request to add device names to outages', () => {
  it('THEN it should return an array of outages with names included', () => {
    // Arrange
    const expectedOutput = [
      {
        ...dummyOutages[0],
        name: dummyDictionary[dummyOutages[0].id],
      },
      {
        ...dummyOutages[1],
        name: dummyDictionary[dummyOutages[1].id],
      },
      {
        ...dummyOutages[2],
        name: undefined,
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
