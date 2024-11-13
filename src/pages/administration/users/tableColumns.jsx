import { Avatar, Chip, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { lazy } from "react";
import UserAvatar from 'assets/images/avatars/general-avatar.svg';
import { Delete, Edit } from "@mui/icons-material";

const renderUserInfoCell = (data, tableMeta, tGeneral, handleOpenImageViewer) => {
    const { rowIndex } = tableMeta;
    const info = data[rowIndex]
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ width: 250 }}
        >
            <Grid item xs={3}>
                <Avatar
                    alt={tGeneral('image')}
                    src={info.imageData || UserAvatar}
                    style={{ width: 50, height: 50 }}
                    onClick={info.imageData ? () => handleOpenImageViewer(info.imageData) : null}
                />
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body" fontWeight="800">{`${info.firstName} ${info.lastName}`}</Typography>
                <br />
                <Typography variant="caption">{info.email}</Typography>
            </Grid>
        </Grid>
    )
}
const tableColumns = (data, tGeneral, handleOpenImageViewer) => {
    return [
        {
            label: tGeneral('user'),
            name: 'imageData',
            options: {
                filter: false,
                sort: false,
                empty: true,
                download: false,
                customBodyRender: (value, tableMeta, updateValue) => renderUserInfoCell(data, tableMeta, tGeneral, handleOpenImageViewer)
            }
        },
        {
            label: tGeneral('first_name'),
            name: 'firstName',
            options: {
                display: false,
            }
        },
        {
            label: tGeneral('last_name'),
            name: 'lastName',
            options: {
                display: false,
                filter: false
            }
        },
        {
            label: tGeneral('phone_number'),
            name: 'phone',
            options: {
                filter: false,
            }
        },
        {
            label: tGeneral('email'),
            name: 'email',
            options: {
                display: false,
                filter: false
            }
        },
        {
            label: tGeneral('address'),
            name: 'address',
            options: {
                filter: false,
            }
        },
        {
            label: tGeneral('gender'),
            name: 'gender',
        },
        {
            label: tGeneral('birth_date'),
            name: 'birthDate',
            options: {
                filter: false,
            }
        },
        {
            label: tGeneral('activated'),
            name: 'activeState',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Chip
                        label={tGeneral(value)}
                        variant='filled'
                        color={value === "active" ? "success" : "error"}
                    />
                )
            }
        },
        {
            label: tGeneral('actions'),
            name: 'actions',
            options: {
                customBodyRender: () => (
                    <>
                        <Tooltip title={tGeneral("edit")}>
                            <IconButton>
                                <Edit color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={tGeneral("delete")}>
                            <IconButton>
                                <Delete color="error" />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
}

export default tableColumns;