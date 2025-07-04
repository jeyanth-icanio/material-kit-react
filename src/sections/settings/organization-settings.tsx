import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';


// ----------------------------------------------------------------------

type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joined: string;
  status: 'active' | 'pending';
};

export function OrganizationSettings() {
  const [org, setOrg] = useState({
    name: 'Minimal UI Team',
    website: 'https://minimals.cc',
    description: 'A team focused on creating beautiful user interfaces',
    location: 'San Francisco, CA',
  });
  const [members, setMembers] = useState([
    { id: 1, name: 'Alice', email: 'alice@minimals.cc', role: 'Owner' },
    { id: 2, name: 'Bob', email: 'bob@minimals.cc', role: 'Admin' },
    { id: 3, name: 'Carol', email: 'carol@minimals.cc', role: 'Member' },
  ]);
  const [success, setSuccess] = useState('');

  const handleOrgChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrg(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    setSuccess('Organization info updated!');
    // Here you would call your API to update the org info
  };

  const handleRemove = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Organization Settings
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: 600 }}>
        <TextField
          label="Organization Name"
          value={org.name}
          onChange={handleOrgChange('name')}
          fullWidth
        />
        <TextField
          label="Website"
          value={org.website}
          onChange={handleOrgChange('website')}
          fullWidth
        />
        <TextField
          label="Description"
          value={org.description}
          onChange={handleOrgChange('description')}
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          label="Location"
          value={org.location}
          onChange={handleOrgChange('location')}
          fullWidth
        />
        {success && <Typography color="success.main">{success}</Typography>}
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
        <Divider>Team Members</Divider>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map(member => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleRemove(member.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
} 