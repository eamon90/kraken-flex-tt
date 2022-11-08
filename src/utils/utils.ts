import { infoLogger } from '../services/loggers'
import { Device, SiteDeviceIdNameDictionary, Outage } from '../types'

export const createSiteDeviceIdNameDictionary = (
  devices: Device[]
): SiteDeviceIdNameDictionary => {
  const dictionary = devices.reduce((prev, curr) => {
    return Object.assign(prev, {
      [curr.id]: curr.name,
    })
  }, {} as SiteDeviceIdNameDictionary)

  return dictionary
}

export const filterOutages = (
  outages: Outage[],
  outagesFrom: Date,
  dictionary: SiteDeviceIdNameDictionary
): Outage[] => {
  let filteredOutages = outages.filter(
    (outage) =>
      new Date(outage.begin) >= outagesFrom &&
      dictionary.hasOwnProperty(outage.id)
  )

  infoLogger(
    'filtered all outages down to just those for the requested site and timeframe'
  )

  return filteredOutages
}

export const addDeviceNamesToOutages = (
  outages: Outage[],
  dictionary: SiteDeviceIdNameDictionary
): Outage[] => {
  const outagesWithDeviceName = outages.map((outage) => ({
    ...outage,
    name: dictionary[outage.id],
  }))

  infoLogger('added device name to outages')

  return outagesWithDeviceName
}
