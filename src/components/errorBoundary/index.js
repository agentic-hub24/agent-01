import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // TODO: add custom error page
      return <h1>Something went wrong 🔥</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
