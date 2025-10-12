import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid, Button } from '@mui/material';
import AITextAssistDialog from './AITextAssistDialog';
import { getAIAssistance } from '../services/api';

const Step3Situation = () => {
  const { control, setValue, formState: { errors } } = useFormContext();
  const fields = [
    { name: 'financialSituation', label: 'Current Financial Situation' },
    { name: 'employmentCircumstances', label: 'Employment Circumstances' },
    { name: 'reasonForApplying', label: 'Reason for Applying' }
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleAIRequest = async (fieldName, fieldLabel) => {
    try {
      const prompt = 'I need help describing my ' + fieldLabel;
      const result = await getAIAssistance(prompt);
      setCurrentField(fieldName);
      setSuggestion(result);
      setDialogOpen(true);
    } catch (e) {
      alert('AI failed to generate response.');
    }
  };

  const handleAccept = () => {
    setValue(currentField, suggestion);
    setDialogOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} sx={{marginTop: "20px"}}>
        {fields.map((field) => (
          <Grid item xs={12} key={field.name}>
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              rules={{ required: `${field.label} is required` }}
              render={({ field: controllerField }) => (
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label={field.label}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  {...controllerField}
                  sx={{ minHeight: '130px' }}
                />
              )}
            />
            <Button variant="outlined" onClick={() => handleAIRequest(field.name, field.label)} sx={{ mt: 1 }}>
              Help Me Write
            </Button>
          </Grid>
        ))}
      </Grid>

      <AITextAssistDialog
        open={dialogOpen}
        suggestion={suggestion}
        onClose={() => setDialogOpen(false)}
        onAccept={handleAccept}
        onChange={setSuggestion}
      />
    </>
  );
};

export default Step3Situation;
