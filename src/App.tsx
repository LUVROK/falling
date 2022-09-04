import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Wallet from "./components/Wallet/Wallet"
import React, { FC, useState, useEffect, useMemo } from 'react';
import './App.css';
import background_centr from './images/background_centr.png';
import Ellipse from './images/Ellipse.png';
import grain from './images/faq-bg-deco.png';
import Leaves from "./components/leaves/leaves";
import Preloader from "./components/preloader/preloader";

export default function App() {

  const wallet = useAnchorWallet();

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
      const el = document.querySelector(".preloader") as HTMLDivElement | null;
      // const el = document.querySelector(".WalletStyle") as HTMLDivElement | null;
      if (el != null) {
        el.style.background = "#292929";
        // el.style.opacity = '0';
      }
    } else {
      const el = document.querySelector(".preloader") as HTMLDivElement | null;
      // const el = document.querySelector(".WalletStyle") as HTMLDivElement | null;
      if (el != null) {
        el.style.background = "none";
        el.style.opacity = '0';
      }
      // document.getElementById("hero_sect_main").style = "opacity: 1; !important";
      // document.body.style.overflowY = "scroll";
      // const el = document.querySelector(".WalletStyle") as HTMLDivElement | null;
      // if (el != null) {
      //   el.style.background = "url(./images/photo-1504788363733-507549153474.png) no-repeat";
      // }
    }
  }, [isrender]);

  return (
    <div className='WalletStyle'>
      {
        !isrender && <Preloader />
      }
      <Leaves />
      <img src={background_centr} alt="" className="quackDuck" />
      <img src={Ellipse} alt="" className="quackDuck ellips" />
      <img src={grain} className="grain" alt="" />
      <div className='WalletStyleBlur'>
        {/* <p>Anchor wallet: {wallet && wallet.publicKey.toBase58()}</p> */}
        <Wallet />
      </div>
    </div>
  );
}
