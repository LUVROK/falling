import { FC, useState, useEffect, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Wallet.css';
import { walletButton } from "../../style/styles";
import './Wallet.scss';
import '../../App.css';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Mashine from '../mashine/mashine';

(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;
// declare global {
//     interface Window { solana: any; }
// }

interface AlertState {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error' | undefined;
    hideDuration?: number | null;
}

export const Wallet: FC = () => {
    const { publicKey } = useWallet();
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const connection = new Connection(endpoint);
    const [balance, setBalance] = useState<Number>();

    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    });

    const wallet = useAnchorWallet();

    useEffect(() => {
        setAlertState({
            open: true,
            message: 'Success mint',
            severity: 'success',
        });
    }, [])

    useEffect(() => {
        send();
        if (publicKey != null) {
            if (getCookie('publicKeyPhantom') === undefined) {
                document.cookie = `publicKeyPhantom=${(publicKey.toBase58())?.toString()}`
            }
        }
    }, [wallet]);

    function getCookie(name: String) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }



    const send = async () => {
        try {
            if (publicKey != null) {
                let balance = await connection.getBalance(publicKey, 'confirmed');
                // console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
                setBalance(balance / LAMPORTS_PER_SOL)
                // console.log(publicKey)
            }
        }
        catch (e) {
            // console.log(e)
        }
    }

    async function MINT_go() {

        // Explosion();
    }

    return (
        <div className="App2">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: '20px', marginTop: '20px', position: 'absolute', right: 0, top: 0, fontSize: '36px', zIndex: '9999' }} className='app2Cont'>
                <WalletMultiButton style={walletButton} className="wl_btn" />
                <WalletDisconnectButton onClick={() => setBalance(0)} />
                <div className='balance'>
                    <>
                        {balance?.toFixed(2)} SOL
                    </>
                </div>
            </div>
            <div className='contentMain'>
                {/* <div className='MintBtn'>MINT</div> */}
                <Mashine />
                <div className="box">
                    <div className="content">
                        <div className='primer' onClick={MINT_go}>MINT</div>
                    </div>
                </div>
                <div className='thereAre'>there are 1,245 of 2,940 left</div> {/* how much NFT is left */}
                <h1 className="big_title">QUACKDUCKS</h1>
                <Snackbar
                    open={alertState.open}
                    autoHideDuration={
                        alertState.hideDuration === undefined ? 6000 : alertState.hideDuration
                    }
                    onClose={() => setAlertState({ ...alertState, open: false })}
                >
                    <Alert
                        onClose={() => setAlertState({ ...alertState, open: false })}
                        severity={alertState.severity}
                    >
                        {alertState.message}
                    </Alert>
                </Snackbar>
                {/* <h2 className='contentMain_btn'>MINT</h2> */}
            </div>

        </div>
    )
}

export default Wallet;
