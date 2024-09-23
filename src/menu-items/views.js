// assets
import {
  IconMoodCog,
  IconUserCog,
  IconUsersGroup
} from '@tabler/icons-react';

// constant
const icons = {
  IconUserCog,
  IconUsersGroup,
  IconMoodCog
};

// ==============================|| VIEWS MENU ITEMS ||============================== //

const views = {
  id: 'sample-docs-roadmap',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'users-manager',
      title: 'Users Manager',
      type: 'collapse',
      icon: icons.IconUserCog,
      children: [
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: '/users',
          icon: icons.IconUsersGroup,
          // target: true
        },
        {
          id: 'roles',
          title: 'Roles',
          type: 'item',
          url: '/roles',
          icon: icons.IconMoodCog,
        }
      ]
    }
  ]
};

export default views;
