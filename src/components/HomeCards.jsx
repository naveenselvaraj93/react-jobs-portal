import React from "react";
import Card from "./Cards";

const Homecards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card
            title="For Developers"
            subtitle="Browse our React jobs and start your career today"
            button="Browse Jobs"
          />

          <Card
            title="For Employers"
            subtitle="List your job to find the perfect developer for the role"
            button="Add a Job"
          />
        </div>
      </div>
    </section>
  );
};

export default Homecards;
