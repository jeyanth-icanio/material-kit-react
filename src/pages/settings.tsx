import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SettingsView = lazy(() => import('src/sections/settings/view/settings-view'));

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return <SettingsView />;
}

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/admin" replace />,
  },
  // ...existing routes...
]; 