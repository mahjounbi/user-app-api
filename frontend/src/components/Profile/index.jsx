import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const UserForm = ({
  onSubmit, defaultValues, loading, isEdit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input {...register('firstName', { required: true })} placeholder="First Name" />
      <input {...register('lastName', { required: true })} placeholder="Last Name" />
      <input {...register('email', { required: true })} placeholder="Email" type="email" />

      {!isEdit && (
        <input
          {...register('password', { required: true })}
          placeholder="Password"
          type="password"
        />
      )}

      <input {...register('city')} placeholder="City" />
      <input {...register('country')} placeholder="Country" />
      <input {...register('phoneNumber')} placeholder="Phone Number" />
      <input {...register('position')} placeholder="Position" />

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string,
    position: PropTypes.string,
  }),
  loading: PropTypes.bool,
  isEdit: PropTypes.bool,
};

UserForm.defaultProps = {
  defaultValues: {},
  loading: false,
  isEdit: false,
};

export default UserForm;
