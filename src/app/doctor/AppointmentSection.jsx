import React from 'react';

const AppointmentsSection = () => {
    // Sample appointment data
    const appointments = [
        {
            id: 1,
            patientName: 'John Doe',
            time: '10:00 AM',
            date: '2023-10-25',
            status: 'Confirmed',
            avatar: 'https://via.placeholder.com/40',
        },
        {
            id: 2,
            patientName: 'Jane Smith',
            time: '11:30 AM',
            date: '2023-10-25',
            status: 'Pending',
            avatar: 'https://via.placeholder.com/40',
        },
        {
            id: 3,
            patientName: 'Alice Johnson',
            time: '02:00 PM',
            date: '2023-10-25',
            status: 'Cancelled',
            avatar: 'https://via.placeholder.com/40',
        },
        {
            id: 4,
            patientName: 'Michael Brown',
            time: '04:00 PM',
            date: '2023-10-25',
            status: 'Confirmed',
            avatar: 'https://via.placeholder.com/40',
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Patient</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Time</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {appointments.map((appointment) => (
                        <tr
                            key={appointment.id}
                            className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                        >
                            <td className="py-4 px-6 flex items-center">
                                <img
                                    src={appointment.avatar}
                                    alt={appointment.patientName}
                                    className="w-8 h-8 rounded-full mr-3"
                                />
                                <span>{appointment.patientName}</span>
                            </td>
                            <td className="py-4 px-6">{appointment.date}</td>
                            <td className="py-4 px-6">{appointment.time}</td>
                            <td className="py-4 px-6">
                  <span
                      className={`px-3 py-1 rounded-full text-sm ${
                          appointment.status === 'Confirmed'
                              ? 'bg-green-100 text-green-700'
                              : appointment.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {appointment.status}
                  </span>
                            </td>
                            <td className="py-4 px-6">
                                <button className="text-blue-500 hover:text-blue-700 mr-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2 17l1.5 1.5L7 15m0 0l-3.5-3.5L2 7m5 8l3.5 3.5L14 15m0 0l3.5-3.5L22 7m-8 8l-3.5 3.5L7 15"
                                        ></path>
                                    </svg>
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        ></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentsSection;