import { useState } from 'react';
import {
    format,
    startOfMonth,
    startOfWeek,
    addDays,
    addMonths,
    subMonths,
    isSameMonth,
    isSameDay,
} from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const eventTypes = {
    '2025-04-09': ['appointment', 'surgery'],
    '2025-04-14': ['appointment'],
    '2025-04-17': ['polyclinic'],
    '2025-03-22': ['appointment', 'surgery', 'polyclinic'],
};

const getEventColor = (type) => {
    switch (type) {
        case 'appointment':
            return 'bg-blue-500';
        case 'surgery':
            return 'bg-yellow-400';
        case 'polyclinic':
            return 'bg-purple-500';
        default:
            return '';
    }
};

const CalendarWidget = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const monthStart = startOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });

    const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const renderCells = () => {
        const rows = [];
        let day = startDate;

        for (let week = 0; week < 6; week++) {
            const days = [];

            for (let i = 0; i < 7; i++) {
                const currentDay = day;
                const formatted = format(currentDay, 'd');
                const iso = format(currentDay, 'yyyy-MM-dd');
                const events = eventTypes[iso] || [];
                const isToday = isSameDay(currentDay, new Date());
                const isSelected = selectedDate && isSameDay(currentDay, selectedDate);

                days.push(
                    <div
                        key={currentDay.toISOString()}
                        className="flex justify-center items-center h-10"
                    >
                        <div
                            onClick={() => setSelectedDate(currentDay)}
                            className={`
                                flex flex-col items-center justify-center h-8 w-8 rounded-md text-[12px] leading-tight cursor-pointer transition
                                ${isSelected ? 'border-2 border-blue-600' : isToday ? 'border border-blue-400' : ''}
                                ${!isSameMonth(currentDay, monthStart) ? 'text-gray-300' : 'text-gray-800'}
                            `}
                        >
                            {formatted}
                            <div className="flex gap-[2px] mt-[2px]">
                                {events.map((e, idx) => (
                                    <span
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full ${getEventColor(e)}`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </div>
                );

                day = addDays(day, 1);
            }

            rows.push(
                <div key={week} className="grid grid-cols-7">
                    {days}
                </div>
            );
        }

        return <div className="mt-1">{rows}</div>;
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-lg">Calendar</h2>
                <div className="flex items-center gap-4">
                    <button onClick={goToPrevMonth} className="text-gray-500 hover:text-black">
                        <FiChevronLeft size={18} />
                    </button>
                    <p className="text-sm text-gray-800 font-medium">
                        {format(currentDate, 'MMMM yyyy')}
                    </p>
                    <button onClick={goToNextMonth} className="text-gray-500 hover:text-black">
                        <FiChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Legend */}
            <div className="flex border-y-[1px] justify-start gap-3 py-2 mb-4 text-[12px] text-gray-700">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Appointment
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span> Surgery
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Polyclinic
                </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 text-[10px] text-center text-gray-500 mb-2 font-semibold">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, idx) => (
                    <div key={idx}>{day}</div>
                ))}
            </div>

            {/* Days grid */}
            {renderCells()}
        </div>
    );
};

export default CalendarWidget;
