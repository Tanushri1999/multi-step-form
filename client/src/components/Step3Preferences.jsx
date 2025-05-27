
// import React, { useEffect, useState } from 'react';
// import { useFormContext } from 'react-hook-form';
// import { getCountries, getStates } from '../services/api';

// const Step3Preferences = () => {
//   const { register, watch, setValue, formState: { errors } } = useFormContext();

//   const country = watch('country');
//   const state = watch('state');

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   // Fetch countries on component mount
//   useEffect(() => {
//     getCountries()
//       .then(data => {
//         // Data expected: ["India", "USA", "Canada", ...]
//         const transformed = data.map(name => ({ code: name, name }));
//         setCountries(transformed);
//       })
//       .catch(err => console.error('Error fetching countries:', err));
//   }, []);

//   // Fetch states when country changes
//   useEffect(() => {
//     if (!country) {
//       setStates([]);
//       setCities([]);
//       setValue('state', '');
//       setValue('city', '');
//       return;
//     }

//     getStates(country)
//       .then(data => {
//         // Data expected: [{ _id, name, cities: [] }, ...]
//         const transformed = data.map(s => ({
//           code: s._id,
//           name: s.name,
//           cities: s.cities || []
//         }));
//         setStates(transformed);

//         // Reset selected state and city when country changes
//         setValue('state', '');
//         setValue('city', '');
//         setCities([]);
//       })
//       .catch(err => {
//         console.error('Error fetching states:', err);
//         setStates([]);
//         setCities([]);
//         setValue('state', '');
//         setValue('city', '');
//       });
//   }, [country, setValue]);

//   // Update cities when state changes
//   useEffect(() => {
//     if (!state) {
//       setCities([]);
//       setValue('city', '');
//       return;
//     }

//     const selectedState = states.find(s => s.code === state);
//     if (selectedState && selectedState.cities.length > 0) {
//       const transformed = selectedState.cities.map(cityName => ({
//         code: cityName,
//         name: cityName
//       }));
//       setCities(transformed);
//     } else {
//       setCities([]);
//     }
//     setValue('city', '');
//   }, [state, states, setValue]);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Step 3: Preferences</h2>

//       {/* Country */}
//       <div className="mb-4">
//         <label htmlFor="country" className="block font-semibold mb-1">
//           Country <span className="text-red-600">*</span>
//         </label>
//         <select
//           id="country"
//           {...register('country', { required: 'Country is required' })}
//           className="w-full border rounded px-3 py-2"
//         >
//           <option value="">Select country</option>
//           {countries.map(c => (
//             <option key={c.code} value={c.code}>{c.name}</option>
//           ))}
//         </select>
//         {errors.country && <p className="text-red-600">{errors.country.message}</p>}
//       </div>

//       {/* State */}
//       <div className="mb-4">
//         <label htmlFor="state" className="block font-semibold mb-1">
//           State <span className="text-red-600">*</span>
//         </label>
//         <select
//           id="state"
//           {...register('state', { required: 'State is required' })}
//           className="w-full border rounded px-3 py-2"
//           disabled={!country}
//         >
//           <option value="">Select state</option>
//           {states.map(s => (
//             <option key={s.code} value={s.code}>{s.name}</option>
//           ))}
//         </select>
//         {errors.state && <p className="text-red-600">{errors.state.message}</p>}
//       </div>

//       {/* City */}
//       <div className="mb-4">
//         <label htmlFor="city" className="block font-semibold mb-1">
//           City <span className="text-red-600">*</span>
//         </label>
//         <select
//           id="city"
//           {...register('city', { required: 'City is required' })}
//           className="w-full border rounded px-3 py-2"
//           disabled={!state}
//         >
//           <option value="">Select city</option>
//           {cities.map(c => (
//             <option key={c.code} value={c.code}>{c.name}</option>
//           ))}
//         </select>
//         {errors.city && <p className="text-red-600">{errors.city.message}</p>}
//       </div>

//       {/* Subscription Plan */}
//       <div className="mb-4">
//         <label className="block font-semibold mb-1">
//           Subscription Plan <span className="text-red-600">*</span>
//         </label>
//         <div className="flex flex-col space-y-2 ml-2">
//           {['Basic', 'Pro', 'Enterprise'].map(plan => (
//             <label key={plan} className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 value={plan}
//                 {...register('subscriptionPlan', { required: 'Subscription Plan is required' })}
//               />
//               <span>{plan}</span>
//             </label>
//           ))}
//         </div>
//         {errors.subscriptionPlan && <p className="text-red-600">{errors.subscriptionPlan.message}</p>}
//       </div>

//       {/* Newsletter */}
//       <div className="mb-4 flex items-center">
//         <input
//           id="newsletter"
//           type="checkbox"
//           defaultChecked
//           {...register('newsletter')}
//           className="mr-2"
//         />
//         <label htmlFor="newsletter" className="font-semibold">
//           Subscribe to newsletter
//         </label>
//       </div>
//     </div>
//   );
// };

// export default Step3Preferences;

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getCountries, getStates } from '../services/api';

const Step3Preferences = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();

  const country = watch('country');
  const state = watch('state');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCountries()
      .then(data => {
        const transformed = data.map(name => ({ code: name, name }));
        setCountries(transformed);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!country) {
      setStates([]);
      setCities([]);
      setValue('state', '');
      setValue('city', '');
      return;
    }
    getStates(country)
      .then(data => {
        setStates(data);  // data already [{ _id, name, cities }]
        setValue('state', '');
        setValue('city', '');
        setCities([]);
      })
      .catch(() => {
        setStates([]);
        setCities([]);
        setValue('state', '');
        setValue('city', '');
      });
  }, [country, setValue]);

  useEffect(() => {
    if (!state) {
      setCities([]);
      setValue('city', '');
      return;
    }
    // Find the selected state object from states array by _id
    const selectedState = states.find(s => s._id === state || s._id.toString() === state);
    if (selectedState) {
      const transformed = (selectedState.cities || []).map(cityName => ({ code: cityName, name: cityName }));
      setCities(transformed);
    } else {
      setCities([]);
    }
    setValue('city', '');
  }, [state, states, setValue]);

//   return (
//     <div>
//       {/* Country */}
//       <div>
//         <label>Country*</label>
//         <select {...register('country', { required: "Country is required" })}>
//           <option value="">Select country</option>
//           {countries.map(c => (
//             <option key={c.code} value={c.code}>{c.name}</option>
//           ))}
//         </select>
//         {errors.country && <p>{errors.country.message}</p>}
//       </div>

//       {/* State */}
//       <div>
//         <label>State*</label>
//         <select {...register('state', { required: "State is required" })} disabled={!country}>
//           <option value="">Select state</option>
//           {states.map(s => (
//             <option key={s._id} value={s._id}>{s.name}</option>
//           ))}
//         </select>
//         {errors.state && <p>{errors.state.message}</p>}
//       </div>

//       {/* City */}
//       <div>
//         <label>City*</label>
//         <select {...register('city', { required: "City is required" })} disabled={!state}>
//           <option value="">Select city</option>
//           {cities.map(c => (
//             <option key={c.code} value={c.code}>{c.name}</option>
//           ))}
//         </select>
//         {errors.city && <p>{errors.city.message}</p>}
//       </div>

//       {/* Other preferences... */}
//     </div>
//   );
// };

return (
  <div>
    {/* Country */}
    <div className="mb-4">
      <label htmlFor="country" className="block font-semibold mb-1">
        Country <span className="text-red-600">*</span>
      </label>
      <select
        id="country"
        {...register('country', { required: "Country is required" })}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Select country</option>
        {countries.map(c => (
          <option key={c.code} value={c.code}>{c.name}</option>
        ))}
      </select>
      {errors.country && <p className="text-red-600">{errors.country.message}</p>}
    </div>

    {/* State */}
    <div className="mb-4">
      <label htmlFor="state" className="block font-semibold mb-1">
        State <span className="text-red-600">*</span>
      </label>
      <select
        id="state"
        {...register('state', { required: "State is required" })}
        className="w-full border rounded px-3 py-2"
        disabled={!country}
      >
        <option value="">Select state</option>
        {states.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>
      {errors.state && <p className="text-red-600">{errors.state.message}</p>}
    </div>

    {/* City */}
    <div className="mb-4">
      <label htmlFor="city" className="block font-semibold mb-1">
        City <span className="text-red-600">*</span>
      </label>
      <select
        id="city"
        {...register('city', { required: "City is required" })}
        className="w-full border rounded px-3 py-2"
        disabled={!state}
      >
        <option value="">Select city</option>
        {cities.map(c => (
          <option key={c.code} value={c.code}>{c.name}</option>
        ))}
      </select>
      {errors.city && <p className="text-red-600">{errors.city.message}</p>}
    </div>

    {/* Other preferences... */}
    <div className="mb-4">
        <label className="block font-semibold mb-1">
          Subscription Plan <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col space-y-2 ml-2">
          {['Basic', 'Pro', 'Enterprise'].map(plan => (
            <label key={plan} className="flex items-center space-x-2">
              <input
                type="radio"
                value={plan}
                {...register('subscriptionPlan', { required: 'Subscription Plan is required' })}
              />
              <span>{plan}</span>
            </label>
          ))}
        </div>
        {errors.subscriptionPlan && <p className="text-red-600">{errors.subscriptionPlan.message}</p>}
      </div>

      
      <div className="mb-4 flex items-center">
        <input
          id="newsletter"
          type="checkbox"
          defaultChecked
          {...register('newsletter')}
          className="mr-2"
        />
        <label htmlFor="newsletter" className="font-semibold">
          Subscribe to newsletter
        </label>
      </div>
  </div>
);
}

export default Step3Preferences;
