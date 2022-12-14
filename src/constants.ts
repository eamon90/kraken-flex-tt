export const norwichPearTreeSiteId = 'norwich-pear-tree'

export const outagesFrom = new Date('2022-01-01T00:00:00.000Z')

export const krakenFlexApiBaseUrl =
  'https://api.krakenflex.systems/interview-tests-mock-api/v1/'
// typically this would be variable depending on the environment

export const krakenFlexApiKey = 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23'
// this would normally be kept in a secret param store

export const headers = {
  'x-api-key': krakenFlexApiKey,
}

export const krakenFlexApiPaths = {
  allOutages: 'outages',
  siteInfo: 'site-info/{siteId}',
  siteOutages: 'site-outages/{siteId}',
}
