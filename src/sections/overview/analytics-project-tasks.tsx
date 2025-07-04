import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { useState } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
    projectId: string;
    projectName: string;
    projectLogo?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in-progress' | 'completed' | 'blocked';
    dueDate?: string;
  }[];
  projects: {
    id: string;
    name: string;
    logoUrl?: string;
  }[];
};

export function AnalyticsProjectTasks({ title, subheader, list, projects, sx, ...other }: Props) {
  const [selected, setSelected] = useState(['2']);
  const [selectedProject, setSelectedProject] = useState<string>('all');

  const handleClickComplete = (taskId: string) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  const filteredTasks = selectedProject === 'all' 
    ? list 
    : list.filter(task => task.projectId === selectedProject);

  return (
    <Card sx={sx} {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        sx={{ mb: 1 }}
        action={
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Project</InputLabel>
            <Select
              value={selectedProject}
              label="Project"
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <MenuItem value="all">All Projects</MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />

      <Scrollbar sx={{ minHeight: 304 }}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{ minWidth: 560 }}>
          {filteredTasks.map((item) => (
            <ProjectTaskItem
              key={item.id}
              item={item}
              selected={selected.includes(item.id)}
              onChange={() => handleClickComplete(item.id)}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ProjectTaskItemProps = BoxProps & {
  selected: boolean;
  item: Props['list'][number];
  onChange: (id: string) => void;
};

function ProjectTaskItem({ item, selected, onChange, sx, ...other }: ProjectTaskItemProps) {
  const menuActions = usePopover();

  const handleMarkComplete = () => {
    menuActions.onClose();
    console.info('MARK COMPLETE', item.id);
  };

  const handleShare = () => {
    menuActions.onClose();
    console.info('SHARE', item.id);
  };

  const handleEdit = () => {
    menuActions.onClose();
    console.info('EDIT', item.id);
  };

  const handleDelete = () => {
    menuActions.onClose();
    console.info('DELETE', item.id);
  };

  return (
    <>
      <Box
        sx={[
          () => ({
            pl: 2,
            pr: 1,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            ...(selected && {
              color: 'text.disabled',
              textDecoration: 'line-through',
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Avatar
          src={item.projectLogo}
          alt={item.projectName}
          sx={{ width: 32, height: 32, mr: 2, flexShrink: 0 }}
        >
          {!item.projectLogo && (
            <Iconify icon="solar:cart-3-bold" width={16} />
          )}
        </Avatar>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <FormControlLabel
            label={item.name}
            control={
              <Checkbox
                disableRipple
                checked={selected}
                onChange={onChange}
                slotProps={{ input: { id: `${item.name}-checkbox` } }}
              />
            }
            sx={{ m: 0, flexGrow: 1 }}
          />
          
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
            <Chip
              label={item.projectName}
              size="small"
              variant="outlined"
              sx={{ typography: 'caption' }}
            />
            <Chip
              label={item.priority}
              size="small"
              color={item.priority === 'urgent' ? 'error' : item.priority === 'high' ? 'warning' : 'default'}
              sx={{ typography: 'caption' }}
            />
            <Chip
              label={item.status}
              size="small"
              color={item.status === 'completed' ? 'success' : item.status === 'in-progress' ? 'info' : 'default'}
              sx={{ typography: 'caption' }}
            />
          </Box>
        </Box>

        <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Box>

      <Popover
        open={menuActions.open}
        anchorEl={menuActions.anchorEl}
        onClose={menuActions.onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              pl: 1,
              pr: 2,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleMarkComplete}>
            <Iconify icon="solar:check-circle-bold" />
            Mark complete
          </MenuItem>

          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleShare}>
            <Iconify icon="solar:share-bold" />
            Share
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
} 