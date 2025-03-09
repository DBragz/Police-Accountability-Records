import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Welcome to Police Accountability Records</div>} />
          <Route path="/incidents" element={<div>Incidents List</div>} />
          <Route path="/submit" element={<div>Submit Incident</div>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;