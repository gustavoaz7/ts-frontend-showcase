import React, { Component } from 'react'

type ErrorBoundaryState = {
  error: Error | null,
}

export class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  state = {
    error: null,
  };

  componentDidCatch(error: Error) {
    this.setState({
      error: error,
    })
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <br />
          <p>Please try to go to the <a href="/">home page</a></p>
        </div>
      );
    }

    return this.props.children;
  }
};
