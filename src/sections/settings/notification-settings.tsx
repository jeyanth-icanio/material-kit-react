import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    buildStatus: true,
    deploymentStatus: true,
    securityAlerts: true,
    teamInvites: true,
    weeklyDigest: false,
    marketingEmails: false,
  });
  const [pushNotifications, setPushNotifications] = useState({
    buildStatus: true,
    deploymentStatus: false,
    securityAlerts: true,
    teamActivity: false,
  });
  const [success, setSuccess] = useState('');

  const handleEmailChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotifications(prev => ({ ...prev, [field]: event.target.checked }));
  };
  const handlePushChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPushNotifications(prev => ({ ...prev, [field]: event.target.checked }));
  };
  const handleSave = () => {
    setSuccess('Notification settings saved!');
    // Here you would call your API to save notification settings
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Notification Settings
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: 500 }}>
        <Divider>Email Notifications</Divider>
        <FormControlLabel
          control={<Switch checked={emailNotifications.buildStatus} onChange={handleEmailChange('buildStatus')} />}
          label="Build Status Updates"
        />
        <FormControlLabel
          control={<Switch checked={emailNotifications.deploymentStatus} onChange={handleEmailChange('deploymentStatus')} />}
          label="Deployment Status Updates"
        />
        <FormControlLabel
          control={<Switch checked={emailNotifications.securityAlerts} onChange={handleEmailChange('securityAlerts')} />}
          label="Security Alerts"
        />
        <FormControlLabel
          control={<Switch checked={emailNotifications.teamInvites} onChange={handleEmailChange('teamInvites')} />}
          label="Team Invitations"
        />
        <FormControlLabel
          control={<Switch checked={emailNotifications.weeklyDigest} onChange={handleEmailChange('weeklyDigest')} />}
          label="Weekly Activity Digest"
        />
        <FormControlLabel
          control={<Switch checked={emailNotifications.marketingEmails} onChange={handleEmailChange('marketingEmails')} />}
          label="Marketing Emails"
        />
        <Divider>Push Notifications</Divider>
        <FormControlLabel
          control={<Switch checked={pushNotifications.buildStatus} onChange={handlePushChange('buildStatus')} />}
          label="Build Status Updates"
        />
        <FormControlLabel
          control={<Switch checked={pushNotifications.deploymentStatus} onChange={handlePushChange('deploymentStatus')} />}
          label="Deployment Status Updates"
        />
        <FormControlLabel
          control={<Switch checked={pushNotifications.securityAlerts} onChange={handlePushChange('securityAlerts')} />}
          label="Security Alerts"
        />
        <FormControlLabel
          control={<Switch checked={pushNotifications.teamActivity} onChange={handlePushChange('teamActivity')} />}
          label="Team Activity"
        />
        {success && <Typography color="success.main">{success}</Typography>}
        <Button variant="contained" onClick={handleSave}>
          Save Notification Settings
        </Button>
      </Stack>
    </Box>
  );
} 