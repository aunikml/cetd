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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import api from '../services/api';

export default function HeroSlidesCMS() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  const initialForm = {
    title_en: '',
    title_bn: '',
    subtitle_en: '',
    subtitle_bn: '',
    badge_en: 'EVIDENCE-LED EDTECH',
    badge_bn: 'গবেষণা-ভিত্তিক এডুটেক',
    cta_primary_text_en: 'Explore Solutions',
    cta_primary_text_bn: 'আমাদের সেবাসমূহ',
    cta_primary_link: '#solutions',
    cta_secondary_text_en: 'Partner With Us',
    cta_secondary_text_bn: 'অংশীদার হোন',
    cta_secondary_link: '#partnership',
    stat_number: '100%',
    stat_label_en: 'Curriculum Grounded',
    stat_label_bn: 'জাতীয় শিক্ষাক্রম উপযোগী',
    theme_gradient: 'blue',
    order: 1,
    is_active: true,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cms/hero-slides/');
      setSlides(res.data);
    } catch (err) {
      console.error(err);
      setAlertInfo({ type: 'error', text: 'Failed to load slides from server' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingSlide(null);
    setFormData({ ...initialForm, order: slides.length + 1 });
    setOpenModal(true);
  };

  const handleOpenEdit = (slide) => {
    setEditingSlide(slide);
    setFormData(slide);
    setOpenModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingSlide) {
        await api.put(`/cms/hero-slides/${editingSlide.id}/`, formData);
        setAlertInfo({ type: 'success', text: 'Hero slide updated successfully!' });
      } else {
        await api.post('/cms/hero-slides/', formData);
        setAlertInfo({ type: 'success', text: 'New hero slide added successfully!' });
      }
      setOpenModal(false);
      fetchSlides();
    } catch (err) {
      console.error(err);
      setAlertInfo({ type: 'error', text: 'Failed to save slide' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hero slide?')) return;
    try {
      await api.delete(`/cms/hero-slides/${id}/`);
      setAlertInfo({ type: 'info', text: 'Hero slide deleted' });
      fetchSlides();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to delete slide' });
    }
  };

  const handleToggleActive = async (slide) => {
    try {
      await api.patch(`/cms/hero-slides/${slide.id}/`, { is_active: !slide.is_active });
      fetchSlides();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to update slide status' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#0F172A">
            Hero Slider CMS
          </Typography>
          <Typography variant="body2" color="#64748B">
            Manage dynamic slides, bilingual text (English & Bangla), theme gradients, and action buttons.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ fontWeight: 700 }}
        >
          Add New Slide
        </Button>
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
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Order</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title (English / Bangla)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Badge</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Theme</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Active</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slides.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell sx={{ fontWeight: 700 }}>#{s.order}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="#0D3B75">
                      {s.title_en}
                    </Typography>
                    <Typography variant="caption" color="#64748B">
                      {s.title_bn || 'No Bangla translation'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={s.badge_en} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={s.theme_gradient.toUpperCase()}
                      size="small"
                      color={s.theme_gradient === 'emerald' ? 'secondary' : s.theme_gradient === 'cyan' ? 'info' : 'primary'}
                      sx={{ fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={s.is_active}
                      onChange={() => handleToggleActive(s)}
                      color="primary"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(s)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(s.id)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add / Edit Slide Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={800} color="#0D3B75">
            {editingSlide ? 'Edit Hero Slide' : 'Create New Hero Slide'}
          </Typography>
          <IconButton onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box component="form" onSubmit={handleSave}>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Title (English)"
                  required
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Title (Bangla / বাংলা)"
                  value={formData.title_bn}
                  onChange={(e) => setFormData({ ...formData, title_bn: e.target.value })}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Subtitle (English)"
                  required
                  value={formData.subtitle_en}
                  onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                  size="small"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Subtitle (Bangla / বাংলা)"
                  value={formData.subtitle_bn}
                  onChange={(e) => setFormData({ ...formData, subtitle_bn: e.target.value })}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Pill Badge (English)"
                  value={formData.badge_en}
                  onChange={(e) => setFormData({ ...formData, badge_en: e.target.value })}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Pill Badge (Bangla)"
                  value={formData.badge_bn}
                  onChange={(e) => setFormData({ ...formData, badge_bn: e.target.value })}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Theme Gradient"
                  value={formData.theme_gradient}
                  onChange={(e) => setFormData({ ...formData, theme_gradient: e.target.value })}
                  size="small"
                >
                  <MenuItem value="blue">Ocean Blue (Navy & Royal)</MenuItem>
                  <MenuItem value="emerald">Emerald Green</MenuItem>
                  <MenuItem value="cyan">Tech Cyan</MenuItem>
                  <MenuItem value="indigo">Academic Indigo</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  type="number"
                  label="Display Order"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Primary Button Text (EN)"
                  value={formData.cta_primary_text_en}
                  onChange={(e) => setFormData({ ...formData, cta_primary_text_en: e.target.value })}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Primary Button Link"
                  value={formData.cta_primary_link}
                  onChange={(e) => setFormData({ ...formData, cta_primary_link: e.target.value })}
                  size="small"
                />
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    color="primary"
                  />
                }
                label="Active on Public Website"
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save Slide
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
