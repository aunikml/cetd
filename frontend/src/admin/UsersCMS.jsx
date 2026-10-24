import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Switch, FormControlLabel,
  Alert, Stack, CircularProgress
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function UsersCMS() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  const initialForm = {
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'content_manager',
    phone: '',
    title: 'Content Editor',
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users/');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setAlertInfo({ type: 'error', text: 'Failed to load user managers' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData(initialForm);
    setOpenModal(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      phone: user.phone || '',
      title: user.title || '',
      password: '', // Blank unless modifying
    });
    setOpenModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update user
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        await api.patch(`/users/${editingUser.id}/`, payload);
        setAlertInfo({ type: 'success', text: `Updated role for ${editingUser.username} successfully!` });
      } else {
        // Create user
        await api.post('/users/', formData);
        setAlertInfo({ type: 'success', text: `Created new manager ${formData.username} successfully!` });
      }
      setOpenModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setAlertInfo({ type: 'error', text: 'Failed to save user. Ensure username is unique.' });
    }
  };

  const handleDelete = async (id, uname) => {
    if (uname === currentUser.username) {
      alert('You cannot delete your own account while logged in!');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete user ${uname}?`)) return;
    try {
      await api.delete(`/users/${id}/`);
      setAlertInfo({ type: 'info', text: `User ${uname} deleted` });
      fetchUsers();
    } catch (err) {
      setAlertInfo({ type: 'error', text: 'Failed to delete user' });
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'super_admin':
        return <Chip label="Super Admin" size="small" color="error" sx={{ fontWeight: 700 }} />;
      case 'content_manager':
        return <Chip label="Senior Content Lead" size="small" color="success" sx={{ fontWeight: 700 }} />;
      case 'platform_editor':
        return <Chip label="Course & Platform Editor" size="small" color="info" sx={{ fontWeight: 700 }} />;
      case 'research_editor':
        return <Chip label="Research Contributor" size="small" sx={{ backgroundColor: '#F3E8FF', color: '#9333EA', fontWeight: 700 }} />;
      default:
        return <Chip label={role} size="small" />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#0F172A">
            User & Role Permission Management
          </Typography>
          <Typography variant="body2" color="#64748B">
            Assign different levels of content managers (Super Admin, Senior Content Manager, Platform Editor, Research Contributor).
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleOpenAdd}
          sx={{ fontWeight: 700 }}
        >
          Add New Manager
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
                <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Full Name & Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Assigned Role Level</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="#0D3B75">
                      {u.username}
                    </Typography>
                    <Typography variant="caption" color="#64748B">
                      ID: #{u.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {u.first_name} {u.last_name}
                    </Typography>
                    <Typography variant="caption" color="#64748B">
                      {u.title || 'Staff'}
                    </Typography>
                  </TableCell>
                  <TableCell>{u.email || '—'}</TableCell>
                  <TableCell>{getRoleBadge(u.role)}</TableCell>
                  <TableCell>
                    <Chip
                      label={u.is_active ? 'Active' : 'Inactive'}
                      size="small"
                      color={u.is_active ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenEdit(u)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(u.id, u.username)}
                      size="small"
                      disabled={u.username === currentUser.username}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add / Edit Manager Dialog */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={800} color="#0D3B75">
            {editingUser ? `Edit Role: ${editingUser.username}` : 'Assign New Content Manager'}
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
                  label="Username"
                  required
                  disabled={Boolean(editingUser)}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  size="small"
                />
                <TextField
                  fullWidth
                  label={editingUser ? 'New Password (Optional)' : 'Password'}
                  type="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  size="small"
                />
              </Box>

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                size="small"
              />

              {/* Role Selection Dropdown */}
              <TextField
                select
                fullWidth
                required
                label="Select Manager Role Level"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                size="small"
                helperText="Controls which sections this staff member can view and edit."
              >
                <MenuItem value="super_admin">
                  👑 Super Admin (Full access to all CMS + User Role Assignment)
                </MenuItem>
                <MenuItem value="content_manager">
                  ✍️ Senior Content Manager (Hero slides, focus areas, roadmap, team, inquiries)
                </MenuItem>
                <MenuItem value="platform_editor">
                  💻 Course & Platform Editor (LMS platforms, tools showcase, focus areas)
                </MenuItem>
                <MenuItem value="research_editor">
                  🔬 Research Contributor (Applied research publications & policy briefs)
                </MenuItem>
              </TextField>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Job Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  size="small"
                />
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save User & Permissions
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
