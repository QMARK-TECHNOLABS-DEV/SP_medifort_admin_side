// import React from "react";
// import TopPart from "../../components/doctors/TopPart";
// import DoctorFilter from "../../components/doctors/DoctorFilter";
// import DoctorsPhotos from "../../components/doctors/DoctorsPhotos";

// const DoctorsPage = () => {
//   return (
//     <div className="pb-20">
//       <header>
//         <TopPart title={"Doctor profile"} type={{ name: "search" }} />
//       </header>
//       <section>
//         <DoctorFilter />
//       </section>
//       <section className="mb-10">
//         <DoctorsPhotos />
//       </section>
//     </div>
//   );
// };

// export default DoctorsPage;


import React, { useState } from "react";
import TopPart from "../../components/doctors/TopPart";
import DoctorFilter from "../../components/doctors/DoctorFilter";
import DoctorsPhotos from "../../components/doctors/DoctorsPhotos";

const DoctorHomePage = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MS (Gen. Surgery), FMAS",
      name: "Dr.Cherian M Thomas",
      description: "Orthopaedic",
    },
    // Add more initial doctor cards here if needed
  ]);

  const addNewDoctor = () => {
    const newDoctor = {
      id: doctors.length + 1,
      imageSrc: "/doctorEditimage.png",
      title: "MBBS, MD (General Medicine)",
      name: `Dr. New Doctor`,
      description: "Cardiology",
    };
    setDoctors([...doctors, newDoctor]);
  };

  return (
    <div>
      <header>
         <TopPart title={"Doctor profile"} type={{ name: "search" }} />
      </header>
      <DoctorFilter onAddDoctor={addNewDoctor} />
      <DoctorsPhotos doctors={doctors} />
    </div>
  );
};

export default DoctorHomePage;

