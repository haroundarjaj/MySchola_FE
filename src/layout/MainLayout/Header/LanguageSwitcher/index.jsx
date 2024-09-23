import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import enFlag from 'assets/images/flags/US.svg';
import frFlag from 'assets/images/flags/FR.svg';
import esFlag from 'assets/images/flags/ES.svg';

function LanguageSwitcher(props) {
  const { i18n } = useTranslation();
  const languages = [
    { id: 'en', title: 'English', flag: enFlag },
    { id: 'fr', title: 'Frensh', flag: frFlag },
    { id: 'es', title: 'Spanish', flag: esFlag },
  ]
  const currentLanguage = languages.filter(lng => lng.id === i18n.language)[0];

  const [menu, setMenu] = useState(null);

  const langMenuClick = (event) => {
    setMenu(event.currentTarget);
    console.log(currentLanguage)
  };

  const langMenuClose = () => {
    setMenu(null);
  };

  const handleLanguageChange = (lng) => {
    console.log(lng)
    i18n.changeLanguage(lng)
    langMenuClose();
  }

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language])

  return (
    <>
      <Button className="h-40 w-64" onClick={langMenuClick}>
        <img
          className="mx-4 min-w-20 max-w-30"
          src={currentLanguage.flag}
          alt={currentLanguage.title}
        />

        <Typography className="mx-4 font-semibold uppercase" color="text.secondary">
          {currentLanguage.id}
        </Typography>
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng.id)}>
            <ListItemIcon className="min-w-40">
              <img
                className="min-w-20"
                src={lng.flag}
                alt={lng.title}
              />
            </ListItemIcon>
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default LanguageSwitcher;