import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/owner',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Projects',
    path: '/owner/projects',
    icon: icon('ic-folder'),
  },
  {
    title: 'Pipelines',
    path: '/owner/pipelines',
    icon: icon('ic-git-branch'),
  },
  {
    title: 'Builds',
    path: '/owner/builds',
    icon: icon('ic-play'),
  },
  {
    title: 'Agents',
    path: '/owner/agents',
    icon: icon('ic-server'),
  },
  {
    title: 'Settings',
    path: '/owner/settings',
    icon: icon('ic-settings'),
  },
];
