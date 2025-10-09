import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-luxury flex items-center justify-center px-4">
          <div className="text-center text-white max-w-lg mx-auto">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-secondary" />
            <h1 className="text-4xl font-serif font-bold mb-4">Something went wrong</h1>
            <p className="text-lg opacity-90 mb-8">
              We're sorry, but something unexpected happened. Please try refreshing the page or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="bronze"
                size="lg"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={this.handleReset}
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Go to Homepage
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-black/20 p-4 rounded-lg">
                <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
                <pre className="text-xs overflow-auto">{this.state.error.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
