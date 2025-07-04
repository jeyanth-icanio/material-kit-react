import React from 'react';

import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';

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