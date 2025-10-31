import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ActivityService } from "../../api/ActivityServices";
import { toast } from "react-toastify";
import FloatingMessageIcon from "../dashboard/chat/FloatingMessage";

// Simple toggle switch component
const Toggle = ({ enabled, setEnabled }) => (
  <button
    onClick={() => setEnabled(!enabled)}
    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${enabled ? "bg-[#5DA05D]" : "bg-gray-300"
      }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${enabled ? "translate-x-5" : ""
        }`}
    />
  </button>
);

export default function Settings() {
  // Connected Accounts
  const [linkedin, setLinkedin] = useState(true);
  const [github, setGithub] = useState(true);
  const [twitter, setTwitter] = useState(false);
  const [google, setGoogle] = useState(true);

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [messageNotif, setMessageNotif] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(true);

  // Privacy
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [showEmail, setShowEmail] = useState(true);
  const [showLocation, setShowLocation] = useState(false);
  const [allowMessaging, setAllowMessaging] = useState(true);
  const [showActivity, setShowActivity] = useState(true);

  // Language & Region
  const [language, setLanguage] = useState("English");
  const [timeZone, setTimeZone] = useState("Pacific Time");

  // Extra notifications
  const [smsNotif, setSmsNotif] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await ActivityService.userSettings();
      if (response.success) {
        const data = response.data;

        // Connected Accounts
        setLinkedin(data.linkedin);
        setGithub(data.github);
        setTwitter(data.twitter);
        setGoogle(data.google);

        // Notifications
        setEmailNotif(data.email_notify);
        setPushNotif(data.push_notify);
        setWeeklyDigest(data.weekly_summary);
        setJobAlerts(data.job_alerts);
        setMessageNotif(data.message_notify);
        setMarketingEmails(data.marketing);

        // Privacy
        setProfileVisibility(data.profile_visibility || "Public");
        setShowEmail(data.show_email);
        setShowLocation(data.show_location);
        setAllowMessaging(data.allow_messaging);
        setShowActivity(data.show_activity);

        // Language & Region
        setLanguage(data.language || "English");
        setTimeZone(data.timezone || "Pacific Time");

        // Extra notifications
        setSmsNotif(data.sms_notify);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    const updatedSettings = {
      // Connected Accounts
      linkedin,
      github,
      twitter,
      google,

      // Notifications
      email_notify: emailNotif,
      push_notify: pushNotif,
      weekly_summary: weeklyDigest,
      job_alerts: jobAlerts,
      message_notify: messageNotif,
      marketing: marketingEmails,
      sms_notify: smsNotif,

      // Privacy
      profile_visibility: profileVisibility,
      show_email: showEmail,
      show_location: showLocation,
      allow_messaging: allowMessaging,
      show_activity: showActivity,

      // Language & Region
      language,
      timezone: timeZone,
    };

    const response = await ActivityService.updateUserSettings(updatedSettings);

    if (response.success) {
      toast.success("Settings updated successfully");
    } else {
      toast.error("Failed to update settings");
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div>
        <div className="md:flex justify-between items-center mb-6" id="profile">
          <h1 className="text-4xl font-bold mb-4">Settings</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#5DA05D] text-white rounded-lg hover:bg-[#4CAF50]"
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Link to={"/profilepage"} className="font-semibold text-xl">
            Personal Information
          </Link>
          <Link to={"/profilepage"}>
            <ArrowRight className="text-[#5DA05D]" />
          </Link>
        </div>
      </div>

      {/* Connected Accounts */}
      <section className="mb-8" id="accounts">
        <h2 className="text-xl font-semibold mb-3">Connected Accounts</h2>
        <div className="space-y-4">
          {/* Linkedin */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <span>LinkedIn</span>
            </div>
            <Toggle enabled={linkedin} setEnabled={setLinkedin} />
          </div>
          {/* Github */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <span>GitHub</span>
            </div>
            <Toggle enabled={github} setEnabled={setGithub} />
          </div>
          {/* Twitter */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <span>Twitter</span>
            </div>
            <Toggle enabled={twitter} setEnabled={setTwitter} />
          </div>
          {/* Google */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <span>Google</span>
            </div>
            <Toggle enabled={google} setEnabled={setGoogle} />
          </div>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="mb-8" id="notifications">
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
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>SMS Notifications</span>
            <Toggle enabled={smsNotif} setEnabled={setSmsNotif} />
          </div>
        </div>
      </section>

      {/* Privacy Settings */}
      <section className="mb-8" id="privacy">
        <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
        <div className="space-y-3">
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

          {[
            { label: "Show Email", state: showEmail, setState: setShowEmail },
            { label: "Show Location", state: showLocation, setState: setShowLocation },
            { label: "Allow Messaging", state: allowMessaging, setState: setAllowMessaging },
            { label: "Show Activity", state: showActivity, setState: setShowActivity }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <p className="font-medium">{item.label}</p>
              <Toggle enabled={item.state} setEnabled={item.setState} />
            </div>
          ))}
        </div>
      </section>

      {/* Language & Region */}
      <section className="mb-8" id="language">
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
          {/* <div className="flex justify-between items-center border p-3 rounded-lg">
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
          </div> */}
        </div>
      </section>
      <div>
        <FloatingMessageIcon />
      </div>
    </div>
  );
}

