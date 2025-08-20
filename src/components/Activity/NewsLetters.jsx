import { ArrowRight, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ActivityService } from '../../api/ActivityServices';
import Subscribe from "../../components/Activity/Subscribe"
function NewsletterPage() {
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterData, setNewsletterData] = useState(null);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await ActivityService.getNewsletter();
      console.log("Newsletter API Response:", response);

      if (response.success && response.data) {
        const { recent, archive } = response.data;

        if (
          (recent && Object.keys(recent).length > 0) ||
          (archive && archive.count > 0)
        ) {
          setSubscribed(true);
          setNewsletterData(response.data);
        } else {
          setSubscribed(false);
        }
      } else {
        setSubscribed(false);
      }
    } catch (error) {
      console.error("Newsletter API Error:", error);
      setSubscribed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return subscribed ? (
    <NewsLetters data={newsletterData} />
  ) : (
    <Subscribe />
  );
}
export default NewsletterPage;
// ------------------ NewsLetters Component ------------------

function NewsLetters({ data }) {
  const { recent, archive } = data;

  const [openModal, setOpenModal] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  const handleReadMore = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedNewsletter(null);
  };
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">Newsletters</h1>

      {/* Recent newsletter */}
      {recent && (
        <div className="flex gap-3 shadow p-2 rounded-lg mb-6">
          <div className="flex flex-col gap-2 w-full h-52">
            <div className="flex items-center gap-3">
              <img
                src={recent.image || "images/sportlight.png"}
                alt="spotlight"
              // className="w-12 h-12 object-cover rounded"
              />
              <p className="bg-[#D9FFDB80] text-[#5DA05D] p-2 rounded">
                {new Date(recent.timestamp).toDateString()}
              </p>
            </div>
            <h2 className="font-bold text-lg">{recent.title}</h2>
            <p className="line-clamp-3">{recent.content}</p>
            <button
                onClick={() => handleReadMore(recent)}
                className="text-[#5DA05D] flex items-center gap-3 mt-2"
              >
                Read More <ArrowRight size={16} />
              </button>
          </div>
          <div className="flex flex-col gap-2 w-full h-52">
            <img
              src={recent.image || "images/profile4.png"}
              alt="News letter"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Archive */}
      <h2 className="font-semibold text-lg my-5">Newsletter Archives</h2>
      <div className="grid gap-4">
        {archive?.results?.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 shadow p-2 rounded-lg h-48"
          >
            <div className="flex flex-col gap-2 w-1/3">
              <img
                src={item.image || "images/profile4.png"}
                alt="Newsletter"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-2/3">
              <p className="bg-[#D9FFDB80] text-[#5DA05D] p-2 rounded">
                {new Date(item.timestamp).toDateString()}
              </p>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p className="line-clamp-3">{item.content}</p>
              <button
                onClick={() => handleReadMore(item)}
                className="text-[#5DA05D] flex items-center gap-3 mt-2"
              >
                Read More <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {openModal && selectedNewsletter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg relative max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto max-h-[85vh]">
              {selectedNewsletter.image && (
                <img
                  src={selectedNewsletter.image}
                  alt="Newsletter"
                  className="w-full h-56 object-cover rounded mb-4"
                />
              )}

              <p className="text-sm text-gray-500 mb-2">
                {new Date(selectedNewsletter.timestamp).toDateString()}
              </p>
              <h2 className="font-bold text-2xl mb-3">
                {selectedNewsletter.title}
              </h2>
              <p className="whitespace-pre-line leading-relaxed">
                {selectedNewsletter.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
