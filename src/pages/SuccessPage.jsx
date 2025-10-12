import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DRAFT_STORAGE_KEY } from '../constants/constants';

const SuccessPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // location.state should contain { success: boolean, message: string } as passing from Application Wizard page
  const { state } = location;

  // If user accessed directly without state, redirect to wizard start
  React.useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null;

  const { success, message } = state;

  const handleBackToForm = () => {
    if (success) {
      // Clear localStorage and navigate to step 1 fresh
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      navigate('/', { replace: true });
    } else {
      // Navigate back to step 3 with form data intact
      navigate('/', { replace: true, state: { fromError: true } });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 3, textAlign: 'center' }}>
      <Alert severity={success ? 'success' : 'error'} sx={{ mb: 3 }}>
        {message}
      </Alert>

      <Button variant="contained" onClick={handleBackToForm}>
        {success ? t('backToStart') : t('backToStep3')}
      </Button>
    </Box>
  );
};

export default SuccessPage;
