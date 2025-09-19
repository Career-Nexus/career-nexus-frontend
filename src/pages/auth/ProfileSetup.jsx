import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CnLogo, Cuate } from '../../assets/images';
import { LoadingIcon } from '../../icons/icon';
import { toast } from 'react-toastify';
import Select from "react-select";
import { CountryCodes } from './CountryCodes';
import api, { authService } from '../../api/ApiServiceThree';

export const ProfileSetup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [countryCode, setCountryCode] = useState(CountryCodes[0]?.dial_code || '+1');
  const [countryCode, setCountryCode] = useState(CountryCodes[0])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const countryOptions = CountryCodes.map((country) => ({
  //   value: country,
  //   label: (
  //     <div className="flex items-center gap-1">
  //       <img src={country.flag || "/placeholder.svg"} alt={`${country.name} Flag`} className="w-5 h-5" />
  //       <span>{country.dial_code}</span>
  //     </div>
  //   ),
  // }))
  const countryOptions = CountryCodes.map((country) => ({
  value: country.dial_code, // just keep dial_code as the value
  label: (
    <div className="flex items-center gap-1">
      <img
        src={country.flag || "/placeholder.svg"}
        alt={`${country.name} Flag`}
        className="w-5 h-5"
      />
      <span>{country.dial_code}</span>
    </div>
  ),
  //country: country, // keep full country if you want
}))

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!firstName || !lastName || !phoneNumber) {
      setError('All fields are required');
      setLoading(false);
      toast.error('All fields are required');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone number must be 10 digits');
      setLoading(false);
      toast.error('Phone number must be 10 digits');
      return;
    }

    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      dial_code: countryCode.dial_code,   // store separately
      phone_number: phoneNumber,          // just the raw number
    };



    try {
      const cookies = Cookies.get();
      console.log('Cookies sent with request:', cookies);
      const accessToken = Cookies.get('access_token');
      console.log('Access token:', accessToken || 'None');

      const headers = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

      console.log('Submitting data:', updatedData);
      console.log('Request headers:', headers);

      const response = await api.put('/user/profile-update/', updatedData, { headers });

      console.log('Update response:', { status: response.status, data: response.data });

      if ([200, 201, 204].includes(response.status)) {
        console.log('Profile updated successfully:', updatedData);
        toast.success('Profile updated successfully');
        authService.isAuthenticated(true);
        navigate('/select-type', { replace: true });
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
            : err.message || 'Failed to update profile. Please try again later.';
      setError(errorMessage);
      console.error('Error updating profile:', {
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data,
        error: err,
      });
      //   toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-12 md:col-span-7">
        <div className="bg-white rounded-lg w-full max-w-md ml-28">
          <img src={CnLogo} alt="Logo" className='w-24' />
          <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 1/2</div>
          <h2 className="text-2xl font-bold text-[#2A0D47] mb-6">Set up your profile</h2>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="E.g. Michael"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
            />
            <p className="text-xs text-gray-500 mt-1">Your name should match your government-issued ID</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="E.g. Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
            />
            <p className="text-xs text-gray-500 mt-1">Your name should match your government-issued ID</p>
          </div>

          <div className=" mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <div className="w-40">
                <Select
                  options={countryOptions}
                  defaultValue={countryOptions[0]}
                  onChange={(selected) => setCountryCode(selected.value)}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                
              </div>
              <input
                type="text"
                placeholder="2015555555"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-[50%] py-2 px-4 rounded-lg ${loading ? 'bg-[#5B8F4E] text-white cursor-not-allowed' : 'bg-[#5B8F4E] hover:bg-[#5B8F4E] text-white'
              }`}
          >
            {loading ? (
              <span className="flex items-center">
                <LoadingIcon className="mr-2" />
                Saving...
              </span>
            ) : ('Save & Continue')
            }
          </button>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 px-4 bg-white hidden md:block">
        <div className="flex justify-center items-center min-h-screen bg-[#E6FFEB33]">
          <div className="bg-[#E6FFEB33] p-8 rounded-lg w-full max-w-md">
            <img src={Cuate} alt="Profile setup" />
          </div>
        </div>
      </div>
    </div>
  );
};
