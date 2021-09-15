import 'tailwindcss/tailwind.css'
import "../styles/styles.css"
import type { AppProps } from 'next/app'
import {DAppProvider, ChainId} from '@usedapp/core'

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/' + process.env.NEXT_PUBLIC_INFURA_ID
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  return <DAppProvider config={config}>
    <Component {...pageProps} />
    </DAppProvider>
}
export default MyApp
