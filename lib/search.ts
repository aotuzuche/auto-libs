import qs from 'qs'

export const search = () => {
  const search = window.location.search.replace(/^\?/, '')
  return qs.parse(search)
}
