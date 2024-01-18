import { ErrorBoundary } from 'react-error-boundary';
import RegistrationForm from './Component/RegistrationForm';
import TableUser from './Component/TableUser';

const MyErrorFallback: React.FC<{ error: Error, resetErrorBoundary: () => void }> = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const App: React.FC = () => (
  <ErrorBoundary FallbackComponent={MyErrorFallback}>
    {/* Your components go here */}
    <RegistrationForm />
    <div style={{marginTop:'20px'}}>
    <TableUser/>
    </div>
  </ErrorBoundary>
);
export default App;