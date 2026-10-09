// src/pages/ticketsPage.jsx  — DEBUG VERSION
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaTicketAlt, FaBug } from "react-icons/fa";
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

const DebugBox = ({ title, children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-100",
    green: "bg-green-50 border-green-300 text-green-900 dark:bg-green-900/20 dark:border-green-700 dark:text-green-100",
    red: "bg-red-50 border-red-300 text-red-900 dark:bg-red-900/20 dark:border-red-700 dark:text-red-100",
    amber: "bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-100",
  };
  return (
    <div className={`border-2 rounded-xl p-3 text-xs font-mono ${colors[color]} mb-3`}>
      <p className="font-bold mb-1 flex items-center gap-2">
        <FaBug /> {title}
      </p>
      <div className="whitespace-pre-wrap break-all">{children}</div>
    </div>
  );
};

const TicketsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading, user, api} = useContext(authContext);
  const { refreshTicketCount } = useContext(cartContext);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ACTIVE");

  // Debug state — captures what the request actually did
  const [debug, setDebug] = useState({
    authState: "unknown",
    tokenPresent: false,
    tokenSnippet: "",
    apiBaseUrl: "unknown",
    requestStarted: false,
    requestStatus: null,
    requestBody: null,
    requestError: null,
    rawResponse: null,
  });

  useEffect(() => {
    // Capture auth info
    const t = localStorage.getItem("authToken");
    const apiBase = api?.defaults?.baseURL || "unknown";

    setDebug((d) => ({
      ...d,
      authState: `isAuthenticated=${isAuthenticated}, authLoading=${authLoading}`,
      tokenPresent: !!t,
      tokenSnippet: t ? `${t.slice(0, 8)}...${t.slice(-4)}` : "(none)",
      apiBaseUrl: apiBase,
      userEmail: user?.email || "(no user)",
    }));

    if (authLoading) {
      console.log("[tickets] waiting for auth to finish");
      return;
    }

    if (!isAuthenticated) {
      console.log("[tickets] not authenticated — skipping fetch");
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      console.log("[tickets] starting fetch, filter =", filter);
      setLoading(true);
      setError("");
      setDebug((d) => ({ ...d, requestStarted: true }));

      try {
        const res = await api.get("/transactions/tickets/", {
          params: { status: filter },
        });

        if (cancelled) return;

        console.log("[tickets] response status:", res.status);
        console.log("[tickets] response data:", res.data);

        setDebug((d) => ({
          ...d,
          requestStatus: res.status,
          requestBody: JSON.stringify(res.data, null, 2),
          rawResponse: res.data,
        }));

        if (res.data?.success) {
          setTickets(res.data.tickets || []);
        } else {
          setError(res.data?.error || "Failed to load tickets");
        }
      } catch (err) {
        if (cancelled) return;
        console.error("[tickets] fetch error:", err);
        const errMsg = err?.response
          ? `HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}`
          : `Network error: ${err?.message || "unknown"}`;
        setError(errMsg);
        setDebug((d) => ({ ...d, requestError: errMsg }));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [api, isAuthenticated, authLoading, filter, user]);

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

      {/* =================== DEBUG PANEL =================== */}
      <div className="p-4">
        <DebugBox title="Auth state" color={isAuthenticated ? "green" : "red"}>
          {`authLoading:     ${authLoading}\n`}
          {`isAuthenticated: ${isAuthenticated}\n`}
          {`user email:      ${debug.userEmail || "(none)"}\n`}
          {`token present:   ${debug.tokenPresent}\n`}
          {`token snippet:   ${debug.tokenSnippet}`}
        </DebugBox>

        <DebugBox title="API instance" color="blue">
          {`baseURL: ${debug.apiBaseUrl}`}
        </DebugBox>

        <DebugBox
          title="Request lifecycle"
          color={debug.requestError ? "red" : debug.requestStatus ? "green" : "amber"}
        >
          {`started:  ${debug.requestStarted}\n`}
          {`status:   ${debug.requestStatus ?? "(not yet)"}\n`}
          {`error:    ${debug.requestError ?? "(none)"}`}
        </DebugBox>

        {debug.requestBody && (
          <DebugBox title="Response body" color="green">
            {debug.requestBody}
          </DebugBox>
        )}

        <DebugBox title="State" color="amber">
          {`filter:        ${filter}\n`}
          {`tickets count: ${tickets.length}\n`}
          {`loading:       ${loading}\n`}
          {`error:         ${error || "(none)"}`}
        </DebugBox>
      </div>
      {/* ================================================== */}

      <div className="p-4 flex flex-col gap-3">
        {!isAuthenticated && (
          <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
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
          <p className="text-center text-neutral-500 py-6">Loading tickets…</p>
        )}

        {isAuthenticated && !loading && error && (
          <p className="text-center text-red-500 py-6 break-words">{error}</p>
        )}

        {isAuthenticated && !loading && !error && tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
            <FaTicketAlt className="text-6xl text-neutral-400" />
            <p className="font-bold">No {filter.toLowerCase()} tickets</p>
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