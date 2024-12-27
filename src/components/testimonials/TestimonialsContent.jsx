import React from "react";
import { Link } from "react-router-dom";

// Inline CSS for hiding the scrollbar
const styles = `
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`;

const TestimonialsContent = () => {
  const galleryItems = [
    {
      id: 1,
      imageSrc: "/testiimage1.png",
      title: "Patient",
      path: "/testimonials/patient",
    },
    {
      id: 2,
      imageSrc: "/testiimage2.png",
      title: "Video",
      path: "/testimonials/video",
    },
    // Removed "Review" item
  ];

  return (
    <div className="h-[70vh] overflow-y-auto p-4 hide-scrollbar"> {/* Set a fixed height */}
      {/* Injecting CSS into the document */}
      <style>{styles}</style>

      <div className="flex flex-wrap justify-center gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 -mt-4 lg:-mt-4 lg:-ml-3 sm:mt-4">
        {galleryItems.map((item) => (
          <Link
            to={item?.path}
            key={item.id}
            className="relative w-full max-w-md md:max-w-lg"
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              className="w-full h-auto rounded-3xl border pb-10 bg-white object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 text-left pl-6 flex flex-col justify-end p-2">
              <h3 className="text-md text-[#424242] pl-3 pt-1">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsContent;
