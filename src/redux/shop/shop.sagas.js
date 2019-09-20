import { takeLatest, call, put, all } from "redux-saga/effects";

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

    // when we "yield" we make sure that every next code will wait for the previous code to finish
    const snapshot = yield collectionRef.get();

    // we could do const collectionsMap = convertSnapshotCollectionsToMap(snapshot) but it can be
    // a blocking code, when we use "takeEvery", it's non-blocking, because every action is handled
    // by a separate task
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
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
