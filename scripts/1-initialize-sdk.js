import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// config our .env file 6o securely store env variables
import dotenv from "dotenv";
dotenv.config();

// check env
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log("🛑 -> Private key not found");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
  console.log("🛑 Alchemy API URL not found.");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
  console.log("🛑 Wallet Address not found.");
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // @ts-ignore
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);
(async () => {
  try {
    const apps = await sdk.getApps();
    console.log("Your app address: ", apps[0].address);
  } catch (err) {
    console.error("Failed to get app from sdk", err);
    process.exit(1);
  }
})();

export default sdk;

// ! app address
// * 0x37852ceE02adC882C9d648673C6D5ad2F93bA7E2