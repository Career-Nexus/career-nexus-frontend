// Career Path Section
import { AI, BC, GN, VR } from '../icons'
export const CareerPath = () => {
    const items = [
        {
            id: 1,
            icon: <img src={AI} alt="AI Icon" className='w-8 h-8' />,
            title: "AI-Driven Career Advancement",
            desc: "Personalized recommendations based on industry demand and tailored to your career goals."
        },
        {
            id: 2,
            icon: <img src={BC} alt="AI Icon" className='w-8 h-8' />,
            title: "Blockchain-Verified Certifications",
            desc: "Secure, verifiable credentials trusted by employers."
        },
        {
            id: 3,
            icon: <img src={VR} alt="AI Icon" className='w-8 h-8' />,
            title: "Immersive VR Job Simulations",
            desc: "Gain real-world experience in a risk-free environment."
        },
        {
            id: 4,
            icon: <img src={GN} alt="AI Icon" className='w-8 h-8' />,
            title: "Global Networking & Upskilling",
            desc: "Connect with industry leaders and peers worldwide."
        }
    ]

    return (
        <div className='py-16 bg-gray-50 text-center'>
            <h1 className='text-3xl font-bold mb-8'>Career-Nexus: Your Path to Success</h1>

            <div className='md:flex items-center md:gap-6 md:mx-20 mx-4'>
                {items.map((item) => (
                    <div key={item.id} className='bg-white shadow-md mb-4 rounded-xl p-6 w-[100%] md:w-[40%] max-h-80 h-64 hover:border-2 hover:border-[#5DA05D]'>
                        <div className='flex flex-col items-center'>
                            <span className='border border-[#5DA05D] p-1 rounded-lg shadow-md'>{item.icon}</span>
                            <h2 className='text-xl font-semibold mt-4'>{item.title}</h2>
                            <p className='text-gray-600 mt-2'>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}