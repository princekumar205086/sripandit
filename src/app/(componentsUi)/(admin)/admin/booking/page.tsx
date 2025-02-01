// "use client"

// import React, { useState, useContext, createContext } from "react";
// import { FiEye, FiTrash2, FiCheck, FiX, FiSearch, FiCalendar, FiDownload } from "react-icons/fi";
// import { format } from "date-fns";

// const BookingContext = createContext();

// const dummyBookings = [
//   {
//     id: "BK001",
//     serviceType: "Puja",
//     customerName: "Rahul Sharma",
//     requestedDateTime: new Date("2024-02-20T10:00:00"),
//     location: "Mumbai, Maharashtra",
//     languagePreference: "Hindi",
//     availabilityDateTime: new Date("2024-02-21T11:00:00"),
//     status: "pending"
//   },
//   {
//     id: "BK002",
//     serviceType: "Astrology",
//     customerName: "Priya Patel",
//     requestedDateTime: new Date("2024-02-21T14:00:00"),
//     location: "Delhi, NCR",
//     languagePreference: "English",
//     availabilityDateTime: new Date("2024-02-22T15:00:00"),
//     status: "approved"
//   }
// ];

// const BookingDashboard = () => {
//   const [bookings, setBookings] = useState(dummyBookings);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date");

//   const handleViewDetails = (booking) => {
//     setSelectedBooking(booking);
//     setIsModalOpen(true);
//   };

//   const handleStatusChange = (bookingId, newStatus) => {
//     setBookings(bookings.map(booking =>
//       booking.id === bookingId ? { ...booking, status: newStatus } : booking
//     ));
//   };

//   const statusColors = {
//     pending: "bg-yellow-100 text-yellow-800",
//     approved: "bg-green-100 text-green-800",
//     completed: "bg-blue-100 text-blue-800",
//     canceled: "bg-red-100 text-red-800"
//   };

//   return (
//     <BookingContext.Provider value={{ bookings, setBookings }}>
//       <div className="min-h-screen bg-gray-100">
//         <header className="bg-white shadow-md">
//           <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
//             <div className="flex items-center">
//               <img
//                 src="https://images.unsplash.com/photo-1611162618758-2a29a995354b"
//                 alt="Logo"
//                 className="h-8 w-auto"
//               />
//               <h1 className="ml-4 text-2xl font-bold text-gray-900">Booking Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search bookings..."
//                   className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">Manage Booking Requests</h2>
//                 <div className="flex space-x-4">
//                   <select
//                     className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                   >
//                     <option value="all">All Status</option>
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approved</option>
//                     <option value="completed">Completed</option>
//                     <option value="canceled">Canceled</option>
//                   </select>
//                   <select
//                     className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                   >
//                     <option value="date">Sort by Date</option>
//                     <option value="name">Sort by Name</option>
//                     <option value="status">Sort by Status</option>
//                   </select>
//                   <button
//                     className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                     onClick={() => console.log("Export")}
//                   >
//                     <FiDownload className="mr-2" />
//                     Export
//                   </button>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-gray-50">
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {bookings.map((booking) => (
//                       <tr key={booking.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">{booking.serviceType}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">{booking.customerName}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {format(booking.requestedDateTime, "PPp")}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[booking.status]}`}>
//                             {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => handleViewDetails(booking)}
//                               className="text-blue-600 hover:text-blue-900"
//                             >
//                               <FiEye className="h-5 w-5" />
//                             </button>
//                             <button
//                               onClick={() => handleStatusChange(booking.id, "approved")}
//                               className="text-green-600 hover:text-green-900"
//                             >
//                               <FiCheck className="h-5 w-5" />
//                             </button>
//                             <button
//                               onClick={() => handleStatusChange(booking.id, "canceled")}
//                               className="text-red-600 hover:text-red-900"
//                             >
//                               <FiX className="h-5 w-5" />
//                             </button>
//                             <button className="text-gray-600 hover:text-gray-900">
//                               <FiTrash2 className="h-5 w-5" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </main>

//         {isModalOpen && selectedBooking && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//             <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//               <div className="mt-3">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//                   Booking Details
//                 </h3>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500 mb-2">
//                     <span className="font-medium">Booking ID:</span> {selectedBooking.id}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-2">
//                     <span className="font-medium">Service Type:</span> {selectedBooking.serviceType}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-2">
//                     <span className="font-medium">Customer:</span> {selectedBooking.customerName}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-2">
//                     <span className="font-medium">Location:</span> {selectedBooking.location}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-2">
//                     <span className="font-medium">Language:</span> {selectedBooking.languagePreference}
//                   </p>
//                 </div>
//                 <div className="mt-4">
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </BookingContext.Provider>
//   );
// };

// export default BookingDashboard;

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
