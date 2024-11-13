import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { createRef } from 'react';
import ProfilePicture from "@dsalvagni/react-profile-picture";
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css";
import PropTypes from 'prop-types';
import { useNotification } from 'utils/NotificationProvider';
import { useTranslation } from 'react-i18next';

const profilePictureRef = createRef();

const ImageUploader = ({ image, isOpen, onClose, onSave }) => {

    const { showNotification } = useNotification();
    const tGeneral = useTranslation("general").t;

    const handleSave = () => {
        const PP = profilePictureRef.current;
        const imageAsDataURL = PP.getImageAsDataUrl(1);
        onSave(imageAsDataURL);
        onClose();
    }

    const handleError = (status) => {
        if (status === 'INVALID_FILE_TYPE') {
            showNotification(tGeneral("invalid_file_type_message"), "error")
        } else if (status === 'INVALID_IMAGE_SIZE') {
            showNotification(tGeneral("invalid_image_size_message"), "error")
        }
    };

    return (
        <Dialog
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            open={isOpen}
        >
            <DialogTitle>{tGeneral("upload_image")}</DialogTitle>
            <DialogContent>
                <ProfilePicture
                    ref={profilePictureRef}
                    image={image}
                    useHelper
                    frameFormat='circle'
                    frameSize={300}
                    cropSize={300}
                    onStatusChange={handleError}
                    minImageSize={300}
                    messages={
                        {
                            DEFAULT: tGeneral('image_tap'),
                            DRAGOVER: tGeneral('image_drop'),
                            INVALID_FILE_TYPE: tGeneral('invalid_file_type'),
                            INVALID_IMAGE_SIZE: tGeneral('invalid_image_size')
                        }
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{tGeneral("close")}</Button>
                <Button color='secondary' onClick={handleSave}>{tGeneral("save")}</Button>
            </DialogActions>
        </Dialog>
    )
}

ImageUploader.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    image: PropTypes.object
}

export default ImageUploader
