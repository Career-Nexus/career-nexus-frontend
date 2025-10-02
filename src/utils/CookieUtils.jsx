/**
 * Utility functions for debugging cookie issues
 */

export const debugCookies = () => {
  console.log("All cookies:", document.cookie)
  
    // Parse and display individual cookies
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split("=")
    acc[name] = value
    return acc
  }, {})

  //console.log("Parsed cookies:", cookies)

  // Check for potential issues
  if (document.cookie === "") {
    console.warn("No cookies found. Possible causes:")
    console.warn("- Cookies are blocked by browser settings")
    console.warn("- Running on a non-standard port in development")
    console.warn("- Missing or incorrect domain")
    console.warn("- Secure flag set but not using HTTPS")
  }

  return cookies
}
  
export const checkCookiePermissions = () => {
  try {
    // Try to set a test cookie
    document.cookie = "test_cookie=1; path=/"
    const cookieEnabled = document.cookie.indexOf("test_cookie") !== -1

    // Clean up test cookie
    document.cookie = "test_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    return cookieEnabled
  } catch (e) {
    console.error("Error checking cookie permissions:", e)
    return false
  }
}
  