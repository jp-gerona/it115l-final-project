import React from "react";
import MembersTable from "./table/MembersTable";

const Members = () => {
  return (
    <div className="overflow-hidden max-h-[65vh] sm:max-h-[70vh] md:max-h-[80vh] lg:max-h-[90vh] sm:overflow-auto">
      <MembersTable />
    </div>
  );
};

export default Members;
