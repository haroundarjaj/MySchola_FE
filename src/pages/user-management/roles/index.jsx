// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from 'store/slices/roleSlice';

// ==============================|| SAMPLE PAGE ||============================== //

const RolesPage = () => {

  const dispatch = useDispatch();
  const { roles, fetched } = useSelector((state) => state.role)

  const fetchData = async () => {
    try {
      await dispatch(fetchRoles()).unwrap().then((response) => {
        console.log(response)
        console.log(roles)
        console.log(fetched)
      });
      if (fetched) {
        console.log(roles)
      } else console.log("not fetched")
    }
    catch (error) {
      console.log(error)
      alert(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (<MainCard title="Sample Card">
    <Typography variant="body2">
      Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
      minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended
      in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate
      descent molls anim id est labours.
    </Typography>
  </MainCard>)
};

export default RolesPage;
