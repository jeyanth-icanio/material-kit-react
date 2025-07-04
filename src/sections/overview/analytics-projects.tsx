import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
    logoUrl?: string;
    totalBuilds: number;
    status: 'active' | 'inactive' | 'maintenance';
  }[];
  onLogoUpload?: (projectId: string, file: File) => void;
};

export function AnalyticsProjects({ title, subheader, list, onLogoUpload, sx, ...other }: Props) {
  const handleLogoUpload = (projectId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onLogoUpload) {
      onLogoUpload(projectId, file);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box
        sx={{
          p: 3,
          gap: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        {list.map((project) => (
          <Box
            key={project.id}
            sx={(theme) => ({
              py: 2.5,
              px: 2,
              display: 'flex',
              borderRadius: 1.5,
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
              position: 'relative',
            })}
          >
            <Box sx={{ position: 'relative', mb: 1 }}>
              <Avatar
                src={project.logoUrl}
                alt={project.name}
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'background.neutral',
                }}
              >
                {!project.logoUrl && (
                  <Iconify icon="solar:cart-3-bold" width={24} />
                )}
              </Avatar>
              
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id={`logo-upload-${project.id}`}
                type="file"
                onChange={(e) => handleLogoUpload(project.id, e)}
              />
              <label htmlFor={`logo-upload-${project.id}`}>
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
                  <Iconify icon="solar:cart-3-bold" width={12} />
                </IconButton>
              </label>
            </Box>

            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {fShortenNumber(project.totalBuilds)}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {project.name}
            </Typography>

            <Box
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: `${getStatusColor(project.status)}.lighter`,
                color: `${getStatusColor(project.status)}.darker`,
                typography: 'caption',
                textTransform: 'capitalize',
              }}
            >
              {project.status}
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
} 