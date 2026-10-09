// src/pages/ticketDetailPage.jsx
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaClock, FaShare } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import { Link, useNavigate, useParams } from "react-router";
import Scrolltotop from "../components/scrolltotop";
import { authContext } from "../context/authContext";

const STATUS_BADGE = {
  ACTIVE: "bg-green-100 text-green-700",
  USED: "bg-neutral-200 text-neutral-600",
  EXPIRED: "bg-red-100 text-red-700",
};

function fmtFull(dateStr) {
  if (!dateStr) return "TBA";
  try {
    return new Date(dateStr).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api, isAuthenticated, loading: authLoading } = useContext(authContext);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [transferOpen, setTransferOpen] = useState(false);
  const [transferEmail, setTransferEmail] = useState("");
  const [transferBusy, setTransferBusy] = useState(false);
  const [transferMsg, setTransferMsg] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/transactions/tickets/${id}/`);
        if (cancelled) return;
        if (res.data?.success) setTicket(res.data.ticket);
        else setError(res.data?.error || "Ticket not found");
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.error || "Network error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [api, id, isAuthenticated, authLoading, navigate]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setTransferBusy(true);
    setTransferMsg("");
    try {
      const res = await api.post(`/transactions/tickets/${id}/transfer/`, { email: transferEmail });
      if (res.data?.success) {
        setTransferMsg("Ticket transferred. Redirecting...");
        setTimeout(() => navigate("/tickets"), 900);
      } else {
        setTransferMsg(res.data?.error || "Transfer failed");
      }
    } catch (err) {
      setTransferMsg(err.response?.data?.error || "Transfer failed");
    } finally {
      setTransferBusy(false);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="bg-white dark:bg-neutral-900 min-h-screen flex items-center justify-center dark:text-white">
        <Scrolltotop />
        <p className="text-neutral-500">Loading ticket…</p>
      </main>
    );
  }

  if (error || !ticket) {
    return (
      <main className="bg-white dark:bg-neutral-900 min-h-screen flex flex-col items-center justify-center gap-4 p-6 dark:text-white">
        <Scrolltotop />
        <p className="text-lg font-bold">Ticket not found</p>
        <p className="text-neutral-500 text-sm text-center">{error}</p>
        <Link
          to="/tickets"
          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-5 py-2 rounded-full"
        >
          My Tickets
        </Link>
      </main>
    );
  }

  const e = ticket.event;

  return (
    <main className="bg-white dark:bg-neutral-900 min-h-screen dark:text-white pb-20">
      <Scrolltotop />

      <div className="bg-white dark:bg-neutral-800 sticky top-0 flex items-center justify-between p-4 z-10">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <FaArrowLeft className="text-xl" />
        </button>
        <p className="font-bold text-lg">Ticket</p>
        <span className="w-5" />
      </div>

      <section className="p-5 flex flex-col items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[ticket.status]}`}>
          {ticket.status}
        </span>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          {ticket.status === "ACTIVE" && ticket.payload ? (
            <QRCodeCanvas
              value={ticket.payload}
              size={220}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
              includeMargin={false}
            />
          ) : (
            <div className="w-[220px] h-[220px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center px-6">
              <p className="text-sm text-neutral-500">
                {ticket.status === "USED"
                  ? "This ticket has already been scanned."
                  : "This ticket has expired."}
              </p>
            </div>
          )}
        </div>

        <p className="text-[11px] text-neutral-400 tracking-widest">
          #{ticket.short_id}
        </p>

        {ticket.status === "ACTIVE" && (
          <p className="text-xs text-neutral-500 text-center max-w-xs">
            Show this QR code at the gate. Each ticket is single-use.
          </p>
        )}
      </section>

      <section className="px-5 flex flex-col gap-3">
        <p className="font-bold text-lg">{e.event_name}</p>

        {ticket.tier_badge && (
          <span className="text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full self-start">
            {ticket.tier_badge}
          </span>
        )}

        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 flex flex-col gap-2 text-sm">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-orange-500" /> {fmtFull(e.event_date)}
          </p>
          {e.event_venue && (
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" /> {e.event_venue}
            </p>
          )}
          <p className="flex items-center gap-2 text-neutral-500">
            <FaCheckCircle className="text-orange-500" /> Hosted by {e.seller_name}
          </p>
          {e.event_end_time && (
            <p className="flex items-center gap-2 text-neutral-500">
              <FaClock className="text-orange-500" /> Ends {fmtFull(e.event_end_time)}
            </p>
          )}
        </div>

        {ticket.status === "ACTIVE" && (
          <button
            onClick={() => setTransferOpen(true)}
            className="mt-2 flex items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl py-3 font-semibold cursor-pointer"
          >
            <FaShare /> Transfer ticket
          </button>
        )}
      </section>

      {transferOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-30">
          <div className="bg-white dark:bg-neutral-800 w-full rounded-t-3xl p-5 flex flex-col gap-4">
            <p className="font-bold text-lg">Transfer Ticket</p>
            <p className="text-sm text-neutral-500">
              Only unscanned tickets can be transferred.
            </p>
            <form onSubmit={handleTransfer} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Recipient's email"
                value={transferEmail}
                onChange={(e) => setTransferEmail(e.target.value)}
                className="bg-orange-100 dark:bg-neutral-700 outline-none rounded-xl p-3"
                required
              />
              {transferMsg && <p className="text-sm text-neutral-600 dark:text-neutral-300">{transferMsg}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setTransferOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-neutral-200 dark:bg-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={transferBusy}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-400 text-white font-semibold cursor-pointer disabled:opacity-60"
                >
                  {transferBusy ? "Transferring…" : "Transfer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default TicketDetailPage;