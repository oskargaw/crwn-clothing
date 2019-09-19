import { takeEvery, call, put } from "redux-saga/effects";

import {
  firestore,
  convertSnapshotCollectionsToMap
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  yield console.log("I am fired");

  try {
    const collectionRef = firestore.collection("collections");

    // when we "yield" we make sure that it will be a non-blocking code
    const snapshot = yield collectionRef.get();

    // we could do const collectionsMap = convertSnapshotCollectionsToMap(snapshot) but it can be
    // a blocking code, when we use "yield", it's non-blocking
    const collectionsMap = yield call(
      convertSnapshotCollectionsToMap,
      snapshot
    );

    // "put" is in redux-saga same as "dispatch" in redux-thunk
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  // the code above is the same as the commented code below, the only difference is that it uses sagas
  // collectionRef
  //   .get()
  //   .then(snapshot => {
  //     const collectionsMap = convertSnapshotCollectionsToMap(snapshot);

  //     dispatch(fetchCollectionSuccess(collectionsMap));
  //   })
  //   .catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
