import { getDatabase, ref, get } from "firebase/database";

const database = getDatabase();

export async function getCollection(uid: string) {
  const collectionRef = ref(database, `collection/${uid}`);
  const snapshot = await get(collectionRef);
  if (snapshot.exists()) {
    const collectionData = snapshot.val();
    const collectionArray: Collection[] = Object.entries(collectionData).map(
      ([key, value]) => ({
        uid: key,
        imageUrl: (value as any).imageUrl,
        prompt: (value as any).prompt,
        timestamp: (value as any).timestamp,
      })
    );

    return collectionArray;
  } else {
    return null;
  }
}
