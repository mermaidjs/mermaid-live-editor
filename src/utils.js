import { Base64 } from 'js-base64'

export const base64ToState = (base64, search) => {
  // for backward compatibility
  const params = new window.URLSearchParams(search)
  const themeFromUrl = params.get('theme') || 'default'

  const str = Base64.decode(base64)
  let state
  try {
    state = JSON.parse(str)
    if (state.code === undefined) { // not valid json
      state = { code: str, mermaid: { theme: themeFromUrl } }
    }
  } catch (e) {
    state = { code: str, mermaid: { theme: themeFromUrl } }
  }
  return state
}

const defaultCode = `graph TD
A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me think}
C -->|One| D[Laptop]
C -->|Two| E[iPhone]
C -->|Three| F[fa:fa-car Car]
`
export const defaultState = {
  code: defaultCode,
  mermaid: { theme: 'default' }
}
