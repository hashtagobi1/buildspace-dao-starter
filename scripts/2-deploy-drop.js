import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x37852ceE02adC882C9d648673C6D5ad2F93bA7E2");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // collection name
      name: "MusicDAO Membership",
      description: "A DAO to financially support under the radar musicians",
      image: readFileSync("scripts/assets/MusicDAO.png"),

      // pass in address of person who will receive proceeds of NFT sales in module
      // wer're not charging anyone, so 0x0 address
      // you can set address to your own if you want to charge for drop
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address
    );
    console.log("✅ bundleDrop meta: ", await bundleDropModule.getMetadata());
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})();

// ! app address: 0x37852ceE02adC882C9d648673C6D5ad2F93bA7E2
// ! module address: 0x1309BB92d68aB20B4382c37Aed7f8752c140E89D