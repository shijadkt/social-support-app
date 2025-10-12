import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Step1PersonalInfo = () => {
  const { t } = useTranslation();
  const { control, formState: { errors } } = useFormContext();

  const fields = [
  { name: 'name', label: t('name'), type: 'text', required: true },
  { name: 'nationalId', label: t('nationalId'), type: 'number', required: true },
  { name: 'dob', label: t('dateOfBirth'), type: 'date', required: true },
  { name: 'gender', label: t('gender'), type: 'text', required: true },
  { name: 'address', label: t('address'), type: 'text', required: true },
  { name: 'city', label: t('city'), type: 'text', required: true },
  { name: 'state', label: t('state'), type: 'text', required: true },
  { name: 'country', label: t('country'), type: 'text', required: true },
  {
    name: 'phone',
    label: t('phone'),
    type: 'text',
    required: true,
    pattern: /^[0-9]{10}$/
  },
  {
    name: 'email',
    label: t('email'),
    type: 'email',
    required: true,
    pattern: /^\S+@\S+$/i
  }
];


  return (
    <Grid container spacing={2} sx={{marginTop: "20px"}}>
      {fields.map(({ name, label, required, type, pattern }) => (
        <Grid item xs={12} sm={4} md={4} key={name}>
          <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={{
              required: required ? `${label} is required` : false,
              pattern: pattern ? {
                value: pattern,
                message: `Invalid ${label.toLowerCase()}`
              } : undefined
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                label={label}
                type={type === 'date' ? 'date' : type}
                InputLabelProps={type === 'date' ? { shrink: true } : {}}
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

export default Step1PersonalInfo;
