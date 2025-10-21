import { useEffect, useState } from 'react';
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
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(CountryCodes[0]);
  const [countryNum, setCountryNum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountryNum("enable");
  }, []);

  const fetchCountryNum = async (status = "exempted") => {
    try {
      const result = await api.get(`/info/country-permit/?status=${status}`);
      console.log("Fetched countries:", result.data);

      // 🔹 Merge backend results with local CountryCodes (for flags)
      const mergedOptions = result.data.map((country) => {
        const match = CountryCodes.find(
          (c) =>
            c.name.trim().toLowerCase() === country.country.trim().toLowerCase() ||
            c.code === country.code
        );

        return {
          value: country.code,
          label: (
            <div className="flex items-center gap-2">
              {match?.flag && (
                <img
                  src={match.flag}
                  alt={`${country.country} Flag`}
                  className="w-5 h-5 rounded"
                />
              )}
              <span className="text-gray-500">{country.code}</span>
            </div>
          ),
          flag: match?.flag || null,
          country: country.country,
        };
      });

      // 🔹 Add missing static countries (flags + dial code only)
      const staticExtras = CountryCodes.filter(
        (staticCountry) =>
          !mergedOptions.some(
            (fetched) =>
              fetched.value === staticCountry.dial_code ||
              fetched.country?.trim().toLowerCase() ===
              staticCountry.name.trim().toLowerCase()
          )
      ).map((country) => ({
        value: country.dial_code,
        label: (
          <div className="flex items-center gap-2">
            <img
              src={country.flag}
              alt={`${country.name} Flag`}
              className="w-5 h-5 rounded"
            />
            <span className="text-gray-500">{country.dial_code}</span>
          </div>
        ),
        flag: country.flag,
        country: country.name,
      }));

      const combined = [...mergedOptions, ...staticExtras].sort((a, b) =>
        a.country.localeCompare(b.country)
      );

      setCountryNum(combined);
      setCountryCode(combined[0]);
    } catch (error) {
      console.error("Error fetching country numbers:", error);
      toast.error("Failed to fetch country codes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!firstName || !lastName || !phoneNumber) {
      setError("All fields are required");
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Phone number must be 10 digits");
      toast.error("Phone number must be 10 digits");
      setLoading(false);
      return;
    }

    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      country_code: countryCode?.value || "",
      phone_number: phoneNumber,
    };

    try {
      const accessToken = Cookies.get("access_token");
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      console.log("Submitting data:", updatedData);
      console.log("Headers:", headers);

      const response = await api.put("/user/profile-update/", updatedData, { headers });

      if ([200, 201, 204].includes(response.status)) {
        toast.success("Profile updated successfully!");
        authService.isAuthenticated(true);
        navigate("/select-type", { replace: true });
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      const errorMessage = err.response
        ? err.response.status === 401
          ? "Authentication failed: Invalid or missing token. Please complete signup and OTP verification."
          : err.response.data.message || JSON.stringify(err.response.data)
        : err.message === "Network Error"
          ? "Network error: Unable to reach the server."
          : err.message.includes("CORS")
            ? "CORS error: Server blocked the request."
            : err.message || "Failed to update profile.";
      setError(errorMessage);
      console.error("Error updating profile:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Left Section (Form) */}
      <div className="col-span-12 md:col-span-7 flex justify-center items-center">
        <div className="bg-white rounded-lg w-full max-w-md ml-10 md:ml-28">
          <img src={CnLogo} alt="Logo" className="w-24 mb-4" />
          <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 1/2</div>
          <h2 className="text-2xl font-bold text-[#2A0D47] mb-6">Set up your profile</h2>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          {/* First Name */}
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
            <p className="text-xs text-gray-500 mt-1">
              Your name should match your government-issued ID
            </p>
          </div>

          {/* Last Name */}
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
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <div className="w-40">
                <Select
                  options={countryNum}
                  value={countryCode}
                  onChange={(selected) => setCountryCode(selected)}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isSearchable
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-[50%] py-2 px-4 rounded-lg ${loading
                ? "bg-[#5B8F4E] text-white cursor-not-allowed"
                : "bg-[#5B8F4E] hover:bg-[#4C7E40] text-white"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <LoadingIcon className="mr-2" /> Saving...
              </span>
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="col-span-12 md:col-span-5 hidden md:flex justify-center items-center bg-[#E6FFEB33]">
        <div className="p-8 rounded-lg w-full max-w-md">
          <img src={Cuate} alt="Profile setup illustration" />
        </div>
      </div>
    </div>
  );
};
