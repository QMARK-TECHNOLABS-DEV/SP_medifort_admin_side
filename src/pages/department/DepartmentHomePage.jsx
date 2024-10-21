import React from 'react'
import content9 from '../../assets/contentManagement/depart.png';
import ContentCard from '../../components/contentManagement/ContentCards';
import { useNavigate } from 'react-router-dom';

const DepartmentHomePage = ({url}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('department/add'); // Navigates to the specified URL
    };
    const contentItems = [
        { imageSrc: content9, title: 'Departments', url: "add" },
    ]
    return (
        <div className="h-screen w-full overflow-hidden">
          <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hide">
            <h1 className="text-left text-xl lg:text-3xl text-[#424242] md:font-[350]">Department</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2px"> {/* Added vertical gap */}
              {contentItems.map((item, index) => (
                <div key={index}>
                  <ContentCard imageSrc={item.imageSrc} title={item.title} url={item.url} onClick={handleCardClick}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
    

export default DepartmentHomePage
