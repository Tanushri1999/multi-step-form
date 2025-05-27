import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Step1PersonalInfo from './components/Step1PersonalInfo.jsx';
import Step2ProfessionalDetails from './components/Step2ProfessionalDetails';
import Step3Preferences from './components/Step3Preferences';
import Summary from './components/Summary';

import { saveUser } from './services/api';

const STEPS = [
  { id: 1, component: Step1PersonalInfo },
  { id: 2, component: Step2ProfessionalDetails },
  { id: 3, component: Step3Preferences },
  { id: 4, component: Summary },
];

function App() {
  const methods = useForm({ mode: 'onChange' });
  const { handleSubmit, trigger, getValues, formState: { isValid } } = methods;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const CurrentStepComponent = STEPS.find(s => s.id === step).component;

  // Proceed to next step after validation
  const onNext = async () => {
    const valid = await trigger();
    if (valid) {
      setStep(prev => prev + 1);
    }
  };

  // Back to previous step
  const onBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  // Final submission
  const onSubmit = async (data) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setSubmitting(true);

    try {
      // Build FormData for file upload
      const formData = new FormData();

      for (const key in data) {
        if (key === 'profilePhoto') {
          if (data[key] && data[key].length > 0) {
            formData.append('profilePhoto', data[key][0]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await saveUser(formData);
      setSubmitSuccess('Profile saved successfully!');
    } catch (error) {
      setSubmitError('Error saving profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CurrentStepComponent data={getValues()} />

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Back
              </button>
            )}

            {step < STEPS.length ? (
              <button
                type="button"
                onClick={onNext}
                disabled={!isValid}
                className={`px-4 py-2 rounded text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>

          {submitError && <p className="mt-4 text-red-600">{submitError}</p>}
          {submitSuccess && <p className="mt-4 text-green-600">{submitSuccess}</p>}
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
