import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="release-status-page">
      <div className="release-status-card">
        <span className="release-status-code">404</span>
        <h1>Page not found</h1>
        <p>The requested Audit Intelligence Hub route does not exist.</p>
        <Link className="primary-link" to="/">
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
