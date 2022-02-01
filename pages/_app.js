import '../styles/globals.css'
import { ThirdwebProvider } from "@3rdweb/react";
import { RecoilRoot } from "recoil";

const supportedChainIds = [4]
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {
  return <ThirdwebProvider
  connectors={connectors} 
  supportedChainIds={supportedChainIds}
  >
    <RecoilRoot>
    <Component {...pageProps} />
    </RecoilRoot>
  </ThirdwebProvider>
}

export default MyApp
