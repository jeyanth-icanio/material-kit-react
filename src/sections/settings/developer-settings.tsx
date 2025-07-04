import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';

export function DeveloperSettings() {
  // Mock integration and cron job data
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [cronJobs, setCronJobs] = useState([
    { id: 1, name: 'Nightly Build', schedule: '0 2 * * *', enabled: true },
    { id: 2, name: 'Weekly Report', schedule: '0 8 * * 1', enabled: false },
  ]);

  const handleToggleEmail = () => setEmailEnabled((v) => !v);
  const handleToggleWebhook = () => setWebhookEnabled((v) => !v);
  const handleToggleCron = (id: number) => {
    setCronJobs((jobs) => jobs.map((job) => job.id === id ? { ...job, enabled: !job.enabled } : job));
  };

  return (
    <Stack spacing={4}>
      {/* Email Integration */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Email Integration
        </Typography>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <FormControlLabel
            control={<Switch checked={emailEnabled} onChange={handleToggleEmail} />}
            label="Enable Email Integration"
          />
          <Box sx={{ mt: 2 }}>
            <TextField label="SMTP Server" size="small" sx={{ mr: 2 }} />
            <TextField label="Port" size="small" sx={{ mr: 2 }} />
            <TextField label="Sender Email" size="small" />
          </Box>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Test Email
          </Button>
        </Paper>
      </Box>

      <Divider />

      {/* Notification/Webhook Integration */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Notification & Webhook Integration
        </Typography>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <FormControlLabel
            control={<Switch checked={webhookEnabled} onChange={handleToggleWebhook} />}
            label="Enable Webhook Integration"
          />
          <Box sx={{ mt: 2 }}>
            <TextField label="Webhook URL" size="small" sx={{ mr: 2 }} />
            <Button variant="outlined">Send Test Notification</Button>
          </Box>
        </Paper>
      </Box>

      <Divider />

      {/* All Integrations (placeholder) */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          All Integrations
        </Typography>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            List and manage all connected integrations here. (Coming soon)
          </Typography>
        </Paper>
      </Box>

      <Divider />

      {/* Cron Jobs */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Cron Jobs
        </Typography>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            {cronJobs.map((job) => (
              <Box key={job.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {job.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {job.schedule}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FormControlLabel
                    control={<Switch checked={job.enabled} onChange={() => handleToggleCron(job.id)} />}
                    label={job.enabled ? 'Enabled' : 'Disabled'}
                  />
                  <IconButton size="small" color="error">
                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                  </IconButton>
                </Stack>
              </Box>
            ))}
            <Button variant="outlined" sx={{ mt: 2 }}>
              Add Cron Job
            </Button>
          </Stack>
        </Paper>
      </Box>

      <Divider />

      {/* Other Developer Tools (placeholder) */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Other Developer Tools
        </Typography>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            API tokens, environment variables, and more coming soon.
          </Typography>
        </Paper>
      </Box>
    </Stack>
  );
} 