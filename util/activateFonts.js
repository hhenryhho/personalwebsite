import { Global } from '@emotion/react'

const Fonts = () => (
  <>
    <Global
      styles={`
      /* latin */
      @font-face {
        font-family: 'Determination Regular';
        src: url('/fonts/undertale/DeterminationReg.ttf')
      }
      `}
    />
    <Global
      styles={`
    /* latin */
    @font-face {
      font-family: 'BasierSquare Regular';
      src: url('/fonts/basiersquare/basiersquare-regular.woff') format('woff'), url('/fonts/basiersquare/basiersquare-regular.woff2') format('woff2'), url('/fonts/basiersquare/basiersquare-regular.ttf') format('truetype'), url('/fonts/basiersquare/basiersquare-regular.otf') format('opentype');
    }
    `}
    />
  </>
)

export default Fonts
