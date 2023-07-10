import React, { ReactNode } from "react";

import { ErrorPage } from "./ErrorPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { error: unknown | null }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { error: error };
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}
