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

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'My Account',
    items: [
      { title: 'My account', path: '/dashboard/account', icon: ICONS.user },
      { title: 'Upload File', path: '/dashboard/upload', icon: ICONS.upload },
      { title: 'My Files', path: '/dashboard/myfile', icon: ICONS.file },
      { title: 'Cteate Support', path: '/dashboard/support', icon: ICONS.support },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: '/dashboard/user',
        icon: ICONS.user,
        children: [
          { title: 'Four', path: '/dashboard/user/four' },
          { title: 'Five', path: '/dashboard/user/five' },
          { title: 'Six', path: '/dashboard/user/six' },
        ],
      },
    ],
  },
];

export default sidebarConfig;
