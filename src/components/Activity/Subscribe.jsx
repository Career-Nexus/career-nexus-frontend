import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { ActivityService } from '../../api/ActivityServices';
import { useNavigate } from 'react-router-dom';

// function Subscribe() {
//     const navigate = useNavigate();
//     const handleSubscribe = async () => {
//         const response = await ActivityService.subscribeNewsletter();
//         if (response.success) {
//             toast.success("Subscription successful!");
//             navigate("/newsletter");
//         } else {
//             toast.error("Subscription failed.");
//         }
//     };

//     return (
//         <div>
//             <h1 className='font-bold text-2xl'>Newsletters</h1>
//             <div className='flex flex-col items-center gap-4 my-5'>
//                 <img src="images/newsletter.png" alt="newsletter" className='h-56 w-72 object-cover' />
//                 <h5 className='font-semibold text-lg'>Your newsletter journey starts here</h5>
//                 <p className='text-center text-wrap'>
//                     Subscribe to receive weekly career insights, industry trends, <br />and expert advice delivered straight to your inbox.
//                 </p>
//             </div>
//             <div className='flex flex-col items-center gap-4'>
//                 <button onClick={handleSubscribe} className='bg-[#5DA05D] text-white font-semibold rounded-lg py-2 px-4'>Subscribe Now</button>
//             </div>
//         </div>
//     )
// }
function Subscribe({ onSubscribeSuccess }) {
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      const response = await ActivityService.subscribeNewsletter();
      if (response.success) {
        toast.success("Subscription successful!");
        
        if (onSubscribeSuccess) {
          // ✅ Notify parent to refresh subscription status
          onSubscribeSuccess();
        } else {
          // fallback (if no callback is passed)
          navigate("/newsletter");
        }
      } else {
        toast.error("Subscription failed.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1 className='font-bold text-2xl'>Newsletters</h1>
      <div className='flex flex-col items-center gap-4 my-5'>
        <img
          src="images/newsletter.png"
          alt="newsletter"
          className='h-56 w-72 object-cover'
        />
        <h5 className='font-semibold text-lg'>Your newsletter journey starts here</h5>
        <p className='text-center text-wrap'>
          Subscribe to receive weekly career insights, industry trends, <br />
          and expert advice delivered straight to your inbox.
        </p>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <button
          onClick={handleSubscribe}
          className='bg-[#5DA05D] text-white font-semibold rounded-lg py-2 px-4'
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
}

export default Subscribe