import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Unexpected application error",
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Audit Intelligence Hub error:", error, errorInfo);
  }

  resetApplication = () => {
    this.setState({ hasError: false, message: "" });
    window.location.hash = "#/";
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="release-status-page">
          <div className="release-status-card">
            <span className="release-status-code">Application error</span>
            <h1>Audit Intelligence Hub could not load this view.</h1>
            <p>{this.state.message}</p>
            <button type="button" onClick={this.resetApplication}>
              Return to dashboard
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
