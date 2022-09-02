import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolletWalletAdapter, SolletExtensionWalletAdapter } from "@solana/wallet-adapter-sollet";
import { SlopeWalletAdapter } from "@solana/wallet-adapter-slope";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { ReactNode, useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';


type Props = {
    children: ReactNode
}

export default function Wallet({ children }: Props) {
    // const { publicKey } = useWallet();
    const network = WalletAdapterNetwork.Mainnet;
    const rpc = clusterApiUrl(network);
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    // const connection = new Connection(endpoint);
    // const [balance, setBalance] = useState<Number>()

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    // const wallet = useAnchorWallet()

    // useEffect(() => {
    //     send();
    //     // console.log((wallet?.publicKey.toBase58())?.toString())
    //     console.log('вызов')
    //     if (publicKey != null) {
    //         console.log('publicKey - ', (publicKey.toBase58())?.toString())
    //     }
    //     // console.log('balance -', balance)
    //     // console.log((wallet?.publicKey.toBase58())?.toString())
    // }, [wallet]);

    // const [userSOLBalance, setSOLBalance] = useState<number>()

    // const send = async () => {
    //     try {
    //         // let key = (wallet?.publicKey.toBase58())?.toString();
    //         // let walletun = new PublicKey(`${key}`);
    //         if (publicKey != null) {
    //             // let key = (publicKey.toBase58())?.toString();
    //             let balance = await connection.getBalance(publicKey, 'confirmed');
    //             console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
    //             setBalance(balance / LAMPORTS_PER_SOL)
    //             console.log(publicKey)
    //         }
    //         // if (wallet?.publicKey) {
    //         //     const SOL = connection.getAccountInfo(wallet.publicKey)
    //         //     console.log(SOL)
    //         //     SOL.then((res) => {if (res != null) {setSOLBalance(res.lamports / LAMPORTS_PER_SOL)}})
    //         //   }
    //     }
    //     catch (e) {
    //         // console.log(e)
    //     }
    // }

    return (
        <ConnectionProvider endpoint={rpc} config={{ commitment: "finalized" }}>
            <WalletProvider wallets={wallets} autoConnect={true}>
                {/* <WalletDialogProvider> */}
                <WalletModalProvider>
                    {children}
                    {/* <div style={{ color: 'white', position: 'relative', fontSize: '18px', fontFamily: 'RobotoSlab_Regular', padding: '0px 20px' }}>
                            <>
                                {balance?.toFixed(2)} SOL
                            </>
                        </div> */}
                </WalletModalProvider>
                {/* </WalletDialogProvider> */}
            </WalletProvider>
        </ConnectionProvider>
    )
}
