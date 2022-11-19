import React, { useState, useEffect } from "react";
import { ConnectButton } from "@web3uikit/web3";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";

const Header = () => {


  const [openMenu, setOpenMenu] = useState(false);
  const [numb, setNumb] = useState(0);
  useEffect(() => {
    document.addEventListener("click", () => {
      setOpenMenu(false);
    });
  }, []);

    const navigate = useNavigate();

  const { isInitialized, isAuthenticated } = useMoralis();
  
  useEffect(() => {
    const checkUser = () => (isAuthenticated ?  navigate("/Mint") : navigate("/"));
    isInitialized && checkUser();
  }, [isInitialized, isAuthenticated]);




  const InputAction = () => {
    return (
      <div className="menu-list flex items-center">
        <div className=" input-box flex items-center">
        </div>
        <div className="menu-item btn button">
          <ConnectButton />
        </div>
      </div>
    );
  };
  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <h2 className="dapp">
            Dapp
          </h2>
        </div>
        <div className="right flex items-center justify-end">
          <div className="right-meta flex items-center">
            <InputAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;