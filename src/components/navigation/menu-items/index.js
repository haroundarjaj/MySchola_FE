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
  IconBallpen,
  IconDashboard
} from '@tabler/icons-react';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (tNavigation) => ([
  {
    id: 'dashboard',
    title: tNavigation('dashboard'),
    type: 'group',
    children: [
      {
        id: 'default',
        title: tNavigation('dashboard'),
        type: 'item',
        url: '/dashboard',
        icon: IconDashboard,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'sample-docs-roadmap',
    title: tNavigation('pages'),
    caption: tNavigation('management_section'),
    type: 'group',
    children: [
      {
        id: 'hr-management',
        title: tNavigation('HR'),
        type: 'collapse',
        icon: IconUsers,
        children: [
          {
            id: 'teachers',
            title: tNavigation('teachers'),
            type: 'item',
            url: '/teachers',
            icon: IconChalkboard,
          },
          {
            id: 'students',
            title: tNavigation('students'),
            type: 'item',
            url: '/students',
            icon: IconBackpack,
          },
          {
            id: 'absence-management',
            title: tNavigation('absence'),
            type: 'item',
            url: '/absence-management',
            icon: IconCertificate2Off,
          },
          {
            id: 'timetables',
            title: tNavigation('timetables'),
            type: 'item',
            url: '/timetables',
            icon: IconCalendarStats,
          }
        ]
      },
      {
        id: 'financial-management',
        title: tNavigation('financial'),
        type: 'collapse',
        icon: IconBrandCashapp,
        children: [
          {
            id: 'payments',
            title: tNavigation('payments'),
            type: 'item',
            url: '/payments',
            icon: IconBrandMastercard,
          }
        ]
      },
      {
        id: 'education-management',
        title: tNavigation('education'),
        type: 'collapse',
        icon: IconSchool,
        children: [
          {
            id: 'school-subjects',
            title: tNavigation('school_subjects'),
            type: 'item',
            url: '/school-subjects',
            icon: IconBooks,
          },
          {
            id: 'course-management',
            title: tNavigation('course'),
            type: 'item',
            url: '/course-management',
            icon: IconScoreboard,
          },
          {
            id: 'class-management',
            title: tNavigation('class'),
            type: 'item',
            url: '/class-management',
            icon: IconBallpen,
          }
        ]
      },
      {
        id: 'administration',
        title: tNavigation('administration'),
        type: 'collapse',
        icon: IconUserCog,
        children: [
          {
            id: 'users',
            title: tNavigation('users'),
            type: 'item',
            url: '/users',
            icon: IconUsersGroup,
            // target: true
          },
          {
            id: 'roles',
            title: tNavigation('roles'),
            type: 'item',
            url: '/roles',
            icon: IconMoodCog,
          },
          {
            id: 'permissions',
            title: tNavigation('permissions'),
            type: 'item',
            url: '/permissions',
            icon: IconLockCog,
          }
        ]
      }
    ]
  }]);

export default menuItems;
