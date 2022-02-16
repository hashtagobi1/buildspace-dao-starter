import { readFileSync } from "fs";
import { bundleDrop } from "./utils";
(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Golden Microphone",
        description: "This gold plated mic gives you access to the MusicDAO",
        image: readFileSync("scripts/assets/goldMic.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create new NFT", error);
  }
})();
