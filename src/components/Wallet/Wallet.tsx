import { FC, useState, useEffect, useMemo } from 'react';
// import { InputChangeEventHandler } from '../types'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { NATIVE_MINT, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createSyncNativeInstruction, getAccount } from "@solana/spl-token";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Wallet.css';
import { walletButton } from "../../style/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Main from '../../Main';
// import LootboxComponent from '../../LootboxComponent';
// import $ from 'jquery';

import '../../App.css';

(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;
// declare global {
//     interface Window { solana: any; }
// }

export const Wallet: FC = () => {
    const { publicKey } = useWallet();
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const connection = new Connection(endpoint);
    const [balance, setBalance] = useState<Number>()

    const wallet = useAnchorWallet()

    useEffect(() => {
        send();
        // console.log((wallet?.publicKey.toBase58())?.toString())
        // console.log('вызов')
        if (publicKey != null) {
            // console.log('publicKey - ', (publicKey.toBase58())?.toString());
            // console.log(localStorage.getItem("publicKey"))
            // if (localStorage.getItem("publicKeyPhantom")) {
            //     localStorage.setItem("publicKeyPhantom", (publicKey.toBase58())?.toString());
            // }
            // console.log(localStorage.getItem("publicKeyPhantom"))
            if (getCookie('publicKeyPhantom') === undefined) {
                document.cookie = `publicKeyPhantom=${(publicKey.toBase58())?.toString()}`
            }
            // console.log('ggg - ' + getCookie('publicKeyPhantom'))

        }
        // console.log('balance -', balance)
        // console.log((wallet?.publicKey.toBase58())?.toString())
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


    const [isrender, setisrender] = useState(false);

    useEffect(() => {
        // console.log(1)
        setInterval(() => {
            setisrender(true);
        }, 3000);
    }, []);

    useEffect(() => {
        if (!isrender) {
            document.body.style.overflow = "hidden";
            const el = document.querySelector(".MainBrowserComp") as HTMLDivElement | null;
            if (el != null) {
                el.style.background = "#292929";
            }
        } else {
            // document.getElementById("hero_sect_main").style = "opacity: 1; !important";
            // document.body.style.overflowY = "scroll";
        }
        // $('#buttonSpin').on('click', function () {
        //     if (publicKey != null) {
        //         console.log('publicKey - WALLET TEST ', (publicKey.toBase58())?.toString())
        //     }
        // })
    }, [isrender]);

    return (
        <div className="App2">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: '20px', marginTop: '20px', position: 'absolute', right: 0, top: 0, fontSize: '36px', zIndex: '9999' }}>
                <WalletMultiButton style={walletButton} className="wl_btn" />
                <WalletDisconnectButton onClick={() => setBalance(0)} />
                <div style={{ color: 'white', position: 'relative', fontSize: '18px', fontFamily: 'RobotoSlab_Regular', padding: '0px 20px', whiteSpace: 'nowrap' }}>
                    <>
                        {balance?.toFixed(2)} SOL
                    </>
                </div>
            </div>
        </div>
    )
}

export default Wallet;
