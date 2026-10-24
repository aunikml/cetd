import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, CircularProgress, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

export default function FocusAreasCMS() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  const [formData, setFormData] = useState({
    title_en: '',
    title_bn: '',
    tagline_en: '',
    tagline_bn: '',
    description_en: '',
    description_bn: '',
    deliverables_en: '',
    deliverables_bn: '',
    beneficiaries_en: '',
    beneficiaries_bn: '',
  });

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cms/focus-areas/');
      setAreas(res.data);
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to load focus areas' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (area) => {
    setEditingArea(area);
    setFormData(area);
    setOpenModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/cms/focus-areas/${editingArea.id}/`, formData);
      setAlertInfo({ type: 'success', text: 'Focus area updated successfully!' });
      setOpenModal(false);
      fetchAreas();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to update focus area' });
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} color="#0F172A">
          Three Focus Areas CMS
        </Typography>
        <Typography variant="body2" color="#64748B">
          Edit descriptions, deliverables, and beneficiaries for Teacher Capacity, Platforms, and Research.
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
                <TableCell sx={{ fontWeight: 700 }}>Focus Pillar</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tagline</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Beneficiaries</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {areas.map((a) => (
                <TableRow key={a.id} hover>
                  <TableCell sx={{ fontWeight: 700, color: '#0D3B75' }}>{a.title_en}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{a.tagline_en}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', color: '#64748B' }}>{a.beneficiaries_en}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(a)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={800} color="#0D3B75">
            Edit Focus Area: {editingArea?.title_en}
          </Typography>
          <IconButton onClick={() => setOpenModal(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <Box component="form" onSubmit={handleSave}>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Title (English)" required value={formData.title_en} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} size="small" />
                <TextField fullWidth label="Title (Bangla)" value={formData.title_bn} onChange={(e) => setFormData({ ...formData, title_bn: e.target.value })} size="small" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Tagline (English)" required value={formData.tagline_en} onChange={(e) => setFormData({ ...formData, tagline_en: e.target.value })} size="small" />
                <TextField fullWidth label="Tagline (Bangla)" value={formData.tagline_bn} onChange={(e) => setFormData({ ...formData, tagline_bn: e.target.value })} size="small" />
              </Box>
              <TextField fullWidth multiline rows={3} label="Description (English)" required value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={3} label="Description (Bangla)" value={formData.description_bn} onChange={(e) => setFormData({ ...formData, description_bn: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={2} label="Deliverables (newline separated)" value={formData.deliverables_en} onChange={(e) => setFormData({ ...formData, deliverables_en: e.target.value })} size="small" />
              <TextField fullWidth label="Beneficiaries (English)" value={formData.beneficiaries_en} onChange={(e) => setFormData({ ...formData, beneficiaries_en: e.target.value })} size="small" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Update Pillar</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
