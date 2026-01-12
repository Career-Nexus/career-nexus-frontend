
// Career Path Section
import { AI, BC, GN, VR } from "../icons";

export const Solution = () => {
  const items = [
    {
      id: 1,
      icon: <img src={AI} alt="AI Icon" className="w-10 h-10 md:w-8 md:h-8" />,
      title: "AI-Driven Career Advancement",
      desc: "Learn from industry professionals ",
    },
    {
      id: 2,
      icon: <img src={BC} alt="Blockchain Icon" className="w-10 h-10 md:w-8 md:h-8" />,
      title: "Blockchain-Verified Certifications",
      desc: "Gain clarity through mentorship and conversations.",
    },
    {
      id: 3,
      icon: <img src={VR} alt="VR Icon" className="w-10 h-10 md:w-8 md:h-8" />,
      title: "Immersive VR Job Simulations",
      desc: "Access global perspectives on careers and opportunities",
    },
    {
      id: 4,
      icon: <img src={GN} alt="Global Networking Icon" className="w-10 h-10 md:w-8 md:h-8" />,
      title: "Global Networking & Upskilling",
      desc: "Build confidence to navigate career transitions.",
    },
  ];

  return (
    <section className="md:px-4 mx-6 md:mx-16 mt-[5rem]" id="about">
      <h2 className="md:text-lg text-center">THE SOLUTION</h2>
      <h1 className="font-bold text-2xl md:text-4xl text-center">Career guidance that meets the real world</h1>
      <div className="bg-[#C3F9C3] pt-5 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="px-2 sm:px-3 mb-4">
              <div className="bg-white shadow-md rounded-xl p-6 min-h-[200px] flex flex-col items-center text-center transition-all hover:border-2 hover:border-[#5DA05D]">
                <span className="border border-[#5DA05D] p-4 rounded-lg shadow-lg mb-3">
                  {item.icon}
                </span>
                {/* <h2 className="text-lg md:text-xl font-semibold mt-4">{item.title}</h2> */}
                <p className="mt-2 text-xl font-bold w-[85%]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
       <p className="text-xl md:text-2xl text-center mt-4">Career-Nexus connects ambition with experience. </p>
    </section>
  );
};
