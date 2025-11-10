import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DRAFT_STORAGE_KEY } from '../constants/constants';
import Step1PersonalInfo from '../components/Step1PersonalInfo';
import Step2FamilyFinancial from '../components/Step2FamilyFinancial';
import Step3Situation from '../components/Step3Situation';
import ProgressBar from '../components/ProgressBar';

const ApplicationWizard = () => {
  const { t } = useTranslation();
  const methods = useForm({ mode: 'onBlur' });
  const [activeStep, setActiveStep] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      try {
        const data = JSON.parse(savedDraft);
        methods.reset(data);
      } catch (e) {
        console.error('Error parsing draft:', e);
      }
    }
  }, [methods]);

  const steps = [
    <Step1PersonalInfo />,
    <Step2FamilyFinancial />,
    <Step3Situation />
  ];

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      // Submit form
      const data = methods.getValues();
      // Mock async submission
      try {
        await mockSubmitAPI(data);
        localStorage.removeItem(DRAFT_STORAGE_KEY); //removing from local storage
        methods.reset(); // clear form
        navigate('/result', { state: { success: true, message: t('submissionSuccess') } });
      } catch (error) {
        navigate('/result', { state: { success: false, message: t('submissionError') } });
      }
    }
  };

  const mockSubmitAPI = (data) => {
    // Simulate API delay and random success/failure
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve('Success');
        } else {
          reject(new Error('Mock API failure'));
        }
      }, 1000);
    });
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleSaveDraft = () => {
    try {
      const data = methods.getValues();
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
      setSnackbar({ open: true, message: t('draftSaved'), severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: t('saveDraftError'), severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <FormProvider {...methods}>
      <h5>Title</h5>
      <Box sx={{ maxWidth: 800, margin: 'auto', p: 2, mt: 4 }}>
        <ProgressBar step={activeStep} maxSteps={steps.length} />

        {steps[activeStep]}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            variant="outlined"
            onClick={handleBack}
          >
            {t('back')}
          </Button>

          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveDraft}
              sx={{ mr: 2 }}
            >
              {t('saveDraft')}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? t('submit') : t('next')}
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
};

export default ApplicationWizard;
