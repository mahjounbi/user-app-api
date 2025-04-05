import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { createUser, getUserById, updateUser } from '../../../tools/userApi';
import UserForm from '../../../components/Profile';

const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: '', severity: 'success' });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getUserById(id).then((res) => setUser(res.data));
    }
  }, [id, isEdit]);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      if (isEdit) {
        await updateUser(id, data);
        setNotif({ open: true, message: 'User updated successfully', severity: 'success' });
      } else {
        await createUser(data);
        setNotif({ open: true, message: 'User created successfully', severity: 'success' });
      }
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setNotif({
        open: true,
        message: (error && error.response && error.response.data && error.response.data.error) || 'An error occurred',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>{isEdit ? 'Edit User' : 'Create User'}</h1>
      <UserForm
        onSubmit={handleSubmit}
        defaultValues={user || {}}
        loading={loading}
        isEdit={isEdit}
      />

      <Snackbar
        open={notif.open}
        autoHideDuration={3000}
        onClose={() => setNotif({ ...notif, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={notif.severity} sx={{ width: '100%' }}>
          {notif.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserFormPage;
