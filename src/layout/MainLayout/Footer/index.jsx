import { useTheme } from "@emotion/react";
import { Link, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { drawerWidth } from 'store/constant';

const StyledFooter = styled("footer")(({ theme, open }) => ({
    color: theme.palette["Grey-700"],
    position: "fixed",
    bottom: 0,
    right: 0,
    fontSize: '0.7rem',
    backgroundColor: theme.palette.primary.light,
    marginLeft: open ? 0 : -(drawerWidth - 20),
    paddingTop: 5,
    width: open ? `calc(100% - ${drawerWidth}px)` : '100%'
}))

const Footer = () => {
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const theme = useTheme();
    return (
        <StyledFooter theme={theme} open={leftDrawerOpened}>
            <center>
                <Typography variant="subtitle2" component={Link} href="https://darcreation.net/portfolio" target="_blank" underline="hover">
                    Developed by: Haroun Darjaj {`\(darTech)`} &copy; 2024
                </Typography>
            </center>
        </StyledFooter>
    );
}

export default Footer;