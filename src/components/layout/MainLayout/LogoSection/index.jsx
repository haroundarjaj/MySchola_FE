import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

import logo from 'assets/images/MyScholaLogoWithTitle.png';

// project imports
import config from 'config';
import { menuOpen } from 'store/slices/customizationSlice';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch(menuOpen(defaultId))} component={Link} to={config.defaultPath}>
      <img src={logo} alt="MySchola" width="150" />
    </ButtonBase>
  );
};

export default LogoSection;
