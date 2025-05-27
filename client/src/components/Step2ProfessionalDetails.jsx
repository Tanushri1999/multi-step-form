import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2ProfessionalDetails = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const profession = watch('profession');

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 2: Professional Details</h2>

      {/* Profession */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Profession <span className="text-red-600">*</span></label>
        <select
          {...register('profession', { required: 'Profession is required' })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select profession</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
        {errors.profession && <p className="text-red-600">{errors.profession.message}</p>}
      </div>

      {/* Company Name (only if Entrepreneur) */}
      {profession === 'Entrepreneur' && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Company Name <span className="text-red-600">*</span></label>
          <input
            type="text"
            {...register('companyName', { required: 'Company Name is required for Entrepreneurs' })}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter company name"
          />
          {errors.companyName && <p className="text-red-600">{errors.companyName.message}</p>}
        </div>
      )}

      {/* Address Line 1 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Address Line 1 <span className="text-red-600">*</span></label>
        <input
          type="text"
          {...register('addressLine1', { required: 'Address Line 1 is required' })}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter address line 1"
        />
        {errors.addressLine1 && <p className="text-red-600">{errors.addressLine1.message}</p>}
      </div>
    </div>
  );
};

export default Step2ProfessionalDetails;
