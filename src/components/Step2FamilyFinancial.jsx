import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';

const Step2FamilyFinancial = () => {
  const { control, formState: { errors } } = useFormContext();

  const fields = [
    { name: 'maritalStatus', label: 'Marital Status', type: 'text', required: true },
    { name: 'dependents', label: 'Dependents', type: 'number', required: true },
    { name: 'employmentStatus', label: 'Employment Status', type: 'text', required: true },
    { name: 'monthlyIncome', label: 'Monthly Income', type: 'number', required: true },
    { name: 'housingStatus', label: 'Housing Status', type: 'text', required: true },
  ];

  return (
    <Grid container spacing={2} sx={{marginTop: "20px"}}>
      {fields.map(({ name, label, type, required }) => (
        <Grid item xs={12} sm={6} key={name}>
          <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={{
              required: required ? `${label} is required` : false
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                label={label}
                type={type}
                error={!!errors[name]}
                helperText={errors[name]?.message}
                {...field}
              />
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Step2FamilyFinancial;
