import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
};

type Session = {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
};

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [apiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'CI/CD Pipeline',
      key: 'sk-...abc123',
      created: '2024-01-15',
      lastUsed: '2024-07-04',
      permissions: ['read', 'write'],
    },
    {
      id: '2',
      name: 'Mobile App',
      key: 'sk-...def456',
      created: '2024-03-20',
      lastUsed: '2024-07-03',
      permissions: ['read'],
    },
  ]);

  const [sessions] = useState<Session[]>([
    {
      id: '1',
      device: 'Chrome on MacBook Pro',
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      ip: '192.168.1.101',
      lastActive: '1 hour ago',
      current: false,
    },
    {
      id: '3',
      device: 'Firefox on Windows',
      location: 'New York, NY',
      ip: '203.0.113.1',
      lastActive: '2 days ago',
      current: false,
    },
  ]);

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleRevokeApiKey = (keyId: string) => {
    if (confirm('Are you sure you want to revoke this API key?')) {
      console.log('Revoking API key:', keyId);
      // Handle API key revocation logic here
    }
  };

  const handleRevokeSession = (sessionId: string) => {
    if (confirm('Are you sure you want to revoke this session?')) {
      console.log('Revoking session:', sessionId);
      // Handle session revocation logic here
    }
  };

  const handleRevokeAllSessions = () => {
    if (confirm('Are you sure you want to revoke all sessions except the current one?')) {
      console.log('Revoking all sessions');
      // Handle all sessions revocation logic here
    }
  };

  return (
    <Stack spacing={4}>
      {/* Two-Factor Authentication */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Two-Factor Authentication
        </Typography>
        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={twoFactorEnabled}
                onChange={handleTwoFactorToggle}
              />
            }
            label="Enable Two-Factor Authentication"
            labelPlacement="start"
            sx={{ justifyContent: 'space-between', ml: 0 }}
          />
          {twoFactorEnabled && (
            <Box sx={{ pl: 4 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Two-factor authentication adds an extra layer of security to your account.
              </Typography>
              <Button variant="outlined" size="small">
                Configure 2FA
              </Button>
            </Box>
          )}
        </Stack>
      </Box>

      <Divider />

      {/* API Keys */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="subtitle1">
            API Keys
          </Typography>
          <Button variant="contained" size="small">
            Generate New Key
          </Button>
        </Box>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Last Used</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>{key.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {key.key}
                    </Typography>
                  </TableCell>
                  <TableCell>{key.created}</TableCell>
                  <TableCell>{key.lastUsed}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      {key.permissions.map((permission) => (
                        <Chip
                          key={permission}
                          label={permission}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRevokeApiKey(key.id)}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider />

      {/* Active Sessions */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="subtitle1">
            Active Sessions
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleRevokeAllSessions}
          >
            Revoke All Sessions
          </Button>
        </Box>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Device</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Last Active</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        {session.device}
                      </Typography>
                      {session.current && (
                        <Chip
                          label="Current"
                          size="small"
                          color="primary"
                          sx={{ mt: 0.5 }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {session.ip}
                    </Typography>
                  </TableCell>
                  <TableCell>{session.lastActive}</TableCell>
                  <TableCell>
                    {!session.current && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRevokeSession(session.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
} 