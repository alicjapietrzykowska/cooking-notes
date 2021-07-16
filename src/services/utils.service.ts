import Firebase from 'firebase/app';

export function snapshotToArray(snapshot: Firebase.database.DataSnapshot) {
    const returnArr: any = [];

    snapshot.forEach(function(childSnapshot) {
        const item = childSnapshot.val();
        item.id = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};