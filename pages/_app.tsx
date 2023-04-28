import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { Inter } from '@next/font/google'

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap', 
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <style jsx global>
        {`
          :root {
            --inter-font: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}
