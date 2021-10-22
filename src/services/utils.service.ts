import Firebase from "firebase/app";

export function snapshotToArray<T>(
  snapshot: Firebase.database.DataSnapshot
): T[] {
  const returnArr: T[] = [];

  snapshot.forEach(function (childSnapshot) {
    const item = childSnapshot.val();
    item.id = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
}

export function timestampsToDates(datesAsTimestamps: number[]): Date[] {
  return datesAsTimestamps.map((timestamp: number) => new Date(timestamp));
}

export function getTheLargestNumber(arr: number[]) {
  return arr.reduce(function (accumulatedValue, currentValue) {
    return Math.max(accumulatedValue, currentValue);
  });
}

export function isValidHttpUrl(input: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(input);
}
