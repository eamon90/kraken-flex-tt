import {
  krakenFlexApiBaseUrl,
  krakenFlexApiKey,
  krakenFlexApiPaths,
} from './constants'
import { getData } from './services/api-caller'
import { infoLogger } from './services/logger'
import { Outage } from './types'

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
  infoLogger('received all outages from KrakenFlex API') 
  return outages
}

handler()
  .then(() => {
    console.log('Successfully got and posted outages')
  })
  .catch((error) => {
    console.error('Failed to get and post outages', error)
  })
