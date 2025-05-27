import React from 'react';

const Summary = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Username:</strong> {data.username}</p>
       
        <p><strong>Profession:</strong> {data.profession}</p>
        {data.profession === 'Entrepreneur' && <p><strong>Company Name:</strong> {data.companyName}</p>}
        <p><strong>Address:</strong> {data.addressLine1}</p>
        <p><strong>Location:</strong> {data.country} / {data.state} / {data.city}</p>
        <p><strong>Subscription Plan:</strong> {data.subscriptionPlan}</p>
        <p><strong>Newsletter Subscription:</strong> {data.newsletter ? 'Yes' : 'No'}</p>
      </div>
      <p className="mt-4 text-sm text-gray-500">Note: Profile photo and password are hidden for security reasons.</p>
    </div>
  );
};

export default Summary;
