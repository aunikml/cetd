import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Alert, CircularProgress, Stack, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

export default function RoadmapCMS() {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingPhase, setEditingPhase] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  const [formData, setFormData] = useState({
    phase_number: 1,
    phase_title_en: '',
    phase_title_bn: '',
    timeline_en: '',
    timeline_bn: '',
    status: 'upcoming',
    milestones_en: '',
    milestones_bn: '',
  });

  useEffect(() => {
    fetchPhases();
  }, []);

  const fetchPhases = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cms/roadmap/');
      setPhases(res.data);
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to load roadmap phases' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (phase) => {
    setEditingPhase(phase);
    setFormData(phase);
    setOpenModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/cms/roadmap/${editingPhase.id}/`, formData);
      setAlertInfo({ type: 'success', text: 'Roadmap phase updated!' });
      setOpenModal(false);
      fetchPhases();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to update phase' });
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} color="#0F172A">
          24-Month Roadmap CMS
        </Typography>
        <Typography variant="body2" color="#64748B">
          Configure milestones, timeline horizons, and pilot progression across Foundation, Pilot, and Scale.
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
                <TableCell sx={{ fontWeight: 700 }}>Phase</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title (EN / BN)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Timeline</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {phases.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell sx={{ fontWeight: 700 }}>Phase {p.phase_number}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="#0D3B75">{p.phase_title_en}</Typography>
                    <Typography variant="caption" color="#64748B">{p.phase_title_bn}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{p.timeline_en}</TableCell>
                  <TableCell>
                    <Chip label={p.status.toUpperCase()} size="small" color={p.status === 'active' ? 'primary' : 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(p)} size="small">
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
            Edit Phase: {editingPhase?.phase_title_en}
          </Typography>
          <IconButton onClick={() => setOpenModal(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <Box component="form" onSubmit={handleSave}>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Phase Title (English)" required value={formData.phase_title_en} onChange={(e) => setFormData({ ...formData, phase_title_en: e.target.value })} size="small" />
                <TextField fullWidth label="Phase Title (Bangla)" value={formData.phase_title_bn} onChange={(e) => setFormData({ ...formData, phase_title_bn: e.target.value })} size="small" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Timeline Duration (EN)" required value={formData.timeline_en} onChange={(e) => setFormData({ ...formData, timeline_en: e.target.value })} size="small" />
                <TextField select fullWidth label="Current Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} size="small">
                  <MenuItem value="active">Active / In Progress</MenuItem>
                  <MenuItem value="upcoming">Upcoming / Planned</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </TextField>
              </Box>
              <TextField fullWidth multiline rows={4} label="Strategic Milestones (newline separated list)" required value={formData.milestones_en} onChange={(e) => setFormData({ ...formData, milestones_en: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={4} label="Strategic Milestones (Bangla / বাংলা)" value={formData.milestones_bn} onChange={(e) => setFormData({ ...formData, milestones_bn: e.target.value })} size="small" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save Phase Milestones</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
