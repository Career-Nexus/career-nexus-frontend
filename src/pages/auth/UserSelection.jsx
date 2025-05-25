


import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; // Optional: for better error feedback
import axios from 'axios';
import Cookies from 'js-cookie';

const apiNoAuth = axios.create({
  baseURL: 'https://btest.career-nexus.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

export default function UserTypeSelection() {
  const [selectedIndustry, setSelectedIndustry] = useState('Technology'); // Single selection
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const industries = [
    'Technology',
    'Health Care',
    'Retail & E-commerce',
    'Manufacturing',
    'Media & Entertainment',
    'Government & Public Sector',
    'Nonprofit & NGO',
    'Energy & Utilities',
    'Legal Services',
    'Construction & Real Estate',
    'Transportation & Logistics',
    'Agriculture',
    'Banking',
    'Education',
    'Others',
  ];

  const selectIndustry = (industry) => {
    setSelectedIndustry(industry); // Set single industry
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!selectedIndustry) {
      setError('Please select an industry');
      setLoading(false);
      // toast.error('Please select an industry');
      return;
    }

    const payload = {
      industry: selectedIndustry.toLowerCase(), // Ensure lowercase
    };

    try {
      const cookies = Cookies.get();
      console.log('Cookies sent with request:', cookies);

      const tempToken = Cookies.get('temp_token');
      console.log('Temporary token:', tempToken || 'None');

      if (!tempToken) {
        throw new Error('No authentication token found. Please complete signup and OTP verification.');
      }

      const headers = {
        Authorization: `Bearer ${tempToken}`, // Bearer token
      };

      console.log('Submitting data:', payload); // Log lowercase payload
      console.log('Request headers:', headers);

      const response = await apiNoAuth.patch('/user/profile-update/', payload, { headers });

      console.log('Update response:', { status: response.status, data: response.data });

      if ([200, 201, 204, 206].includes(response.status)) {
        console.log('Industry updated successfully:', payload);
        // toast.success('Industry selected successfully');
        Cookies.remove('temp_token');
        Cookies.remove('user_id');
        navigate('/home');
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      const errorMessage = err.response
        ? err.response.status === 401
          ? 'Authentication failed: Invalid or missing token. Please complete signup and OTP verification.'
          : err.response.data.message || JSON.stringify(err.response.data)
        : err.message === 'Network Error'
        ? 'Network error: Unable to reach the server. Please check your connection or try again later.'
        : err.message.includes('CORS') || err.message.includes('Access-Control')
        ? 'CORS error: Server is blocking the request due to header restrictions. Please contact support.'
        : err.message || 'Failed to update industry. Please try again later.';
      setError(errorMessage);
      console.error('Error updating industry:', {
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data,
        error: err,
      });
      // toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-12 md:col-span-7">
        <div className="max-w-xl mx-auto py-12 px-4">
          <div className="mb-8">
            <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 2/2</div>
            <h2 className="text-2xl font-bold text-[#2A0D47] mb-5">Select your preferred industry</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  className={`py-2 my-1 px-3 rounded-lg text-xs border transition-colors ${
                    selectedIndustry === industry
                      ? 'bg-[#E6FFEB] border-[#6DA05D] text-[#6DA05D] font-medium'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => selectIndustry(industry)}
                  disabled={loading}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          <div className="flex">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-[#6DA05D] hover:bg-[#5B8F4E] text-white font-medium py-3 px-6 rounded-lg w-full max-w-xs transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Saving...' : 'Complete'}
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 px-4 bg-white hidden md:block">
        <div className="flex justify-center items-center min-h-screen bg-[#E6FFEB5C]">
          <div className="bg-[#E6FFEB5C] p-8 rounded-lg w-full max-w-md">
            <img src="/images/Variant3.png" alt="Verify Email" />
          </div>
        </div>
      </div>
    </div>
  );
}
