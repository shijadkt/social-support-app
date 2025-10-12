import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import { AppProvider } from './context/AppContext';
import ApplicationWizard from './pages/ApplicationWizard';
import SuccessPage from './pages/SuccessPage';
import Header from './components/Header';

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <Header/>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<ApplicationWizard />} />
          <Route path="/result" element={<SuccessPage />} />
        </Routes>
      </Container>
    </AppProvider>
  );
}

export default App;
