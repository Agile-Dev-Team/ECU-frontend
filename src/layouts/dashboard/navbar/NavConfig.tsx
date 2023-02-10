// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  support: getIcon('ic_chat'),
  file: getIcon('ic_mail'),
  upload: getIcon('ic_invoice'),
};

export const sidebarUserConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'User',
    items: [
      { title: 'Upload File', path: '/dashboard/upload', icon: ICONS.upload },
      { title: 'My Files', path: '/dashboard/myfile', icon: ICONS.file },
      { title: 'My account', path: '/dashboard/account', icon: ICONS.user },
      { title: 'Cteate Support', path: '/dashboard/support', icon: ICONS.support },
    ],
  },
];

export const sidebarAdminConfig = [
  {
    subheader: 'ADMIN',
    items: [
      { title: 'Users', path: '/dashboard/admin/user/list', icon: ICONS.upload },
      { title: 'Files', path: '/dashboard/admin/files/list', icon: ICONS.file },
      { title: 'News', path: '/dashboard/admin/news/list', icon: ICONS.user },
      { title: 'Payments', path: '/dashboard/admin/payments/list', icon: ICONS.support },
    ],
  },
];
