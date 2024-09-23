// assets
import {
  IconMoodCog,
  IconUserCog,
  IconUsersGroup,
  IconLockCog,
  IconUsers,
  IconChalkboard,
  IconBackpack,
  IconCertificate2Off,
  IconCalendarStats,
  IconBrandCashapp,
  IconBrandMastercard,
  IconSchool,
  IconBooks,
  IconScoreboard,
  IconBallpen
} from '@tabler/icons-react';

// ==============================|| VIEWS MENU ITEMS ||============================== //

const views = {
  id: 'sample-docs-roadmap',
  title: 'Pages',
  caption: 'Management sections',
  type: 'group',
  children: [
    {
      id: 'hr-management',
      title: 'HR Management',
      type: 'collapse',
      icon: IconUsers,
      children: [
        {
          id: 'teachers',
          title: 'Teachers',
          type: 'item',
          url: '/teachers',
          icon: IconChalkboard,
        },
        {
          id: 'students',
          title: 'Students',
          type: 'item',
          url: '/students',
          icon: IconBackpack,
        },
        {
          id: 'absence-management',
          title: 'Absence Management',
          type: 'item',
          url: '/absence-management',
          icon: IconCertificate2Off,
        },
        {
          id: 'timetables',
          title: 'Timetables',
          type: 'item',
          url: '/timetables',
          icon: IconCalendarStats,
        }
      ]
    },
    {
      id: 'financial-management',
      title: 'Financial Management',
      type: 'collapse',
      icon: IconBrandCashapp,
      children: [
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          url: '/payments',
          icon: IconBrandMastercard,
        }
      ]
    },
    {
      id: 'education-management',
      title: 'Education Management',
      type: 'collapse',
      icon: IconSchool,
      children: [
        {
          id: 'school-subjects',
          title: 'School Subjects',
          type: 'item',
          url: '/school-subjects',
          icon: IconBooks,
        },
        {
          id: 'course-management',
          title: 'Course Management',
          type: 'item',
          url: '/course-management',
          icon: IconScoreboard,
        },
        {
          id: 'class-management',
          title: 'Class Management',
          type: 'item',
          url: '/class-management',
          icon: IconBallpen,
        }
      ]
    },
    {
      id: 'administration',
      title: 'Administration',
      type: 'collapse',
      icon: IconUserCog,
      children: [
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: '/users',
          icon: IconUsersGroup,
          // target: true
        },
        {
          id: 'roles',
          title: 'Roles',
          type: 'item',
          url: '/roles',
          icon: IconMoodCog,
        },
        {
          id: 'permissions',
          title: 'Permissions',
          type: 'item',
          url: '/permissions',
          icon: IconLockCog,
        }
      ]
    }
  ]
};

export default views;
