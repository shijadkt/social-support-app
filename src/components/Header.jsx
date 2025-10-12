import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || 'en';

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr'; // change document direction
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">{t('appTitle')}</Typography>

        <Button color="inherit" onClick={toggleLanguage}>
          {currentLang === 'en' ? 'العربية' : 'English'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
