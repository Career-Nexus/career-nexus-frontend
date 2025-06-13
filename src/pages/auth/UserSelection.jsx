import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; // Optional: for better error feedback
import axios from 'axios';
import Cookies from 'js-cookie';
import { ArrowgBack, SetupMarked, SetupSpin } from "../../assets/icons";
import { CnLogo, Pana } from "../../assets/images";
import { LoadingIcon } from "../../icons/icon";

const apiNoAuth = axios.create({
  baseURL: 'https://btest.career-nexus.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});
export default function UserTypeSelection() {
  const [selectedIndustry, setSelectedIndustry] = useState('Technology');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [isSetupComplete, setIsSetupComplete] = useState(false); // Track modal state
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
    setSelectedIndustry(industry);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setShowModal(true); // Show the modal when submission starts

    if (!selectedIndustry) {
      setError('Please select an industry');
      setLoading(false);
      setShowModal(false);
      return;
    }

    const payload = {
      industry: selectedIndustry.toLowerCase(),
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
        Authorization: `Bearer ${tempToken}`,
      };

      console.log('Submitting data:', payload);
      console.log('Request headers:', headers);

      const response = await apiNoAuth.patch('/user/profile-update/', payload, { headers });

      console.log('Update response:', { status: response.status, data: response.data });

      if ([200, 201, 204, 206].includes(response.status)) {
        console.log('Industry updated successfully:', payload);
        

        setTimeout(() => {
          setIsSetupComplete(true);
          setTimeout(() => {
            setShowModal(false);
            navigate('/home');
          }, 5000); 
        }, 5000);
        // Cookies.remove('temp_token');
        // Cookies.remove('user_id');
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
      setLoading(false);
      setShowModal(false); // Hide modal on error
    }
  };

  return (
    <div className="relative grid grid-cols-12 min-h-screen">
      {/* Main Content */}
      <div className="col-span-12 md:col-span-7">
        <div className="bg-white rounded-lg w-full max-w-xl md:ml-28 mx-5">
          <img src={CnLogo} alt="Logo" className="w-24" />
          <div className="mb-8">
            <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 2/2</div>
            <h2 className="text-2xl font-bold text-[#2A0D47] mb-5">Select your preferred industry</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  className={`py-2 my-1 md:px-3 text-wrap rounded-lg text-xs border transition-colors 
                    ${selectedIndustry === industry
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

          <div className="flex items-center gap-2">
            <Link to="/profile-setup" className="flex items-center border border-green-400 p-2 rounded-lg">
              <img src={ArrowgBack} alt="Back" className="w-6 h-6" />
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-[#5B8F4E] hover:bg-[#5B8F4E] text-white font-medium py-2 px-4 rounded-lg w-[50%] max-w-xs transition-colors 
                ${loading ? 'bg-[#5B8F4E] text-white cursor-not-allowed' : ''
                }`}
            >
              {loading ?( 
              <span className="flex items-center">
                <LoadingIcon className="mr-2"/>
                Saving...
              </span>
              ):( 
                'Complete'
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 px-4 bg-white hidden md:block">
        <div className="flex justify-center items-center min-h-screen bg-[#E6FFEB33]">
          <div className="bg-[#E6FFEB33] p-8 rounded-lg w-full max-w-md">
            <img src={Pana} alt="Select Industry" />
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-64 h-48 border border-gray-300">
            {!isSetupComplete ? (
              <>
                <img src={SetupSpin} alt="setup-spin" className="animate-spin h-20 w-20 text-[#5B8F4E]" />
                <p className="mt-4 text-lg font-semibold text-purple-700">Setting up Profile...</p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                  <img src={SetupMarked} alt="setup-marked" className="h-20 w-20 text-[#5B8F4E] items-center justify-center" />
                </div>
                <p className="mt-4 text-lg font-semibold text-purple-700">Setup Complete!</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}