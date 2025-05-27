import React, { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { checkUsernameAvailability } from '../services/api';

const passwordRegex = {
  specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  number: /\d/,
};

const Step1PersonalInfo = () => {
  const { register, watch, setError, clearErrors, formState: { errors }, control } = useFormContext();
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const username = watch('username');
  const newPassword = watch('newPassword');
  const profilePhoto = watch('profilePhoto');

  // Live profile image preview
  useEffect(() => {
    if (profilePhoto && profilePhoto.length > 0) {
      const file = profilePhoto[0];
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setProfilePreview(null);
    }
  }, [profilePhoto]);

  // Username availability check with debounce
  useEffect(() => {
    if (!username || username.length < 4) {
      setUsernameAvailable(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const available = await checkUsernameAvailability(username);
      setUsernameAvailable(available);
      if (!available) {
        setError('username', { type: 'manual', message: 'Username already taken' });
      } else {
        clearErrors('username');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username, setError, clearErrors]);

  // Password strength calculation (0-3)
  useEffect(() => {
    let strength = 0;
    if (newPassword && newPassword.length >= 8) strength++;
    if (newPassword && passwordRegex.specialChar.test(newPassword)) strength++;
    if (newPassword && passwordRegex.number.test(newPassword)) strength++;
    setPasswordStrength(strength);
  }, [newPassword]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 1: Personal Info</h2>

      {/* Profile Photo */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Profile Photo <span className="text-red-600">*</span></label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          {...register('profilePhoto', {
            required: 'Profile photo is required',
            validate: {
              fileType: files => files && ['image/jpeg', 'image/png'].includes(files[0]?.type) || 'Only JPG/PNG allowed',
              fileSize: files => files && files[0]?.size <= 2 * 1024 * 1024 || 'Max size 2MB',
            }
          })}
          className="block w-full text-sm text-gray-700"
        />
        {errors.profilePhoto && <p className="text-red-600">{errors.profilePhoto.message}</p>}

        {/* Preview */}
        {profilePreview && <img src={profilePreview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-full border" />}
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Username <span className="text-red-600">*</span></label>
        <input
          type="text"
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 4, message: 'Minimum 4 characters' },
            maxLength: { value: 20, message: 'Maximum 20 characters' },
            pattern: { value: /^\S+$/, message: 'No spaces allowed' },
          })}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter username"
        />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}
        {usernameAvailable === true && <p className="text-green-600">Username available</p>}
        {usernameAvailable === false && <p className="text-red-600">Username not available</p>}
      </div>

      {/* Current Password */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Current Password (required if changing password)</label>
        <input
          type="password"
          {...register('currentPassword', {
            validate: (value) => {
              const newPass = watch('newPassword');
              if (newPass && !value) return 'Current password required to change password';
              return true;
            }
          })}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter current password"
        />
        {errors.currentPassword && <p className="text-red-600">{errors.currentPassword.message}</p>}
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">New Password</label>
        <input
          type="password"
          {...register('newPassword', {
            validate: (value) => {
              if (!value) return true; // not required if not changing
              if (value.length < 8) return 'Minimum 8 characters';
              if (!passwordRegex.specialChar.test(value)) return 'Must include 1 special character';
              if (!passwordRegex.number.test(value)) return 'Must include 1 number';
              return true;
            }
          })}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter new password"
        />
        {errors.newPassword && <p className="text-red-600">{errors.newPassword.message}</p>}

        {/* Password Strength Meter */}
        <div className="h-2 w-full bg-gray-300 rounded mt-1">
          <div
            style={{ width: `${(passwordStrength / 3) * 100}%` }}
            className={`h-2 rounded ${passwordStrength === 3 ? 'bg-green-500' : passwordStrength === 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
          ></div>
        </div>
       
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
