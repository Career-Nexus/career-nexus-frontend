import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';

const CountryCodes = [
    {
        name: "United States",
        code: "US",
        continent: "North America",
        flag: <img src={"https://flagcdn.com/us.svg"} alt="United States Flag" className='w-20 h-20' />,
        dial_code: "+1"
    },
    {
        name: "Canada",
        code: "CA",
        continent: "North America",
        flag: <img src={"https://flagcdn.com/ca.svg"} alt="Canada Flag" className='w-20 h-20' />,
        dial_code: "+1"
    },
    {
        name: "Mexico",
        code: "MX",
        continent: "North America",
        flag: <img src={"https://flagcdn.com/mx.svg"} alt="Mexico Flag" className='w-20 h-20' />,
        dial_code: "+52"
    },
    {
        name: "Brazil",
        code: "BR",
        continent: "South America",
        flag: <img src={"https://flagcdn.com/br.svg"} alt="Brazil Flag" className='w-20 h-20' />,
        dial_code: "+55"
    },
    {
        name: "Argentina",
        code: "AR",
        continent: "South America",
        flag: <img src="https://flagcdn.com/ar.svg" alt="Argentina Flag" />,
        dial_code: "+54"
    },
    {
        name: "United Kingdom",
        code: "GB",
        continent: "Europe",
        flag: <img src="https://flagcdn.com/gb.svg" alt="United Kingdom Flag" />,
        dial_code: "+44"
    },
    {
        name: "Germany",
        code: "DE",
        continent: "Europe",
        flag: <img src="https://flagcdn.com/de.svg" alt="Germany Flag" />,
        dial_code: "+49"
    },
    {
        name: "France",
        code: "FR",
        continent: "Europe",
        flag: <img src="https://flagcdn.com/fr.svg" alt="France Flag" />,
        dial_code: "+33"
    },
    {
        name: "Italy",
        code: "IT",
        continent: "Europe",
        flag: <img src="https://flagcdn.com/it.svg" alt="Italy Flag" />,
        dial_code: "+39"
    },
    {
        name: "Spain",
        code: "ES",
        continent: "Europe",
        flag: <img src="https://flagcdn.com/es.svg" alt="Spain Flag" />,
        dial_code: "+34"
    },
    {
        name: "China",
        code: "CN",
        continent: "Asia",
        flag: <img src="https://flagcdn.com/cn.svg" alt="China Flag" />,
        dial_code: "+86"
    },
    {
        name: "India",
        code: "IN",
        continent: "Asia",
        flag: <img src="https://flagcdn.com/in.svg" alt="India Flag" />,
        dial_code: "+91"
    },
    {
        name: "Japan",
        code: "JP",
        continent: "Asia",
        flag: <img src="https://flagcdn.com/jp.svg" alt="Japan Flag" />,
        dial_code: "+81"
    },
    {
        name: "South Korea",
        code: "KR",
        continent: "Asia",
        flag: <img src="https://flagcdn.com/kr.svg" alt="South Korea Flag" />,
        dial_code: "+82"
    },
    {
        name: "Indonesia",
        code: "ID",
        continent: "Asia",
        flag: <img src="https://flagcdn.com/id.svg" alt="Indonesia Flag" />,
        dial_code: "+62"
    },
    {
        name: "Nigeria",
        code: "NG",
        continent: "Africa",
        flag: <img src="https://flagcdn.com/ng.svg" alt="Nigeria Flag" />,
        dial_code: "+234"
    },
    {
        name: "South Africa",
        code: "ZA",
        continent: "Africa",
        flag: <img src="https://flagcdn.com/za.svg" alt="South Africa Flag" />,
        dial_code: "+27"
    },
    {
        name: "Egypt",
        code: "EG",
        continent: "Africa",
        flag: <img src="https://flagcdn.com/eg.svg" alt="Egypt Flag" />,
        dial_code: "+20"
    },
    {
        name: "Australia",
        code: "AU",
        continent: "Oceania",
        flag: <img src="https://flagcdn.com/au.svg" alt="Australia Flag" />,
        dial_code: "+61"
    },
    {
        name: "New Zealand",
        code: "NZ",
        continent: "Oceania",
        flag: <img src="https://flagcdn.com/nz.svg" alt="New Zealand Flag" />,
        dial_code: "+64"
    }
]
const apiNoAuth = axios.create({
  baseURL: 'https://btest.career-nexus.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
//    timeout: 10000,
});

export const ProfileSetup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(CountryCodes[0]?.dial_code || '+1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!firstName || !lastName || !phoneNumber) {
      setError('All fields are required');
      setLoading(false);
    //   toast.error('All fields are required');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone number must be 10 digits');
      setLoading(false);
    //   toast.error('Phone number must be 10 digits');
      return;
    }

    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: `${countryCode}${phoneNumber}`,
    };

    try {
      const cookies = Cookies.get();
      console.log('Cookies sent with request:', cookies);

      const tempToken = Cookies.get('temp_token');
      console.log('Temporary token:', tempToken || 'None');

      const headers = {};
      if (tempToken) headers['Authorization'] = `Bearer ${tempToken}`; // Use Bearer token

      console.log('Submitting data:', updatedData);
      console.log('Request headers:', headers);

      const response = await apiNoAuth.put('/user/profile-update/', updatedData, { headers });

      console.log('Update response:', { status: response.status, data: response.data });

      if ([200, 201, 204].includes(response.status)) {
        console.log('Profile updated successfully:', updatedData);
        // toast.success('Profile updated successfully');
        navigate('/select-type');
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
        <div className="bg-white p-8 rounded-lg w-full max-w-md mx-auto">
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

          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="appearance-none bg-gray-100 w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
                >
                  {CountryCodes.map((country) => (
                    <option key={country.code} value={country.dial_code}>
                      {country.flag} {country.dial_code}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <input
                type="text"
                placeholder="201-555-5555"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6DA05D] hover:bg-[#5B8F4E] text-white'
            }`}
          >
            {loading ? 'Saving...' : 'Save & Continue'}
          </button>
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
};
