import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collection/collection.component";

import {
  firestore,
  convertSnapshotCollectionsToMap
} from "../../firebase/firebase.utils";

import { updateCollections } from "../../redux/shop/shop.actions";

// because in App.js we already have this page nested in Route component, we get by default 3 props:
// match, history, location
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertSnapshotCollectionsToMap(snapshot);
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collecionsMap => dispatch(updateCollections(collecionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
