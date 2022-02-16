import sdk from "./1-initialize-sdk.js";
import { bundleDrop } from "./utils.js";

(async () => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory()

        // specify condition
        claimConditionFactory.newClaimPhase({
            startTime: new Date(),  // * the time users can start ,omtomg 
            maxQuantity: 50_000, // * available to be minted
            maxQuantityPerTransaction: 1, // *how many can be claimed in 1 transaction
        })

        await bundleDrop.setClaimCondition(0, claimConditionFactory)
        console.log('✅ Successfully set claim condition on bundle drop:', bundleDrop.address)
    } catch (error) {
        console.error('Failed to set claim condition', error)
    }
})()
