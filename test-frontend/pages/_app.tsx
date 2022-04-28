import '../styles/globals.css'
import type { AppProps } from 'next/app'

import type { NextPage } from 'next'
import React, { useMemo } from 'react';

import { CHAIN_INFO, SupportedChainId } from '../constants/chaininfo'

// Solana
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';

import { providers } from 'ethers';

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import {
  Provider as MultiChainProvider
} from '../multichain'

import {
  Chain,
  chain,
  Connector,
  defaultChains,
  defaultL2Chains,
  InjectedConnector,
  Provider,
} from 'wagmi';

import { Flex } from '@chakra-ui/react';


// Pick chains
const chains = [
  ...defaultChains,
  ...defaultL2Chains,
  // CHAIN_INFO[SupportedChainId.HARMONY_TESTNET_S0] as Chain,
];

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

// Set up connectors
const connectors = [
  new InjectedConnector({
    chains,
    options: { shimDisconnect: true, shimChainChangedDisconnect: true },
  }),
  new WalletConnectConnector({
    options: {
      infuraId,
      qrcode: true,
    },
  }),
];

const defaultChain = chain.rinkeby;

type ProviderConfig = { chainId?: number; connector?: Connector };

const wagmiProvider = ({ chainId }: ProviderConfig) => {
  const rpcUrl = CHAIN_INFO[chainId!]?.rpcUrls[0];
  if (!rpcUrl) {
    return new providers.JsonRpcProvider(
      CHAIN_INFO[defaultChain.id].rpcUrls[0],
      'any',
    );
  }
  return new providers.JsonRpcProvider(rpcUrl, 'any');
};

import {
  useLocalStorage,
  WalletProvider as SolanaWalletProvider,
  ConnectionProvider as SolanaConnectionProvider,
  ConnectionProviderProps as SolanaConnectionProviderProps
} from '@solana/wallet-adapter-react';

function MyApp({ Component, pageProps }: AppProps) {
  // Solana Stuff
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    [network]
  );

  return (
    <MultiChainProvider solanaEndpoint={endpoint} walletConnectors={[...wallets, ...connectors]} wagmiProvider={wagmiProvider}>
      <Component {...pageProps} />
    </MultiChainProvider>
    // <SolanaConnectionProvider endpoint={endpoint} >
    //   <SolanaWalletProvider wallets={wallets}>
    //     <Provider connectors={connectors} provider={wagmiProvider}>
    //       (<Component {...pageProps} />)
    //     </Provider>
    //   </SolanaWalletProvider>
    // </SolanaConnectionProvider>
  )
}

export default MyApp
