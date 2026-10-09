// src/components/ticketCard.jsx
import { Link } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaClock } from "react-icons/fa";

const STATUS_STYLE = {
  ACTIVE: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  USED: "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300",
  EXPIRED: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const STATUS_ICON = {
  ACTIVE: <FaCheckCircle className="text-xs" />,
  USED: <FaCheckCircle className="text-xs" />,
  EXPIRED: <FaClock className="text-xs" />,
};

function fmt(dateStr) {
  if (!dateStr) return "TBA";
  try {
    return new Date(dateStr).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

const TicketCard = ({ ticket }) => {
  const e = ticket.event;
  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="bg-white dark:bg-neutral-800 rounded-2xl flex gap-3 p-3 hover:shadow-md transition-shadow"
    >
      <img
        src={e.image_url || "/placeholder.png"}
        alt={e.event_name}
        className="w-24 h-24 rounded-xl object-cover shrink-0"
      />

      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold leading-tight truncate">{e.event_name}</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${STATUS_STYLE[ticket.status]}`}>
            {STATUS_ICON[ticket.status]}
            {ticket.status}
          </span>
        </div>

        {ticket.tier_badge && (
          <span className="text-[11px] px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full self-start">
            {ticket.tier_badge}
          </span>
        )}

        <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 truncate">
          <FaCalendarAlt /> {fmt(e.event_date)}
        </p>

        {e.event_venue && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 truncate">
            <FaMapMarkerAlt /> {e.event_venue}
          </p>
        )}

        <p className="text-[10px] text-neutral-400 mt-0.5">#{ticket.short_id}</p>
      </div>
    </Link>
  );
};

export default TicketCard;