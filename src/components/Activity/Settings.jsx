import { useState } from "react";

// Simple toggle switch component
const Toggle = ({ enabled, setEnabled }) => (
  <button
    onClick={() => setEnabled(!enabled)}
    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
      enabled ? "bg-[#5DA05D]" : "bg-gray-300"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
        enabled ? "translate-x-5" : ""
      }`}
    />
  </button>
);

export default function Settings() {
  // State for each toggle
  const [linkedin, setLinkedin] = useState(true);
  const [github, setGithub] = useState(true);
  const [twitter, setTwitter] = useState(false);
  const [google, setGoogle] = useState(true);

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [messageNotif, setMessageNotif] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(true);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#5DA05D] text-white rounded-lg hover:bg-[#4CAF50]">
            Save Changes
          </button>
        </div>
      </div>

      {/* Connected Accounts */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Connected Accounts</h2>
        <div className="space-y-4">
          {/* Linkedin */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {/* Linkedin SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.041-1.852-3.041-1.854 0-2.138 1.446-2.138 2.939v5.671H9.34V9h3.409v1.561h.049c.476-.9 1.635-1.852 3.366-1.852 3.598 0 4.262 2.367 4.262 5.448v6.295zM5.337 7.433c-1.103 0-1.996-.894-1.996-1.996s.893-1.996 1.996-1.996c1.102 0 1.996.894 1.996 1.996s-.894 1.996-1.996 1.996zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.771v20.451C0 23.229.792 24 1.771 24h20.451C23.229 24 24 23.229 24 22.222V1.771C24 .771 23.229 0 22.225 0z" />
              </svg>
              <span>LinkedIn</span>
            </div>
            <Toggle enabled={linkedin} setEnabled={setLinkedin} />
          </div>

          {/* Github */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {/* GitHub SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58V20.9c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.73.08-.73a2.52 2.52 0 011.84 1.24 2.54 2.54 0 003.46 1 2.55 2.55 0 01.76-1.6c-2.66-.3-5.47-1.33-5.47-5.92a4.64 4.64 0 011.23-3.22 4.3 4.3 0 01.12-3.18s1-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23a4.3 4.3 0 01.12 3.18 4.64 4.64 0 011.23 3.22c0 4.6-2.81 5.62-5.49 5.92a2.85 2.85 0 01.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 0z" />
              </svg>
              <span>GitHub</span>
            </div>
            <Toggle enabled={github} setEnabled={setGithub} />
          </div>

          {/* Twitter */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {/* Twitter/X SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.36 1.64h3.4l-7.4 8.46L24 22.36h-6.68l-5.22-7.5-5.97 7.5H0l7.86-9.88L0 1.64h6.85l4.74 6.91 6.77-6.91z" />
              </svg>
              <span>Twitter</span>
            </div>
            <Toggle enabled={twitter} setEnabled={setTwitter} />
          </div>

          {/* Google */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {/* Google SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.66 2.74 30.16 0 24 0 14.62 0 6.66 5.39 2.69 13.22l7.9 6.13C12.27 13.38 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.1 24.55c0-1.57-.14-3.09-.39-4.55H24v9.02h12.35c-.54 2.91-2.14 5.39-4.54 7.05l7.15 5.55c4.18-3.86 6.54-9.55 6.54-17.07z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.59 28.35A14.5 14.5 0 019.5 24c0-1.52.26-2.99.73-4.35l-7.9-6.13A23.86 23.86 0 000 24c0 3.84.92 7.47 2.55 10.65l8.04-6.3z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.48 0 11.92-2.13 15.9-5.8l-7.15-5.55c-2 1.34-4.57 2.15-8.75 2.15-6.26 0-11.73-3.88-13.41-9.35l-8.04 6.3C6.66 42.61 14.62 48 24 48z"
                />
              </svg>
              <span>Google</span>
            </div>
            <Toggle enabled={google} setEnabled={setGoogle} />
          </div>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Notification Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>Email Notifications</span>
            <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>Push Notifications</span>
            <Toggle enabled={pushNotif} setEnabled={setPushNotif} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>Weekly Digest</span>
            <Toggle enabled={weeklyDigest} setEnabled={setWeeklyDigest} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>Job Alerts</span>
            <Toggle enabled={jobAlerts} setEnabled={setJobAlerts} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>Message Notifications</span>
            <Toggle enabled={messageNotif} setEnabled={setMessageNotif} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>Marketing Emails</span>
            <Toggle enabled={marketingEmails} setEnabled={setMarketingEmails} />
          </div>
        </div>
      </section>

      {/* Privacy Settings */}
      {/* <section>
        <h2 className="text-lg font-semibold mb-3">Privacy Settings</h2>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>Profile Visibility</span>
          <select className="border rounded px-3 py-1">
            <option>Public</option>
            <option>Private</option>
            <option>Only Connections</option>
          </select>
        </div>
      </section> */}
      <SettingsPage/>
    </div>
  );
}

function SettingsPage() {
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [showEmail, setShowEmail] = useState(true);
  const [showLocation, setShowLocation] = useState(false);
  const [allowMessaging, setAllowMessaging] = useState(true);
  const [showActivity, setShowActivity] = useState(true);

  const [language, setLanguage] = useState("English");
  const [timeZone, setTimeZone] = useState("Pacific Time");

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Privacy Settings */}
      <div>
        <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
        <div className="space-y-3">
          {/* Profile Visibility */}
          <div className="flex justify-between items-center border p-3 rounded-lg">
            <div>
              <p className="font-medium">Profile Visibility</p>
              <p className="text-sm text-gray-500">
                Control who can see your profile
              </p>
            </div>
            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option>Public</option>
              <option>Friends</option>
              <option>Private</option>
            </select>
          </div>

          {/* Toggles */}
          {[
            { label: "Show Email", desc: "Display your email address on your profile", state: showEmail, setState: setShowEmail },
            { label: "Show Location", desc: "Display your location on your profile", state: showLocation, setState: setShowLocation },
            { label: "Allow Messaging", desc: "Allow others to send you messages", state: allowMessaging, setState: setAllowMessaging },
            { label: "Show Activity", desc: "Show your recent activity to others", state: showActivity, setState: setShowActivity },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => item.setState(!item.state)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  item.state ? "bg-[#5DA05D]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                    item.state ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Language & Region */}
      <div>
        <h2 className="text-xl font-bold mb-4">Language & Region</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center border p-3 rounded-lg">
            <p className="font-medium">Language</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div className="flex justify-between items-center border p-3 rounded-lg">
            <p className="font-medium">Time Zone</p>
            <select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option>Pacific Time</option>
              <option>Eastern Time</option>
              <option>Central Time</option>
              <option>GMT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
        <div className="space-y-3">
          {[
            { label: "Email Notifications", desc: "Receive updates via email", state: emailNotif, setState: setEmailNotif },
            { label: "Push Notifications", desc: "Get alerts on your device", state: pushNotif, setState: setPushNotif },
            { label: "SMS Notifications", desc: "Get updates via SMS", state: smsNotif, setState: setSmsNotif },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => item.setState(!item.state)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  item.state ? "bg-[#5DA05D]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                    item.state ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
