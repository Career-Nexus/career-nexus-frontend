import React from "react";

function NoPage() {
  const year = new Date().getFullYear();
  return (
    <section className="min-h-screen w-full flex flex-col">
      <section className="container py-2 flex-1 flex flex-col">
        <img src="images/c-n3.png" alt="Career-Nexus logo" className="w-36 h-auto" />
        <div className="flex flex-col justify-center items-center text-center flex-1">
          <header className="text-5xl font-bold">Error 404: No content found</header>
        </div>
      </section>
      <footer className="text-center py-5">
        <p>ALL RIGHT RESERVED &copy; {year}</p>
      </footer>
    </section>
  );
}

export default NoPage;
