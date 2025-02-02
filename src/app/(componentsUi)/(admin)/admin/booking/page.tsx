"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  FaCheckCircle,
  FaDownload,
  FaTimesCircle,
  FaCheck,
  FaTimes,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import moment from "moment-timezone";
import { fetchBookingDetails, updateBookingDetails } from "./action";
import { jwtDecode } from "jwt-decode";

const ManagePujaBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  // No longer using rejectionReason on parent level
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);

  // Fetching user id from local storage and decode token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(Number(userId));
    }
  }, []);

  // Helper function to fetch bookings and update state
  const refreshBookings = async () => {
    try {
      const data = await fetchBookingDetails(userId);
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.error("Expected an array of bookings, but got:", data);
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and refresh when userId changes
  useEffect(() => {
    if (userId) {
      refreshBookings();
    }
  }, [userId]);

  // Filter bookings by search term and status
  const filteredBookings = bookings.filter((booking) => {
    return (
      (booking.user?.username &&
        booking.user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.cart?.pujaService?.title &&
        booking.cart.pujaService.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.selected_date && booking.selected_date.includes(searchTerm)) ||
      (booking.selected_time && booking.selected_time.includes(searchTerm)) ||
      (booking.payments?.[0]?.amount &&
        booking.payments?.[0]?.amount.toString().includes(searchTerm)) ||
      (booking.status &&
        booking.status.toUpperCase().includes(searchTerm.toUpperCase()))
    );
  });

  // Paginate bookings
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredBookings.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredBookings, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);

  // Handle CSV export
  const handleExportCSV = () => {
    const headers = [
      "#ID",
      "Username",
      "Puja Name",
      "Date | Time",
      "Amount",
      "Status",
    ];
    const csvData = filteredBookings.map((booking) => [
      booking.id,
      booking.user?.username || "N/A",
      booking.cart?.pujaService?.title || "N/A",
      `${moment(booking.selected_date)
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD")} | ${booking.selected_time}`,
      `₹ ${booking.payments?.[0]?.amount / 100 || 0}`,
      booking.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "puja_bookings.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle Accept Booking
  const handleAccept = async (updatedData: any) => {
    try {
      await updateBookingDetails(selectedBooking.id, {
        ...selectedBooking,
        status: "CONFIRM",
        ...updatedData,
      });
      // Refresh data to update UI immediately
      await refreshBookings();
      setShowAcceptModal(false);
    } catch (error) {
      console.error("Failed to accept booking:", error);
    }
  };

  // Handle Reject Booking, accepting a reason parameter
  const handleReject = async (reason: string) => {
    try {
      await updateBookingDetails(selectedBooking.id, {
        ...selectedBooking,
        status: "REJECT",
        rejectionReason: reason,
      });
      await refreshBookings();
      setShowRejectModal(false);
    } catch (error) {
      console.error("Failed to reject booking:", error);
    }
  };

  // Handle Mark Done – using the booking from state rather than selectedBooking
  const handleMarkDone = async (bookingId: number) => {
    const bookingToUpdate = bookings.find((b) => b.id === bookingId);
    if (!bookingToUpdate) return;
    try {
      await updateBookingDetails(bookingId, { ...bookingToUpdate, status: "DONE" });
      await refreshBookings();
    } catch (error) {
      console.error("Failed to mark booking as done:", error);
    }
  };

  // -------------------------
  // Modal Components
  // -------------------------

  // View Modal Component
  const ViewModal = ({ booking, onClose }: any) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">#ID</label>
            <p>{booking.id}</p>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Customer Name</label>
            <p>{booking.user?.username || "N/A"}</p>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Puja Name</label>
            <p>{booking.cart?.pujaService?.title || "N/A"}</p>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Date & Time</label>
            <p>
              {moment(booking.selected_date)
                .tz("Asia/Kolkata")
                .format("YYYY-MM-DD")}{" "}
              | {booking.selected_time}
            </p>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Amount</label>
            <p>₹ {booking.payments?.[0]?.amount / 100 || 0}</p>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Status</label>
            <p>{booking.status}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Accept Modal Component
  const AcceptModal = ({ booking, onClose }: any) => {
    const [formData, setFormData] = useState({
      selected_date: booking.selected_date,
      selected_time: booking.selected_time,
      status: "CONFIRM",
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">Confirm Booking</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">New Date</label>
              <input
                type="date"
                value={moment(formData.selected_date).format("YYYY-MM-DD")}
                onChange={(e) =>
                  setFormData({ ...formData, selected_date: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">New Time</label>
              <input
                type="time"
                value={formData.selected_time}
                onChange={(e) =>
                  setFormData({ ...formData, selected_time: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAccept(formData)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Confirm Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Reject Modal Component – using local state for rejection reason
  const RejectModal = ({ booking, onClose }: any) => {
    const [localRejectionReason, setLocalRejectionReason] = useState("");
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">Reject Booking</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Reason for Rejection</label>
              <textarea
                value={localRejectionReason}
                onChange={(e) => setLocalRejectionReason(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 h-32"
                placeholder="Enter rejection reason..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => handleReject(localRejectionReason)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Initiate Refund & Reject
            </button>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Puja Bookings
      </h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Booking ID or Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex items-center gap-4 bg-white pl-2 pr-2">
          <span className="text-gray-600">Filter by Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">ALL</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRM">CONFIRM</option>
            <option value="REJECTED">REJECTED</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Bookings Table */}
      {loading ? (
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No bookings found</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puja Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedBookings.map((booking, index) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {booking.user?.username || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {booking.cart?.pujaService?.title || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {moment(booking.selected_date)
                      .tz("Asia/Kolkata")
                      .format("YYYY-MM-DD")}{" "}
                    | {booking.selected_time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    ₹ {booking.payments?.[0]?.amount / 100 || 0}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "CONFIRM"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status === "DONE"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-4">
                      {booking.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowAcceptModal(true);
                            }}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Accept Booking"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowRejectModal(true);
                            }}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Reject Booking"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      {booking.status === "CONFIRM" && (
                        <button
                          onClick={() => handleMarkDone(booking.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Mark as Done"
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          >
            {[5, 10, 25, 50].map((value) => (
              <option key={value} value={value}>
                {value} rows
              </option>
            ))}
          </select>
          <span className="text-gray-500">
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredBookings.length)} of{" "}
            {filteredBookings.length} entries
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Modals */}
      {showViewModal && selectedBooking && (
        <ViewModal booking={selectedBooking} onClose={() => setShowViewModal(false)} />
      )}
      {showAcceptModal && selectedBooking && (
        <AcceptModal booking={selectedBooking} onClose={() => setShowAcceptModal(false)} />
      )}
      {showRejectModal && selectedBooking && (
        <RejectModal booking={selectedBooking} onClose={() => setShowRejectModal(false)} />
      )}
    </div>
  );
};

export default ManagePujaBookings;
