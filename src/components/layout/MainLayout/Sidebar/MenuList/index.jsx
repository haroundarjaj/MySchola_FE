// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'components/navigation/menu-items';
import { useTranslation } from 'react-i18next';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const tNavigation = useTranslation("navigation").t;

  const navItems = menuItem(tNavigation).map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
