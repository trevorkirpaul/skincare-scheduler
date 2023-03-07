type CachedUsedData = {
  id: number
  email: string
}

/**
 * returns user data from local storage
 * - if no data, returns `false`
 * - if error parsing JSON, throws err
 * @returns CachedUsedData | false
 */
export const getCachedUserData = () => {
  const found_data = localStorage.getItem('cached-user-data')
  if (!found_data) return false

  try {
    return JSON.parse(found_data) as CachedUsedData
  } catch (e) {
    throw new Error('getCachedUserData: Failed to parse found data')
  }
}
