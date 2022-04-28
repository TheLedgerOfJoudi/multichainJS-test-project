
import React, { FormEventHandler, MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react"

import {
    useAccount,
    useConnect,
    useContract,
    useNetwork,
    useSigner
} from '../multichain'
import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO, SupportedChainId } from "../constants/chaininfo";

import {
    Box,
    Button,
    Text,
    Image,
    useTheme,
    VStack,
    Flex,
    useCallbackRef,
    FormLabel,
    Input,
    FormControl,
    Select,
    Spacer
} from '@chakra-ui/react';

function WalletSelectButton({
    name,
    icon,
    onClick,
}: {
    name: string;
    icon: string;
    onClick: () => void;
}) {
    const theme = useTheme();
    return (
        <Box
            background='lightgreen'
            border="1px solid #E8E9E9"
            borderRadius={12}
            px="18px"
            py={4}
            alignItems="center"
            display="flex"
            w="full"
        >
            <Image h="40px" w="40px" src={icon} alt="" />
            <Text fontWeight="700" ml={5} mr="auto">
                {name}
            </Text>

            <Button variant="primary" onClick={onClick}>
                Connect
            </Button>
        </Box>
    );
}

import { useWallet as useWalletSolana } from '@solana/wallet-adapter-react';
import { useConnect as useConnectWagmi, useContract as useContractWagmi, useSigner as useSignerWagmi, useAccount as useAccountWagmi } from 'wagmi';

import { rinkbyContractABI, rinkbyContractAddress } from '../constants/contractsInfo'

function Index() {

    const [wagmiInfo] = useConnectWagmi();
    const solanaInfo = useWalletSolana();

    const [wagmiAccountData] = useAccountWagmi()
    const [signerStates] = useSignerWagmi();
    const [allAccountData] = useAccount()

    const wagmiContract = useContractWagmi({
        addressOrName: rinkbyContractAddress,
        contractInterface: rinkbyContractABI,
        signerOrProvider: signerStates.data
    })

    const [wagmiContractValue, setWagmiContractValue] = useState(0)

    useEffect(() => {
        const changeValue = async () => {
            try {
                let newVal = await wagmiContract.number()
                newVal = parseInt(newVal)
                setWagmiContractValue(newVal)
            }
            catch (e) { setWagmiContractValue(0) }
        }
        changeValue()
    }, [wagmiContract])

    // const [signerData] = useSignerWagmi()

    // const [wagmiAddress, setWagmiAddress] = useState('')

    // useEffect(() => {
    //     const changeWagmi = async () => {
    //         const newVal = await signerData.data?.getAddress()
    //         if (newVal) setWagmiAddress(newVal?.toString())
    //     }
    //     changeWagmi()
    // }, [signerData.data])

    // const contractWagmi = useContractWagmi({
    //     addressOrName: '',
    //     contractInterface: ERC20ABI,
    //     signerOrProvider: signerStates.data,
    // })

    const allInfo = useConnect()
    const [accountData, disconnect] = useAccount()

    const [{ data, error }, connect] = useConnectWagmi();

    const [
        selectedNetworkId,
        setSelectedNetworkId,
    ] = React.useState<SupportedChainId>(ALL_SUPPORTED_CHAIN_IDS[0]);

    const handleWagmiChange: FormEventHandler<HTMLFormElement> = useCallback( async(event) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            number: { value: string };
        };
        const newValue = parseInt(target.number.value)
        console.log(newValue)
        try{

            await wagmiContract.number(newValue)
        }
        catch(e){console.log(e)}
    }, [wagmiContract])

    return (
        <>
            <Flex align={'center'} justifyContent='center'>
                <Select
                    width="100%"
                    maxW="200px"
                    flexDirection="column"
                    mt={7}
                    onChange={(value) => { setSelectedNetworkId(parseInt(value.target.value)) }}
                >
                    {ALL_SUPPORTED_CHAIN_IDS.map((x) => (
                        <option key={x} value={x}>
                            {CHAIN_INFO[x].name}
                        </option>
                    ))}
                </Select>

                <VStack
                    spacing={5}
                    width="100%"
                    maxW="496px"
                    flexDirection="column"
                    mt={7}
                >
                    {CHAIN_INFO[selectedNetworkId].wallets.map(({ name, icon, id }) => (
                        <WalletSelectButton
                            key={id}
                            name={name}
                            icon={icon}
                            onClick={async () => {
                                // const connector = data.connectors.find((x) => ('id' in x && x.id === id) || ('name' in x && x.name === name));
                                // if (connector) {
                                //     await connect(connector);
                                // }
                                // console.log(solanaInfo.wallets)
                                // const connector2 = solanaInfo.wallets.find((x) => (x.adapter.name === name));
                                // console.log(connector2)
                                // if (connector2) {
                                //     solanaInfo.select(connector2.adapter.name)
                                //     console.log(solanaInfo.wallet)
                                //     solanaInfo.connect()
                                // }
                                const connector = allInfo[0].data.connectors.find((x) => ('id' in x && x.id === id) || ('name' in x && x.name === name));
                                if (connector) allInfo[1](connector)
                            }}
                        />
                    ))}
                </VStack>

                <Text>
                    Connected to EVM: {wagmiInfo.data.connected.toString()}
                    <br />
                    Connected to Solana: {solanaInfo.connected.toString()}
                    <br />
                    Connected to MutliChain: {allInfo[0].data.connected.toString()}
                </Text>
                <Button mt={20} ml={5} height={28} onClick={async () => await disconnect()}>
                    Disconnect
                </Button>
            </Flex>

            <Flex align={'center'} justifyContent='center'>
                <Text>
                    EVM public key: {wagmiAccountData.data?.address.toString()}
                    <br />
                    Solana public key: {solanaInfo.publicKey?.toString()}
                    <br />
                    MultiChain: {allAccountData.data?.address.toString()}
                    <br />
                </Text>
            </Flex>

            <Flex align={'center'} justifyContent='center' gap={500}>
                <Flex id="wagmi-contract" align={'center'} justifyContent='center' flexDir='column' maxW={20}>
                    <Text>
                        Rinkby Contract Address (from Wagmi): {wagmiContract.address}
                        <br />
                        Rinkby Contract Number Value: {wagmiContractValue}
                        <br />
                    </Text>
                    <form onSubmit={handleWagmiChange}>
                        <FormControl>
                            <FormLabel htmlFor='name'>Change the number</FormLabel>
                            <Input
                                type='number'
                                id='number'
                                placeholder='integer'
                            />
                        </FormControl>
                        <Button mt={4} colorScheme='teal' type='submit'>
                            Submit
                        </Button>
                    </form>
                </Flex>
                {/* <Spacer /> */}
                <Flex id="solana-contract" align={'center'} justifyContent='center' flexDir='column' maxW={20}>
                    <Text>
                        Solana Contract Address: {wagmiContract.address}
                        <br />
                        Solana Contract Number Value: {wagmiContractValue}
                        <br />
                    </Text>
                    <form onSubmit={handleWagmiChange}>
                        <FormControl>
                            <FormLabel htmlFor='name'>Change the number</FormLabel>
                            <Input
                                type='number'
                                id='number'
                                placeholder='integer'
                            />
                        </FormControl>
                        <Button mt={4} colorScheme='teal' type='submit'>
                            Submit
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </>
    )
}

export default Index;
