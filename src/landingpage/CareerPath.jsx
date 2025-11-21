// // Career Path Section
// import { AI, BC, GN, VR } from '../icons'
// import Slider from "react-slick";
// export const CareerPath = () => {
//     const items = [
//         {
//             id: 1,
//             icon: <img src={AI} alt="AI Icon" className='w-8 h-8' />,
//             title: "AI-Driven Career Advancement",
//             desc: "Personalized recommendations based on industry demand and tailored to your career goals."
//         },
//         {
//             id: 2,
//             icon: <img src={BC} alt="AI Icon" className='w-8 h-8' />,
//             title: "Blockchain-Verified Certifications",
//             desc: "Secure, verifiable credentials trusted by employers."
//         },
//         {
//             id: 3,
//             icon: <img src={VR} alt="AI Icon" className='w-8 h-8' />,
//             title: "Immersive VR Job Simulations",
//             desc: "Gain real-world experience in a risk-free environment."
//         },
//         {
//             id: 4,
//             icon: <img src={GN} alt="AI Icon" className='w-8 h-8' />,
//             title: "Global Networking & Upskilling",
//             desc: "Connect with industry leaders and peers worldwide."
//         },
//     ]
//     var settings = {
//         dots: true,
//         infinite: true,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         pauseOnHover: true,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: true
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     initialSlide: 2
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }
//             }
//         ]
//     };
//     return (
//         <div className="slider-container md:mx-20 md:px-4 my-6" id='about'> {/* Added px-4 */}
//             <h1 className='text-3xl font-bold mb-8 text-center'>Career-Nexus: Your Path to Success</h1>
//             <Slider {...settings}>
//                 {items.map((item) => (
//                     <div key={item.id} className="px-3"> {/* Added px-3 for gap */}
//                         <div className="bg-white shadow-md mb-4 rounded-xl p-6 h-64 hover:border-2 hover:border-[#5DA05D]">
//                             <div className="flex flex-col items-center text-center">
//                                 <span className="border border-[#5DA05D] p-1 rounded-lg shadow-md">{item.icon}</span>
//                                 <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
//                                 <p className="text-gray-600 mt-2">{item.desc}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </Slider>
//         </div>

//     )
// }


// Career Path Section
import { AI, BC, GN, VR } from "../icons";
import Slider from "react-slick";

export const CareerPath = () => {
  const items = [
    {
      id: 1,
      icon: <img src={AI} alt="AI Icon" className="w-10 h-10 md:w-8 md:h-8" />,
      title: "AI-Driven Career Advancement",
      desc: "Personalized recommendations based on industry demand and tailored to your career goals.",
    },
    {
      id: 2,
      icon: <img src={BC} alt="Blockchain Icon" className="w-10 h-10 md:w-8 md:h-8" />,
      title: "Blockchain-Verified Certifications",
      desc: "Secure, verifiable credentials trusted by employers.",
    },
    {
      id: 3,
      icon: <img src={VR} alt="VR Icon" className="w-10 h-10 md:w-8 md:h-8" />,
      title: "Immersive VR Job Simulations",
      desc: "Gain real-world experience in a risk-free environment.",
    },
    {
      id: 4,
      icon: <img src={GN} alt="Global Networking Icon" className="w-10 h-10 md:w-8 md:h-8" />,
      title: "Global Networking & Upskilling",
      desc: "Connect with industry leaders and peers worldwide.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280, // Large tablet/laptop
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768, // Tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // Phones
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="slider-container px-4 md:px-6 lg:mx-20 my-10" id="about">
      <h1 className="text-2xl md:text-3xl font-bold mb-10 text-center">
        Career-Nexus: Your Path to Success
      </h1>

      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="px-2 sm:px-3">
            <div className="bg-white shadow-md rounded-xl p-6 min-h-[230px] flex flex-col items-center text-center transition-all hover:border-2 hover:border-[#5DA05D]">
              <span className="border border-[#5DA05D] p-2 rounded-lg shadow-sm">
                {item.icon}
              </span>
              <h2 className="text-lg md:text-xl font-semibold mt-4">{item.title}</h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">{item.desc}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};
