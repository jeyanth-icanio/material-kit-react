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
    path: '/admin',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Projects',
    path: '/admin/projects',
    icon: icon('ic-folder'),
  },
  {
    title: 'Pipelines',
    path: '/admin/pipelines',
    icon: icon('ic-git-branch'),
  },
  {
    title: 'Builds',
    path: '/admin/builds',
    icon: icon('ic-play'),
  },
  {
    title: 'Agents',
    path: '/admin/agents',
    icon: icon('ic-server'),
  },
];
