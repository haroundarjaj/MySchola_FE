import customizationReducer from './slices/customizationSlice';
import authReducer from './slices/authSlice'
import roleReducer from './slices/roleSlice'
import permissionReducer from './slices/permissionSlice'

const reducers = {
  customization: customizationReducer,
  auth: authReducer,
  role: roleReducer,
  permission: permissionReducer,
};

export default reducers;
