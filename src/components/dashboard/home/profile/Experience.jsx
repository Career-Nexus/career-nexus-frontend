import { MapPin, Building, Calendar, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Company1, Company2, Edit, Like } from "../../../../icons/icon";
import ReusableModal from "./ModalDesign";
import { CertificationModal, EducationModal, ExperienceModal } from "./AllModal";
import { UserContext } from "../../../../context/UserContext";
import { ExperienceService } from "../../../../api/ExperienceService";
import Cookies from 'js-cookie';

export default function ExperienceSection() {
//   const { user } = useContext(UserContext);
  const [expandedItems, setExpandedItems] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openModaledu, setOpenModaledu] = useState(false);
  const [openModalcert, setOpenModalcert] = useState(false);

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await ExperienceService.getExperiences();
        setExperiences(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.message === 'No authorization token found' || err.response?.status === 401) {
          Cookies.remove('authToken');
          window.location.href = '/login';
          setError('Please log in to view experiences.');
        } else {
          setError(err.message || 'Failed to load experiences.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const Experience = ({ status1, logo, title, company, duration, address, desc, id }) => {
    return (
      <div className="border rounded-lg mb-4 p-4 relative">
        <div className="absolute right-4 top-4">
          <button
            size="icon"
            className="h-8 w-8 border border-[#5DA05D] rounded-lg flex items-center justify-center"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              {logo}
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h3 className="font-semibold text-base">{title}</h3>
              <div className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs border-2 border-dashed">
                <span className="text-xs">
                  <Like />
                </span>
                <span className="text-xs">{status1}</span>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Building className="h-4 w-4 mr-1 text-[#5DA05D]" />
              <span>{company}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Calendar className="h-4 w-4 mr-1 text-[#5DA05D]" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1 text-[#5DA05D]" />
              <span>{address}</span>
            </div>

            <button
              onClick={() => toggleExpand(id)}
              className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
            >
              {expandedItems[id] ? (
                <>
                  <span className="text-[#5DA05D]">Hide</span>
                  <ChevronUp className="h-3 w-3 ml-0.5" />
                </>
              ) : (
                <>
                  <span className="text-[#5DA05D]">More</span>
                  <ChevronDown className="h-3 w-3 ml-0.5" />
                </>
              )}
            </button>

            {expandedItems[id] && (
              <div className="mt-2">
                <ul className="list-disc ml-5 text-sm">
                  <li>{desc}</li>
                  <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
                  <li>Implemented responsive design principles to ensure optimal user experience.</li>
                  <li>Participated in code reviews and provided constructive feedback.</li>
                  <li>Utilized agile methodologies to manage workflows efficiently.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const status = true;
  const status2 = status ? "RECOMMENDED" : "REQUEST RECOMMENDATION";
  const status3 = status ? "REQUEST RECOMMENDATION" : "RECOMMENDED";

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

  return (
    <div className="w-full max-w-3xl mx-auto mt-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Experience</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#5DA05D] hover:bg-green-600 text-white rounded-lg px-2 py-1 flex items-center"
        >
          <Plus className="h-3 w-3 mr-1" />
          <span className="text-xs">Add Experience</span>
        </button>
        <ExperienceModal
          ModalComponent={ReusableModal}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>

      <div>
        {experiences.map((item, index) => (
          <Experience
            key={item.id || index}
            id={item.id || `experience-${index}`}
            logo={<Company1 />}
            title={item.title || 'Unknown Title'}
            status1={status2}
            company={item.organization || 'Unknown Company'}
            duration={`${item.start_date || 'Unknown'} - ${item.end_date || 'Present'}`}
            address={item.location || 'Unknown Location'}
            employmentType={item.employment_type || 'Unknown Employment Type'}
            desc={item.detail || 'No description provided.'}
          />
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Education</h2>
          <button
            onClick={() => setOpenModaledu(true)}
            className="bg-[#5DA05D] hover:bg-green-600 text-white rounded-lg px-2 py-1 flex items-center"
          >
            <Plus className="h-3 w-3 mr-1" />
            <span className="text-xs">Add Education</span>
            <EducationModal
              ModalComponent={ReusableModal}
              isOpen={openModaledu}
              onClose={() => setOpenModaledu(false)}
            />
          </button>
        </div>
        <Experience
          id="education"
          logo={<Company2 />}
          title="Computer Science"
          status1={status3}
          company="Apple"
          duration="Aug 2018 - Dec 2019"
          address="Dallas, Texas, United States - On-site"
          desc="Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Licenses & Certifications</h2>
          <button
            onClick={() => setOpenModalcert(true)}
            className="bg-[#5DA05D] hover:bg-green-600 text-white rounded-lg px-2 py-1 flex items-center"
          >
            <Plus className="h-3 w-3 mr-1" />
            <span className="text-xs">Add Certifications</span>
            <CertificationModal
              ModalComponent={ReusableModal}
              isOpen={openModalcert}
              onClose={() => setOpenModalcert(false)}
            />
          </button>
        </div>
        <Experience
          id="cert1"
          logo={<Company2 />}
          title="Beginner Python"
          status1={status2}
          company="Apple"
          duration="Aug 2018 - Dec 2019"
          address="Dallas, Texas, United States - On-site"
          desc="Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."
        />
        <Experience
          id="cert2"
          logo={<Company2 />}
          title="Python Intermediate"
          status1={status3}
          company="Apple"
          duration="Aug 2018 - Dec 2019"
          address="Dallas, Texas, United States - On-site"
          desc="Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."
        />
      </div>
    </div>
  );
}
