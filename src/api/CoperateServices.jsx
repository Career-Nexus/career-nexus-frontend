import api from "./ApiServiceThree";

/**
 * Corporate Services API
 * -----------------------
 * Handles all corporate-related API requests.
 */
function handleApiError(error, defaultMessage = "An unexpected error occurred") {
  if (error.response) {
    const message =
      error.response.data?.detail ||
      error.response.data?.message ||
      error.response.data?.error ||
      defaultMessage;
    throw new Error(message);
  } else if (error.request) {
    throw new Error("No response from server. Please check your internet connection.");
  } else {
    throw new Error(defaultMessage);
  }
}

// ✅ Create a corporate profile
export async function createCorporateProfile(data) {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    const response = await api.post("/user/corporate/signup/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to create corporate profile");
  }
}

export async function getChoiceFieldData(fieldName = null) {
  try {
    const endpoint = fieldName
      ? `/info/choice-data/?field_name=${fieldName}`
      : "/info/choice-data/";

    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch choice field data");
  }
}


// ✅ Fetch all corporate profiles (admin or company listing)
// export async function getAllCorporateProfiles() {
//   try {
//     const response = await api.get("/user/corporate/");
//     return response.data;
//   } catch (error) {
//     handleApiError(error, "Failed to fetch corporate profiles");
//   }
// }

// ✅ Get a specific corporate profile by ID
// export async function getCorporateProfileById(id) {
//   try {
//     const response = await api.get(`/user/corporate/${id}/`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, "Failed to fetch corporate profile");
//   }
// }

// ✅ Update corporate profile (PATCH for partial updates)
// export async function updateCorporateProfile(id, data) {
//   try {
//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== "") {
//         formData.append(key, value);
//       }
//     });

//     const response = await api.patch(`/user/corporate/${id}/`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     handleApiError(error, "Failed to update corporate profile");
//   }
// }

// ✅ Delete corporate profile
// export async function deleteCorporateProfile(id) {
//   try {
//     const response = await api.delete(`/user/corporate/${id}/`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, "Failed to delete corporate profile");
//   }
// }

/**
 * 🔧 Helper: Consistent error handler for all corporate service calls
 */
// function handleApiError(error, defaultMessage) {
//   if (error.response) {
//     const detail =
//       error.response.data?.detail ||
//       error.response.data?.message ||
//       defaultMessage;
//     throw new Error(detail);
//   }
//   throw new Error("Network or server error occurred");
// }

/**
 * ✅ Export as grouped service (optional)
 */
const CorporateServices = {
  createCorporateProfile,
  getChoiceFieldData,
//   getAllCorporateProfiles,
//   getCorporateProfileById,
//   updateCorporateProfile,
//   deleteCorporateProfile,
};

export default CorporateServices;
