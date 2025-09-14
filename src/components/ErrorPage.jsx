import React from 'react'

const ErrorPage = () => {
  const year = new Date().getFullYear();
  return (
    <section className="min-h-screen w-full flex flex-col">
      <section className="container py-2 flex-1 flex flex-col justify-center items-center">
        {/* <img src="/images/c-n3.png" alt="Career-Nexus logo" className="w-36 h-auto" /> */}
        <div className="flex flex-col justify-center items-center text-center flex-1">
          {/* <header className="text-5xl font-bold">Error 404: No content found</header> */}
          <img src="/images/error-page.png" alt="Error 404" className='w-full h-80' />
        </div>
        <div className='text-center mb-10 px-5'>
          <h1 className='text-xl font-bold'>This path leads nowhere.</h1>
          <p>But don't worry, your career journey continues. Head back to the homepage.</p>
        </div>
        <footer className="text-center py-5">
          <p>ALL RIGHT RESERVED &copy; {year}</p>
        </footer>
      </section>

    </section>
  );
}

export default ErrorPage