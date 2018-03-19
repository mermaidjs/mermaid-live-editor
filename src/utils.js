import { Base64 } from 'js-base64'

export const base64ToState = base64 => {
  // for backward compatibility
  const search = this.props.location.search
  const params = new window.URLSearchParams(search)
  const themeFromUrl = params.get('theme') || 'default'

  const str = Base64.decode(base64)
  let state
  try {
    state = JSON.parse(str)
    if (state.code === undefined) { // not valid json
      state = { code: str, theme: themeFromUrl }
    }
  } catch (e) {
    state = { code: str, theme: themeFromUrl }
  }
  return state
}
