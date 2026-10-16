// src/pages/ticketsPage.jsx
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaTicketAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import TicketCard from "../components/ticketCard";
import Scrolltotop from "../components/scrolltotop";
import { authContext } from "../context/authContext";
import { cartContext } from "../context/cartContext";

const FILTERS = [
  { id: "ACTIVE", label: "Active" },
  { id: "USED", label: "Used" },
  { id: "EXPIRED", label: "Expired" },
];

const TicketsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading, api } = useContext(authContext);
  const { refreshTicketCount } = useContext(cartContext);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ACTIVE");

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/transactions/tickets/", {
          params: { status: filter },
        });
        if (cancelled) return;
        if (res.data?.success) {
          setTickets(res.data.tickets || []);
        } else {
          setError(res.data?.error || "Failed to load tickets");
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.error || "Network error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [api, isAuthenticated, authLoading, filter]);

  useEffect(() => {
    if (isAuthenticated) refreshTicketCount();
  }, [isAuthenticated, refreshTicketCount]);

  return (
    <main className="bg-neutral-200 min-h-screen dark:bg-neutral-900 dark:text-white pb-30">
      <Scrolltotop />

      <div className="bg-white dark:bg-neutral-800 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <FaArrowLeft className="text-xl" />
          </button>
          <p className="text-lg font-bold">My Tickets</p>
          <span className="w-5" />
        </div>

        <div className="flex gap-2 px-4 pb-3">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f.id
                  ? "bg-gradient-to-r from-orange-600 to-orange-400 text-white"
                  : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {!isAuthenticated && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <FaTicketAlt className="text-6xl text-neutral-400" />
            <p className="font-bold">Sign in to see your tickets</p>
            <Link
              to="/login"
              className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-2 rounded-full"
            >
              Sign in
            </Link>
          </div>
        )}

        {isAuthenticated && loading && (
          <p className="text-center text-neutral-500 py-10">Loading tickets…</p>
        )}

        {isAuthenticated && !loading && error && (
          <p className="text-center text-red-500 py-10">{error}</p>
        )}

        {isAuthenticated && !loading && !error && tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <FaTicketAlt className="text-6xl text-neutral-400" />
            <p className="font-bold">
              {filter === "ACTIVE"
                ? "No active tickets yet"
                : filter === "USED"
                ? "No used tickets"
                : "No expired tickets"}
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-2 rounded-full"
            >
              Browse events
            </Link>
          </div>
        )}

        {isAuthenticated && !loading && tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </main>
  );
};

export default TicketsPage;