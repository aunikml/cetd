import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Switch, FormControlLabel,
  Alert, Stack, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

export default function PlatformsCMS() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  const initialForm = {
    title_en: '',
    title_bn: '',
    category: 'LMS Platform',
    summary_en: '',
    summary_bn: '',
    features_en: '',
    features_bn: '',
    tech_stack: 'Moodle Core, React, PostgreSQL',
    demo_type: 'lms',
    status_badge: 'Pilot Ready',
    order: 1,
    is_featured: true,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cms/platforms/');
      setPlatforms(res.data);
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to load platforms' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingPlatform(null);
    setFormData({ ...initialForm, order: platforms.length + 1 });
    setOpenModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingPlatform(p);
    setFormData(p);
    setOpenModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingPlatform) {
        await api.put(`/cms/platforms/${editingPlatform.id}/`, formData);
        setAlertInfo({ type: 'success', text: 'Platform showcase updated!' });
      } else {
        await api.post('/cms/platforms/', formData);
        setAlertInfo({ type: 'success', text: 'New platform added!' });
      }
      setOpenModal(false);
      fetchPlatforms();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to save platform' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this platform?')) return;
    try {
      await api.delete(`/cms/platforms/${id}/`);
      setAlertInfo({ type: 'info', text: 'Platform deleted' });
      fetchPlatforms();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to delete' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#0F172A">
            Platforms & Tools Showcase CMS
          </Typography>
          <Typography variant="body2" color="#64748B">
            Configure LMS platforms, assessment generators, and AI/speech innovations.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Add New Platform
        </Button>
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
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Demo Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status Badge</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {platforms.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="#0D3B75">{p.title_en}</Typography>
                    <Typography variant="caption" color="#64748B">{p.tech_stack}</Typography>
                  </TableCell>
                  <TableCell><Chip label={p.category} size="small" /></TableCell>
                  <TableCell><Chip label={p.demo_type.toUpperCase()} size="small" color="info" /></TableCell>
                  <TableCell><Chip label={p.status_badge} size="small" color="success" /></TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(p)} size="small"><EditIcon fontSize="small" /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(p.id)} size="small"><DeleteIcon fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={800} color="#0D3B75">
            {editingPlatform ? 'Edit Platform Showcase' : 'Add Platform Showcase'}
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
                <TextField fullWidth label="Category" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} size="small" />
                <TextField select fullWidth label="Interactive Demo Mode" value={formData.demo_type} onChange={(e) => setFormData({ ...formData, demo_type: e.target.value })} size="small">
                  <MenuItem value="lms">LMS Course Unit Simulator</MenuItem>
                  <MenuItem value="assessment">Smart Assessment & Question Engine</MenuItem>
                  <MenuItem value="ai_nlp">Bangla Voice-to-Text Classroom NLP</MenuItem>
                  <MenuItem value="gamified">Gamified Learning Module</MenuItem>
                </TextField>
              </Box>
              <TextField fullWidth label="Tech Stack Details" value={formData.tech_stack} onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={3} label="Summary (English)" required value={formData.summary_en} onChange={(e) => setFormData({ ...formData, summary_en: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={3} label="Summary (Bangla)" value={formData.summary_bn} onChange={(e) => setFormData({ ...formData, summary_bn: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={2} label="Key Features (newline separated)" value={formData.features_en} onChange={(e) => setFormData({ ...formData, features_en: e.target.value })} size="small" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save Platform</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
