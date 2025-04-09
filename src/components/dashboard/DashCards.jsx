import { FaUser, FaCalendarCheck, FaUserMd, FaDollarSign } from 'react-icons/fa';

const cards = [
  { title: 'Total patients', value: '123K', percent: '+23.5%', icon: <FaUser />, color: 'text-green-500' },
  { title: 'Last 30 days patients', value: '2.53K', percent: '+4.5%', icon: <FaCalendarCheck />, color: 'text-green-500' },
  { title: 'Total doctors', value: '88', percent: '-3.5%', icon: <FaUserMd />, color: 'text-red-500' },
  { title: 'Last month cost', value: '$22.5K', percent: '+0.8%', icon: <FaDollarSign />, color: 'text-green-500' },
];

const DashCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white min-h-[150px] p-4 rounded-xl shadow-sm flex flex-col justify-between"
        >
          {/* Icon container */}
          <div className="flex items-center justify-center rounded-lg h-14 w-14 shadow-md bg-white border">
            <div className="text-xl text-primaryColor">{card.icon}</div>
          </div>

          {/* Title and value/percent */}
          <div className="flex flex-col justify-between flex-grow mt-4">
            <p className="text-gray-500 text-sm mb-2">{card.title}</p>
            <div className="flex justify-between items-end mt-auto">
              <h2 className="font-bold text-xl">{card.value}</h2>
              <p className={`text-sm font-medium ${card.color}`}>{card.percent}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashCards;
