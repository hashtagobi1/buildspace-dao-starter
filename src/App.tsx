import React, { useState, useEffect, useMemo } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
const sdk = new ThirdwebSDK("rinkeby");

const bundleDrop = sdk.getBundleDropModule(
  "0x1309BB92d68aB20B4382c37Aed7f8752c140E89D"
);
const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  // set loading states for claiming NFT
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  // ! required to sign transactions on the blockchain, (allows us to WRITE)
  //
  const signer = provider ? provider.getSigner() : undefined;
  console.log(signer);

  useEffect(() => {
    // pass signer to SDL, (enable us interact with contract)
    if (signer) {
      sdk.setProviderOrSigner(signer);
    }
  }, [signer]);

  useEffect(() => {
    if (!address) {
      return;
    }

    // check user has NFT by looking at balance of module
    // TOKEN ID:
    // console.log(bundleDrop.balanceOf(address, "0"));

    const checkNft = () => {
      bundleDrop
        .balanceOf(address, "0")
        .then((balance) => {
          console.log(balance);

          // If balance is greater than 0, they have our NFT!
          if (balance.gt(0)) {
            console.log("🌟 this user has a membership NFT!");
            setHasClaimedNFT(true);
          } else {
            console.log("😭 this user doesn't have a membership NFT.");
            setHasClaimedNFT(false);
          }
        })
        .catch((error) => {
          console.error("failed to nft balance", error);
          setHasClaimedNFT(false);
        });
    };

    checkNft();
  }, [address]);

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to MusicDAO🎤</h1>
        <h2>
          A DAO created to financially support talented musicians who are flying
          under the radar. By musicians, for musicians.
        </h2>
        <button
          onClick={() => connectWallet("injected")}
          className="btn btn-primary"
        >
          Connect Your Wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>MusicDAO Member Page</h1>
        <p>Welcome to the future of music labels.</p>
      </div>
    );
  }

  console.log("add:", address);
  console.log("claimed?", hasClaimedNFT);
  console.log("fuck");

  const mintNFT = () => {
    setIsClaiming(true);
    setHasClaimedNFT(false);

    // call the bundledropmodule to mint nft to users wallet
    bundleDrop
      .claim("0", 1)
      .then(() => {
        // set claim state
        setHasClaimedNFT(true);

        // show user their fancy new NFT
        console.log(
          `🌊 Successfully minted! Check it out on OpenSea https://testnets.opensea.io/assets/${bundleDrop.address.toLowerCase()}/0`
        );
        return (
          <h2>
            🌊 Successfully minted! Check it out on OpenSea
            https://testnets.opensea.io/assets/$
            {bundleDrop.address.toLowerCase()}/0
          </h2>
        );
      })
      .catch((err) => {
        console.error("Failed to Claim", err);
      })
      .finally(() => {
        setIsClaiming(false);
      });
  };

  return (
    <>
      <div className="landing">
        <div className="mint-nft">
          <h1>Mint Your FREE MusicDAO Membership NFT... 👀 </h1>
          <button disabled={isClaiming} onClick={() => mintNFT()}>
            {isClaiming ? "Minting..." : "Mint NFT (for free btw )"}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
