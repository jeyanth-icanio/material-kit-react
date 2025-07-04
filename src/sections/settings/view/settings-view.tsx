import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProfileSettings } from '../profile-settings';
import { AccountSettings } from '../account-settings';
import { BillingSettings } from '../billing-settings';
import { SecuritySettings } from '../security-settings';
import { DeveloperSettings } from '../developer-settings';
import { RepositorySettings } from '../repository-settings';
import { NotificationSettings } from '../notification-settings';
import { OrganizationSettings } from '../organization-settings';

// ----------------------------------------------------------------------

type SettingsTab = {
  value: string;
  label: string;
  icon: string;
  component: React.ReactNode;
  roles: string[];
};

const SETTINGS_TABS: SettingsTab[] = [
  {
    value: 'profile',
    label: 'Profile',
    icon: 'solar:user-bold-duotone',
    component: <ProfileSettings />,
    roles: ['user', 'admin', 'owner'],
  },
  {
    value: 'account',
    label: 'Account',
    icon: 'solar:user-id-bold-duotone',
    component: <AccountSettings />,
    roles: ['user', 'admin', 'owner'],
  },
  {
    value: 'security',
    label: 'Security',
    icon: 'solar:shield-keyhole-bold-duotone',
    component: <SecuritySettings />,
    roles: ['user', 'admin', 'owner'],
  },
  {
    value: 'organization',
    label: 'Organization',
    icon: 'solar:users-group-rounded-bold-duotone',
    component: <OrganizationSettings />,
    roles: ['admin', 'owner'],
  },
  {
    value: 'repository',
    label: 'Repository',
    icon: 'solar:folder-with-files-bold-duotone',
    component: <RepositorySettings />,
    roles: ['admin', 'owner'],
  },
  {
    value: 'notifications',
    label: 'Notifications',
    icon: 'solar:bell-bold-duotone',
    component: <NotificationSettings />,
    roles: ['user', 'admin', 'owner'],
  },
  {
    value: 'billing',
    label: 'Billing',
    icon: 'solar:card-bold-duotone',
    component: <BillingSettings />,
    roles: ['owner'],
  },
  {
    value: 'developer',
    label: 'Developer',
    icon: 'solar:code-bold-duotone',
    component: <DeveloperSettings />,
    roles: ['admin', 'owner', 'developer'],
  },
];

// Mock user role and permissions - in real app, this would come from auth context
const USER_ROLE = 'admin';
const USER_PERMISSIONS = {
  developerAccess: false, // set to true to simulate owner-granted access for a user
};

export function SettingsView() {
  const [currentTab, setCurrentTab] = useState('profile');

  // Filter tabs based on role and developerAccess permission
  const filteredTabs = SETTINGS_TABS.filter((tab) => {
    if (tab.value === 'developer') {
      return USER_ROLE === 'admin' || USER_ROLE === 'owner' || USER_PERMISSIONS.developerAccess;
    }
    return tab.roles.includes(USER_ROLE);
  });

  const currentTabData = filteredTabs.find((tab) => tab.value === currentTab);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  // Sync tab with URL hash
  useEffect(() => {
    if (window.location.hash) {
      const hashTab = window.location.hash.replace('#', '');
      if (filteredTabs.some(tab => tab.value === hashTab)) {
        setCurrentTab(hashTab);
      }
    }
  }, [filteredTabs]);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Manage your account settings and preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Settings Navigation */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            position: { md: 'sticky' },
            top: { md: 64 },
            alignSelf: 'flex-start',
            zIndex: 1,
          }}
        >
          <Card sx={{ p: 2 }}>
            <Tabs
              value={currentTab}
              onChange={handleChangeTab}
              orientation="vertical"
              sx={{
                '& .MuiTabs-indicator': {
                  left: 0,
                  width: 3,
                },
                '& .MuiTab-root': {
                  minHeight: 48,
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  '&.Mui-selected': {
                    fontWeight: 'fontWeightSemiBold',
                  },
                },
              }}
            >
              {filteredTabs.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={tab.label}
                  icon={
                    <Box
                      component="span"
                      sx={{
                        width: 20,
                        height: 20,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={tab.icon as any} width={20} height={20} />
                    </Box>
                  }
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Card>
        </Grid>

        {/* Settings Content */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card>
            <Box sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {currentTabData?.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Manage your {currentTabData?.label.toLowerCase()} settings
                  </Typography>
                </Box>

                <Divider />

                {currentTabData?.component}
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

export default SettingsView; 