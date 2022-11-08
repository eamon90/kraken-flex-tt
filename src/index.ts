import {
  krakenFlexApiBaseUrl,
  krakenFlexApiKey,
  krakenFlexApiPaths,
} from './constants'
import { getData } from './services/api-caller'
import { infoLogger } from './services/logger'
import { Outage, SiteInfo } from './types'

const headers = {
  'x-api-key': krakenFlexApiKey,
}

// named 'handler' to be consistent with AWS Lambda naming convention where this would handle an event or API call
export const handler = async () => {
  const allOutages = await getAllOutages()



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
  // I would consider caching siteInfo considering it's unlikely to change over short periods in order to improve perfomance and reduce unnecessary API calls
  infoLogger(`successfully retrieved site info for siteId: ${siteId}`)

  return siteInfo
}

handler()
  .then(() => {
    console.log('Successfully got and posted outages')
  })
  .catch((error) => {
    console.error('Failed to get and post outages', error)
  })
