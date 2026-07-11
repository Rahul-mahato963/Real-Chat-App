import { User } from "../models/userModel.js";

const STALE_EMAIL_INDEX = "email_1";

export const ensureUserIndexes = async () => {
    const indexes = await User.collection.indexes();
    const hasStaleEmailIndex = indexes.some((index) => index.name === STALE_EMAIL_INDEX);

    if (hasStaleEmailIndex) {
        await User.collection.dropIndex(STALE_EMAIL_INDEX);
        console.log(`Dropped stale users index: ${STALE_EMAIL_INDEX}`);
    }

    await User.syncIndexes();
};
