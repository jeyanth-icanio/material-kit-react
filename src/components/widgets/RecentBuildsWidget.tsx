import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const projects = [
  {
    name: 'Alpha',
    description: 'Main CI/CD pipeline for core product.',
  },
  {
    name: 'Beta',
    description: 'Staging environment deployment pipeline.',
  },
  {
    name: 'Gamma',
    description: 'Automated E2E testing pipeline.',
  },
  {
    name: 'Delta',
    description: 'Legacy system migration pipeline.',
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Success':
      return 'success';
    case 'Running':
      return 'info';
    case 'Failed':
      return 'error';
    default:
      return 'default';
  }
}

export default function RecentBuildsWidget() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Recent Builds (CI/CD)</Typography>
        <List>
          {projects.map((project) => (
            <ListItem key={project.name} disableGutters>
              <ListItemText
                primary={project.name}
                secondary={project.description}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
} 