import {
  headers,
  krakenFlexApiBaseUrl,
  krakenFlexApiPaths,
  norwichPearTreeSiteId,
  outagesFrom,
} from './constants'
import { getData, postData } from './services/api-caller'
import { errorLogger, infoLogger } from './services/loggers'
import { Device, Outage, SiteDeviceIdNameDictionary, SiteInfo } from './types'

// named 'handler' to be consistent with AWS Lambda naming convention where this would handle an event or API call
export const handler = async (siteId: string, outagesFrom: Date) => {
  const allOutages = await getAllOutages()

  const siteInfo = await getSiteInfo(siteId)

  const siteDeviceIdNameDictionary = createSiteDeviceIdNameDictionary(
    siteInfo.devices
  )

  let filteredOutages = filterOutages(
    allOutages,
    outagesFrom,
    siteDeviceIdNameDictionary
  )

  filteredOutages = addDeviceNamesToOutages(
    filteredOutages,
    siteDeviceIdNameDictionary
  )

  await postOutages(siteId, filteredOutages)
}

export const getAllOutages = async (): Promise<Outage[]> => {
  infoLogger('getting all outages')

  const url = `${krakenFlexApiBaseUrl}${krakenFlexApiPaths.allOutages}`
  const outages = await getData(url, headers)
  infoLogger('successfully retrieved all outages')

  return outages
}

export const getSiteInfo = async (siteId: string): Promise<SiteInfo> => {
  infoLogger(`getting site info for siteId: ${siteId}`)

  const path = krakenFlexApiPaths.siteInfo.replace('{siteId}', `${siteId}`)
  const url = `${krakenFlexApiBaseUrl}${path}`
  const siteInfo = await getData(url, headers)
  // I would consider caching siteInfo for a set period in order to improve perfomance and reduce unnecessary API calls as it's unlikely to change over short periods

  infoLogger(`successfully retrieved site info for siteId: ${siteId}`)

  return siteInfo
}

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
      new Date(outage.begin) > outagesFrom &&
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

export const postOutages = async (
  siteId: string,
  outages: Outage[]
): Promise<void> => {
  infoLogger(`posting outages for siteId: ${siteId}`)

  const path = krakenFlexApiPaths.siteOutages.replace('{siteId}', `${siteId}`)
  const url = `${krakenFlexApiBaseUrl}${path}`
  await postData(url, outages, headers)

  infoLogger(`successfully posted outages for siteId: ${siteId}`)
}

// The siteId and outagesFrom params could be variable and passed in as a property on an Event or param on an API request
handler(norwichPearTreeSiteId, outagesFrom)
  .then(() => {
    infoLogger('successfully got and posted outages')
  })
  .catch((error) => {
    errorLogger('failed to get and post outages', error)
  })
