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

export default function ResearchCMS() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  const initialForm = {
    title_en: '',
    title_bn: '',
    publication_type: 'policy_brief',
    author: 'CEDR Research Team',
    date_published: 'October 2026',
    tags: 'EdTech, Pedagogy, Bangladesh',
    abstract_en: '',
    abstract_bn: '',
    download_url: '#',
    is_published: true,
    order: 1,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cms/research/');
      setPapers(res.data);
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to load research papers' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingPaper(null);
    setFormData({ ...initialForm, order: papers.length + 1 });
    setOpenModal(true);
  };

  const handleOpenEdit = (paper) => {
    setEditingPaper(paper);
    setFormData(paper);
    setOpenModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingPaper) {
        await api.put(`/cms/research/${editingPaper.id}/`, formData);
        setAlertInfo({ type: 'success', text: 'Research paper updated!' });
      } else {
        await api.post('/cms/research/', formData);
        setAlertInfo({ type: 'success', text: 'New research paper published!' });
      }
      setOpenModal(false);
      fetchPapers();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to save paper' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this publication?')) return;
    try {
      await api.delete(`/cms/research/${id}/`);
      setAlertInfo({ type: 'info', text: 'Publication deleted' });
      fetchPapers();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to delete' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#0F172A">
            Applied Research & Policy Briefs CMS
          </Typography>
          <Typography variant="body2" color="#64748B">
            Publish and curate evidence papers, pilot evaluations, and policy briefs.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Publish Research Brief
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
                <TableCell sx={{ fontWeight: 700 }}>Title (EN / BN)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {papers.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="#0D3B75">{p.title_en}</Typography>
                    <Typography variant="caption" color="#64748B">{p.title_bn}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={p.publication_type.toUpperCase()} size="small" />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{p.author}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', color: '#64748B' }}>{p.date_published}</TableCell>
                  <TableCell>
                    <Chip label={p.is_published ? 'Published' : 'Draft'} size="small" color={p.is_published ? 'success' : 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(p)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(p.id)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={800} color="#0D3B75">
            {editingPaper ? 'Edit Research Paper' : 'Publish New Research Paper'}
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
                <TextField select fullWidth label="Publication Type" value={formData.publication_type} onChange={(e) => setFormData({ ...formData, publication_type: e.target.value })} size="small">
                  <MenuItem value="policy_brief">Policy Brief</MenuItem>
                  <MenuItem value="pilot_report">Pilot Evaluation Report</MenuItem>
                  <MenuItem value="white_paper">White Paper</MenuItem>
                  <MenuItem value="practice_note">Practice Note</MenuItem>
                </TextField>
                <TextField fullWidth label="Author(s)" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} size="small" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth label="Publication Date" value={formData.date_published} onChange={(e) => setFormData({ ...formData, date_published: e.target.value })} size="small" />
                <TextField fullWidth label="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} size="small" />
              </Box>
              <TextField fullWidth multiline rows={3} label="Abstract / Executive Summary (English)" required value={formData.abstract_en} onChange={(e) => setFormData({ ...formData, abstract_en: e.target.value })} size="small" />
              <TextField fullWidth multiline rows={3} label="Abstract (Bangla / বাংলা)" value={formData.abstract_bn} onChange={(e) => setFormData({ ...formData, abstract_bn: e.target.value })} size="small" />
              <FormControlLabel control={<Switch checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} color="primary" />} label="Visible on Public Research Hub" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save Publication</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
