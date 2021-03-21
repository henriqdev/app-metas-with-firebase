import firebase from 'firebase/app'

firebase.initializeApp(process.env.firebaseConfig)

/**
* @return {Interface} returns Firestore
*/
export const firestore = () => {
  return firebase.firestore()
}
/**
 * @param  {String} collectionName - Firestore collection name
 * @param  {String} id - Uid to assign to a doc in firestore collection
 */
export const userRef = (collectionName, id) => {
  return firestore().collection(collectionName).doc(id)
}
