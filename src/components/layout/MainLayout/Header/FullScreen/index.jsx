import { Avatar, ButtonBase, useTheme } from "@mui/material";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";
import { useState } from "react";

const FullScreenButton = () => {
    const theme = useTheme();

    const [isFull, setIsFull] = useState(false);

    const handleToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFull(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFull(false)
            }
        }
    }

    return (
        <ButtonBase sx={{ borderRadius: '12px' }}>
            <Avatar
                variant="rounded"
                sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.primary.light,
                    color: theme.palette.primary.dark,
                    ml: 2,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                        background: theme.palette.primary.dark,
                        color: theme.palette.primary.light
                    }
                }}
                onClick={handleToggle}
                color="inherit"
            >
                {isFull ?
                    <IconArrowsMinimize stroke={1.5} size="1.3rem" />
                    :
                    <IconArrowsMaximize stroke={1.5} size="1.3rem" />
                }
            </Avatar>
        </ButtonBase>
    )
}

export default FullScreenButton;