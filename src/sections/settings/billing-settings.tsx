import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type BillingHistory = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoice: string;
};

export function BillingSettings() {
  const [plan] = useState({
    name: 'Pro Plan',
    price: 29.99,
    nextBilling: '2024-08-01',
    status: 'Active',
  });
  const [paymentMethod] = useState('Visa ending in 4242');
  const [history] = useState([
    { id: 1, date: '2024-07-01', description: 'Pro Plan - Monthly', amount: 29.99, status: 'Paid' },
    { id: 2, date: '2024-06-01', description: 'Pro Plan - Monthly', amount: 29.99, status: 'Paid' },
    { id: 3, date: '2024-05-01', description: 'Pro Plan - Monthly', amount: 29.99, status: 'Paid' },
  ]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Billing Settings
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: 600 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1">Current Plan</Typography>
            <Typography variant="body2">{plan.name} - ${plan.price}/month</Typography>
            <Typography variant="body2">Next billing date: {plan.nextBilling}</Typography>
            <Typography variant="body2" color="success.main">Status: {plan.status}</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>Upgrade Plan</Button>
          </CardContent>
        </Card>
        <Divider>Payment Method</Divider>
        <Typography variant="body2">{paymentMethod}</Typography>
        <Divider>Billing History</Divider>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>${item.amount}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
} 