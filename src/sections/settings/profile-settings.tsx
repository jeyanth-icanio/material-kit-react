import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProfileSettings() {
  const [avatar, setAvatar] = useState('/assets/images/avatar/avatar-25.webp');
  const [formData, setFormData] = useState({
    displayName: 'Jaydon Frankie',
    username: 'jaydon_frankie',
    email: 'demo@minimals.cc',
    bio: 'Full-stack developer passionate about creating user-friendly applications.',
    company: 'Minimal UI',
    location: 'San Francisco, CA',
    website: 'https://minimals.cc',
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    // Handle save logic here
  };

  return (
    <Stack spacing={4}>
      {/* Avatar Section */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Profile Picture
        </Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={avatar}
              alt="Profile"
              sx={{ width: 80, height: 80 }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                component="span"
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  bgcolor: 'background.paper',
                  border: '2px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'background.paper',
                  },
                }}
              >
                <Iconify icon="solar:cart-3-bold" width={16} />
              </IconButton>
            </label>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Upload a new profile picture
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              JPG, PNG or GIF. Max size 2MB.
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* Personal Information */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Personal Information
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Display Name"
              value={formData.displayName}
              onChange={handleInputChange('displayName')}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={handleInputChange('username')}
              helperText="This will be your public username"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={3}
              value={formData.bio}
              onChange={handleInputChange('bio')}
              helperText="Tell us a little about yourself"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Company"
              value={formData.company}
              onChange={handleInputChange('company')}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={handleInputChange('location')}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Website"
              value={formData.website}
              onChange={handleInputChange('website')}
              helperText="Your personal or company website"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Stack>
  );
} 