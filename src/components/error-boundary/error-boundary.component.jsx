import React from "react";

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  // it catches any errors catched in any children of this error boundary component
  // if any child wrapped between ErrorBoundary produces the error, the error is being passed as and argument
  // that's the more important method because it changes the state so we know that an error occured
  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }

  // this lifecycle method gives us the error which occured and some more info (e.x. which child crashed)
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
