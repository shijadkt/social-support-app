import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Personal Info', 'Family & Financial', 'Situation'];

const ProgressBar = ({ step }) => {
  return (
    <Stepper activeStep={step}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default ProgressBar;
