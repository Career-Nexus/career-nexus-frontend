import React, { useState } from 'react';

const CreateAccountForm = () => {
  const [employer, setEmployer] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('mentor'); // Default role

  const handleSignup = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ employer, fullName, emailAddress, password, confirmPassword, role });
    alert('Account created successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="role" className="sr-only">Select your role</label>
              <select
                id="role"
                name="role"
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="mentor">Mentor</option>
                <option value="employer">Employer</option>
                <option value="learner">Learner</option>
              </select>
            </div>
            <div>
              <label htmlFor="employer" className="sr-only">Employer</label>
              <input
                id="employer"
                name="employer"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Employer"
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email Address</label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center space-x-4">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <img src="https://www.linkedin.com/favicon.ico" alt="LinkedIn" className="h-5 w-5 mr-2" />
            Sign up with LinkedIn
          </button>
        </div>

        <div className="text-center">
          <a href="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
            Already have an account? Log in
          </a>
        </div>
      </div>
      {/* <form className="bg-white px-16 space-y-4">
                        <h1 className='font-bold text-center mt-5'>Create Account</h1>
                        <div className="max-w-md">
                            <Select id="countries" required className='border border-green-300 rounded-lg'>
                                <option>Select your type</option>
                                <option>Learner</option>
                                <option>Employer</option>
                                <option>Mentor</option>
                            </Select>
                        </div>
                        <div className="max-w-md">
                            <TextInput id="email4" type="text" icon={User} placeholder=" Full Name" required />
                        </div>
                        <div className="max-w-md">
                            <TextInput id="email4" type="email" icon={Email} placeholder=" Email Address" required />
                        </div>
                        <div className='flex gap-3'>
                            <div className="max-w-md">
                                <TextInput id="email4" type="password" icon={Password} placeholder=" Password" required />
                            </div>
                            <div className="max-w-md">
                                <TextInput id="email4" type="password" icon={Password} placeholder=" Confirm Password" required />
                            </div>
                        </div>

                        <button type="submit" color="gray" className='bg-[#5DA05D] w-full py-2 rounded-lg text-white'>Sign up</button>
                        <p className='text-gray-500 font-thin text-center'>Or continue with</p>

                        <button type="submit"
                            class="w-full flex items-center border justify-center py-2 gap-1 rounded-lg transition">
                            <Google />
                            Google
                        </button>
                        <button type="submit"
                            class="w-full flex items-center border justify-center py-2 gap-1 rounded-lg transition">
                            <Linkedin />
                            Linkedin
                        </button>
                        <p>Aleady have an account? <Link to={'/login'} className='text-[#5DA05D]'>Login</Link></p>
                        
                     </form> */}
    </div>
  );
};

export default CreateAccountForm;