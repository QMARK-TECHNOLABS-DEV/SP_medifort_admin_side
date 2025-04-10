'use client';
import { useState } from 'react';
import { HiOutlineDotsVertical, HiPlus } from 'react-icons/hi';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';

const mockPatients = [
    { name: 'Courtney Henry', id: '21789057', lastVisit: 'Jan 20, 2020', status: 'Active', nextVisit: 'Jan 24, 2020', department: 'Radiology', doctor: 'Dr. M. Wagner' },
    { name: 'Leslie Alexander', id: '37890606', lastVisit: 'Jan 20, 2020', status: 'Active', nextVisit: 'Feb 1, 2020', department: 'Pediatrics', doctor: 'Dr. R. Green' },
    { name: 'Marvin McKinney', id: '58276066', lastVisit: 'Jan 20, 2020', status: 'New Patient', nextVisit: 'Jan 20, 2020', department: 'Ophthalmology', doctor: 'Dr. F. FY' },
    { name: 'Arlene McCoy', id: '66538135', lastVisit: 'Jan 24, 2020', status: 'Non-active', nextVisit: 'Jan 19, 2020', department: 'Gastroenterology', doctor: 'Dr. M. Wagner' },
    { name: 'Courtney Henry', id: '21789057', lastVisit: 'Jan 20, 2020', status: 'Active', nextVisit: 'Jan 24, 2020', department: 'Radiology', doctor: 'Dr. M. Wagner' },
    { name: 'Leslie Alexander', id: '37890606', lastVisit: 'Jan 20, 2020', status: 'Active', nextVisit: 'Feb 1, 2020', department: 'Pediatrics', doctor: 'Dr. R. Green' },
    { name: 'Marvin McKinney', id: '58276066', lastVisit: 'Jan 20, 2020', status: 'New Patient', nextVisit: 'Jan 20, 2020', department: 'Ophthalmology', doctor: 'Dr. F. FY' },
    { name: 'Arlene McCoy', id: '66538135', lastVisit: 'Jan 24, 2020', status: 'Non-active', nextVisit: 'Jan 19, 2020', department: 'Gastroenterology', doctor: 'Dr. M. Wagner' },
];

const statusStyles = {
    Active: 'bg-green-100 text-green-700',
    'New Patient': 'bg-blue-100 text-blue-700',
    'Non-active': 'bg-red-100 text-red-700',
};

const PatientsTable = () => {
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('Newest to oldest');
    const [filteredStatus, setFilteredStatus] = useState('');
    const [patients, setPatients] = useState(mockPatients);

    const filteredPatients = patients
        .filter(p =>
            (p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.id.includes(search)) &&
            (filteredStatus ? p.status === filteredStatus : true)
        )
        .sort((a, b) =>
            sortOrder === 'Newest to oldest'
                ? new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
                : new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime()
        );

    return (

        <div className="bg-white p-6 rounded-xl shadow-md mt-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Patients</h2>
                <a className="text-sm text-primaryColor font-medium hover:text- cursor-pointer flex items-center gap-1">
                    View all <span className="text-md">→</span>
                </a>
            </div>
            <div className='bg-white p-6 border rounded-xl shadow-md'>
                <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border px-4 py-2 rounded-md text-sm w-64"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="flex gap-2 flex-wrap">
                        <button className="border px-4 py-2 rounded-md text-sm flex items-center gap-1" onClick={() => setFilteredStatus('')}>
                            <FiFilter /> Filters
                        </button>
                        <button className="border px-4 py-2 rounded-md text-sm flex items-center gap-1" onClick={() => setSearch('')}>
                            <FiRefreshCw /> Refresh
                        </button>
                        <div className="relative">
                            <button className="bg-primaryColor text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
                                <HiPlus /> Add patient
                            </button>
                        </div>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border px-2 py-2 rounded-md text-sm"
                        >
                            <option>Newest to oldest</option>
                            <option>Oldest to newest</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs uppercase text-gray-400 bg-gray-50 border-t border-b">
                            <tr>
                                <th className="px-4 py-3"><input type="checkbox" /></th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Identification no.</th>
                                <th className="px-4 py-3">Last visit</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Next visit</th>
                                <th className="px-4 py-3">Recent topic</th>
                                <th className="px-4 py-3">Recent doctor</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((p, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-3"><input type="checkbox" /></td>
                                    <td className="px-4 py-3 font-medium">{p.name}</td>
                                    <td className="px-4 py-3">{p.id}</td>
                                    <td className="px-4 py-3">{p.lastVisit}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[p.status] || 'bg-gray-100 text-gray-700'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{p.nextVisit}</td>
                                    <td className="px-4 py-3">{p.department}</td>
                                    <td className="px-4 py-3">{p.doctor}</td>
                                    <td className="px-4 py-3 text-center">
                                        <HiOutlineDotsVertical className="text-gray-400 hover:text-black cursor-pointer" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredPatients.length === 0 && (
                        <div className="text-center py-4 text-gray-500 text-sm">No results found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientsTable;
