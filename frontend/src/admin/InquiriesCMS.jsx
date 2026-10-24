import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip,
  IconButton, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, MenuItem, TextField, Alert, CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import api from '../services/api';

export default function InquiriesCMS() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeInquiry, setActiveInquiry] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [notesUpdate, setNotesUpdate] = useState('');
  const [alertInfo, setAlertInfo] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cms/inquiries/');
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
      setAlertInfo({ type: 'error', text: 'Could not fetch inquiries' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (inq) => {
    setActiveInquiry(inq);
    setStatusUpdate(inq.status);
    setNotesUpdate(inq.notes || '');
  };

  const handleSaveStatus = async () => {
    try {
      await api.patch(`/cms/inquiries/${activeInquiry.id}/`, {
        status: statusUpdate,
        notes: notesUpdate,
      });
      setAlertInfo({ type: 'success', text: 'Inquiry status updated' });
      setActiveInquiry(null);
      fetchInquiries();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to update status' });
    }
  };

  const getStatusChip = (st) => {
    switch (st) {
      case 'new':
        return <Chip label="New" color="error" size="small" sx={{ fontWeight: 700 }} />;
      case 'in_review':
        return <Chip label="In Review" color="warning" size="small" sx={{ fontWeight: 700 }} />;
      case 'contacted':
        return <Chip label="Contacted" color="info" size="small" sx={{ fontWeight: 700 }} />;
      case 'partnered':
        return <Chip label="Partnered" color="success" size="small" sx={{ fontWeight: 700 }} />;
      default:
        return <Chip label={st} size="small" />;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} color="#0F172A">
          Institutional Partnership Inquiries
        </Typography>
        <Typography variant="body2" color="#64748B">
          Review submissions from schools, universities, NGOs, government departments, and investors.
        </Typography>
      </Box>

      {alertInfo && (
        <Alert severity={alertInfo.type} sx={{ mb: 3, borderRadius: 2 }} onClose={() => setAlertInfo(null)}>
          {alertInfo.text}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : inquiries.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #E2E8F0' }}>
          <MailIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 1 }} />
          <Typography variant="h6" fontWeight={700} color="#475569">
            No inquiries received yet
          </Typography>
          <Typography variant="body2" color="#94A3B8">
            When organizations submit the partnership form on the public website, their requests appear here.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Contact Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Organization</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email & Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inquiries.map((inq) => (
                <TableRow key={inq.id} hover>
                  <TableCell sx={{ fontWeight: 700, color: '#0D3B75' }}>{inq.name}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{inq.organization}</TableCell>
                  <TableCell>
                    <Chip label={inq.partner_type.toUpperCase()} size="small" sx={{ fontSize: '0.7rem' }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{inq.email}</Typography>
                    <Typography variant="caption" color="#64748B">{inq.phone || '—'}</Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(inq.status)}</TableCell>
                  <TableCell sx={{ color: '#64748B', fontSize: '0.85rem' }}>
                    {new Date(inq.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleOpenDetail(inq)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Detail & Status Modal */}
      {activeInquiry && (
        <Dialog
          open={Boolean(activeInquiry)}
          onClose={() => setActiveInquiry(null)}
          maxWidth="sm"
          fullWidth
          slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" fontWeight={800} color="#0D3B75">
                Inquiry from {activeInquiry.organization}
              </Typography>
              <Typography variant="caption" color="#64748B">
                Submitted by {activeInquiry.name} ({activeInquiry.email})
              </Typography>
            </Box>
            <IconButton onClick={() => setActiveInquiry(null)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" fontWeight={700} color="#64748B">
                AREAS OF INTEREST:
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#0F172A">
                {activeInquiry.interests || 'General Collaboration'}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" fontWeight={700} color="#64748B">
                PROPOSAL / MESSAGE:
              </Typography>
              <Paper sx={{ p: 2, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', mt: 0.5, borderRadius: 2 }}>
                <Typography variant="body2" color="#334155" sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {activeInquiry.message}
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                select
                fullWidth
                label="Update Status"
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                size="small"
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="in_review">In Review</MenuItem>
                <MenuItem value="contacted">Contacted / Scheduled</MenuItem>
                <MenuItem value="partnered">Partnered / Closed</MenuItem>
              </TextField>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Internal Staff Notes (Private)"
              value={notesUpdate}
              onChange={(e) => setNotesUpdate(e.target.value)}
              placeholder="Record call notes, scheduled meetings, or pilot terms here..."
              size="small"
            />
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setActiveInquiry(null)}>Close</Button>
            <Button variant="contained" color="primary" onClick={handleSaveStatus}>
              Save Updates
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
