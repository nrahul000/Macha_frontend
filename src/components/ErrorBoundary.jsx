import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }
  
  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a1120]">
          <div className="max-w-md w-full bg-[#111c30] p-6 rounded-xl border border-[#1e304d] shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6">
              <AlertOctagon size={32} className="text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
            <p className="text-slate-400 mb-6">
              We're sorry, but there was an error loading this part of the page. You can try refreshing the page or contact support if the problem persists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#4dc8e7] hover:bg-[#3bb5d4] text-white rounded-lg transition-colors"
              >
                <RefreshCw size={18} />
                <span>Try Again</span>
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1c2c44] hover:bg-[#283a59] text-white rounded-lg transition-colors border border-[#1e304d]"
              >
                <span>Refresh Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
