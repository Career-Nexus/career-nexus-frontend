import logo from "../../../assets/images/job-uiux.svg";
import logo1 from "../../../assets/images/job-projectmgr.svg";
import logo2 from "../../../assets/images/job-frontend.svg";
import logo3 from "../../../assets/images/job-marketing.svg";
import logo4 from "../../../assets/images/job-data-science.svg";
import logo5 from "../../../assets/images/job-senior-uiux.svg";
import Locate from "../../../assets/icons/map-pin.svg"
import Jobs from "../../../assets/icons/briefcase.svg";
import Building from "../../../assets/icons/building.svg";
import AllJobs from "./AllJobs";
import { OtherJobs } from "./UsersJob";
const jobs = [
  {
    companyLogo: <img src={logo} alt="ui/ux" className="w-10 h-10 " />,
    companyName: "Instagram",
    jobTitle: "Senior UI/UX Designer",
    time: "Posted 3mins ago",
    location: "America",
    workType: "Hybrid",
    schedule: "Part-time",
    salaryRange: "$80k-$120k"
  },
  {
    companyLogo: <img src={logo1} className="w-10 h-10 " />,
    companyName: "StartupXYZ",
    jobTitle: "Project Manager",
    time: "Posted 2mins ago",
    location: "America",
    workType: "Hybrid",
    schedule: "Part-time",
    salaryRange: "$80k-$120k"
  },
  {
    companyLogo: <img src={logo2} className="w-10 h-10 " />,
    companyName: "WebAgency",
    jobTitle: "Frontend Developer",
    time: "Posted 4mins ago",
    location: "America",
    workType: "Hybrid",
    schedule: "Part-time",
    salaryRange: "$80k-$120k"
  },
  {
    companyLogo: <img src={logo3} className="w-10 h-10 " />,
    companyName: "Instagram",
    jobTitle: "Marketing Manager",
    time: "Posted 3mins ago",
    location: "America",
    workType: "Hybrid",
    schedule: "Part-time",
    salaryRange: "$80k-$120k"
  },
  {
    companyLogo: <img src={logo4} className="w-10 h-10 " />,
    companyName: "Instagram",
    jobTitle: "Data Scientist",
    time: "Posted 5mins ago",
    location: "America",
    workType: "Hybrid",
    schedule: "Part-time",
    salaryRange: "$80k-$120k"
  },
  {
    companyLogo: <img src={logo5} className="w-10 h-10 " />,
    companyName: "Instagram",
    jobTitle: "Senior UI/UX Designer",
    time: "Posted 3mins ago",
    location: "America",
    workType: "Hybrid",
    schedule: "Part-time",
    salaryRange: "$80k-$120k"
  }
];
const SavedJobs = () => {
  return (
    <div>
      <OtherJobs/>
    </div>
  )
}
export default SavedJobs

