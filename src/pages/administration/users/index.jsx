import Typography from '@mui/material/Typography';

import MainCard from 'components/ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GeneralTable from 'components/ui-component/GeneralTable/GeneralTable';
import { getAll } from 'services/UserService';
import { useNotification } from 'utils/NotificationProvider';
import tableColumns from './tableColumns';
import ImageViewer from 'components/ui-component/ImageViewer';


const UsersPage = () => {
  const tAdministration = useTranslation("administration").t;
  const tGeneral = useTranslation("general").t;
  const { showNotification } = useNotification();

  const [users, setUsers] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleUserPreview = (user) => {
    console.log(user)
  }

  const handleOpenImageViewer = (image) => {
    setCurrentImage(image);
    setIsViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setIsViewerOpen(false);
    setTimeout(() => {
      setCurrentImage(null);
    }, 500)

  };

  useEffect(() => {
    getAll().then(response => {
      console.log(response.data)
      setUsers(response.data)
    }).catch(err => {
      showNotification(err.reponse?.data?.code, "error")
    })
  }, [])

  return (
    <>
      <MainCard >
        <GeneralTable
          data={users}
          columns={tableColumns(users, tGeneral, handleOpenImageViewer)}
          showPreviewButton
          onPreview={handleUserPreview}
          selectableRows='single'
        // showAddButton={ability.can("ADD", "ROLE")}
        // showEditButton={ability.can("EDIT", "ROLE")}
        // showDeleteButton={ability.can("DELETE", "ROLE")}
        // showPreviewButton={false}
        // onAdd={handleOpenAddEditRoleDialog}
        // onEdit={handleOpenEdit}
        // onDelete={onDelete}
        />
      </MainCard>
      <ImageViewer open={isViewerOpen} handleClose={handleCloseImageViewer} image={currentImage} />
    </>
  )
}

export default UsersPage;
