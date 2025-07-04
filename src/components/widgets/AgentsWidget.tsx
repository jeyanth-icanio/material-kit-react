import React from 'react';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';

const agents = [
  { name: 'Agent-1', status: 'Online', busy: false, type: 'Docker', lastActivity: '2m ago' },
  { name: 'Agent-2', status: 'Online', busy: true, type: 'VM', lastActivity: 'Just now' },
  { name: 'Agent-3', status: 'Offline', busy: false, type: 'Kubernetes', lastActivity: '10m ago' },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Online':
      return 'success';
    case 'Offline':
      return 'default';
    default:
      return 'default';
  }
}

export default function AgentsWidget() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Agents Status (CI/CD)</Typography>
        <List>
          {agents.map((agent) => (
            <ListItem key={agent.name} disableGutters>
              <ListItemText
                primary={`${agent.name} (${agent.type})`}
                secondary={`Last: ${agent.lastActivity}`}
              />
              <Chip
                label={agent.status + (agent.busy ? ' (Busy)' : ' (Free)')}
                color={getStatusColor(agent.status)}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
} 