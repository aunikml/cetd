import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, CircularProgress, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

export default function TeamCMS() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  const [formData, setFormData] = useState({
    name_en: '',
    name_bn: '',
    role_en: '',
    role_bn: '',
    portfolio_en: '',
    portfolio_bn: '',
    bio_en: '',
    bio_bn: '',
    credentials_en: '',
    credentials_bn: '',
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cms/team/');
      setTeam(res.data);
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to load team data' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setFormData(m);
    setOpenModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/cms/team/${editingMember.id}/`, formData);
      setAlertInfo({ type: 'success', text: 'Team member profile updated!' });
      setOpenModal(false);
      fetchTeam();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to update team member' });
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} color="#0F172A">
          Founding Leadership & Credentials CMS
        </Typography>
        <Typography variant="body2" color="#64748B">
          Update biographies, portfolios, and verified institutional track records for founders.
        </Typography>
      </Box>

      {alertInfo && (
        <Alert severity={alertInfo.type} sx={{ mb: 3, borderRadius: 2 }} onClose={() => setAlertInfo(null)}>
          {alertInfo.text}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Name (EN / BN)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Executive Role</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Portfolio</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.map((m) => (
                <TableRow key={m.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="#0D3B75">{m.name_en}</Typography>
                    <Typography variant="caption" color="#64748B">{m.name_bn}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{m.role_en}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', color: '#64748B' }}>{m.portfolio_en}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(m)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={800} color="#0D3B75">
            Edit Leadership: {editingMember?.name_en}
          </Typography>
          <IconButton onClick={() => setOpenModal(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <Box component="form" onSubmit={handleSave}>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Full Name (English)" required value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })} size="small" />
                <TextField fullWidth label="Full Name (Bangla)" value={formData.name_bn} onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })} size="small" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Role (English)" required value={formData.role_en} onChange={(e) => setFormData({ ...formData, role_en: e.target.value })} size="small" />
                <TextField fullWidth label="Role (Bangla)" value={formData.role_bn} onChange={(e) => setFormData({ ...formData, role_bn: e.target.value })} size="small" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Portfolio Domain (English)" required value={formData.portfolio_en} onChange={(e) => setFormData({ ...formData, portfolio_en: e.target.value })} size="small" />
                <TextField fullWidth label="Portfolio Domain (Bangla)" value={formData.portfolio_bn} onChange={(e) => setFormData({ ...formData, portfolio_bn: e.target.value })} size="small" />
              </Box>
              <TextField fullWidth multiline rows={3} label="Executive Bio (English)" required value={formData.bio_en} onChange={(e) => setFormData({ ...formData, bio_en: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={3} label="Executive Bio (Bangla)" value={formData.bio_bn} onChange={(e) => setFormData({ ...formData, bio_bn: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={3} label="Verified Track Record Highlights (newline separated)" value={formData.credentials_en} onChange={(e) => setFormData({ ...formData, credentials_en: e.target.value })} size="small" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save Changes</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
