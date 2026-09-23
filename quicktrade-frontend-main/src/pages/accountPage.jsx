// src/pages/accountPage.jsx
import { MdLogout, MdPerson, MdSecurity } from "react-icons/md";
import { BiBell, BiBox } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import image from "../assets/profile_image.png";
import { authContext } from "../context/authContext";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, logoutUser, isAuthenticated } = useContext(authContext);

  const routes = [
    { id: 1, title: `Profile`, path: `/profile`, icon: <MdPerson className="text-2xl" /> },
    { id: 2, title: `My Orders`, path: `/orders`, icon: <BiBox className="text-2xl" /> },
    { id: 3, title: `Notifications`, path: `/notifications`, icon: <BiBell className="text-2xl" /> },
    { id: 4, title: `Security & Support`, path: `/security`, icon: <MdSecurity className="text-2xl" /> },
    { id: 5, title: `System Settings`, path: `/settings`, icon: <FiSettings className="text-2xl" /> },
  ];

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const displayName = user
    ? user.full_name ||
      `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
      user.email
    : "Guest";

  const avatarSrc = user?.profile?.avatar_url || image;

  return (
    <main className="bg-neutral-200 min-h-screen dark:bg-neutral-900 dark:text-white">
      <div className="bg-white sticky top-0 flex flex-col items-center gap-1 py-10 z-10 dark:bg-neutral-800">
        <img src={avatarSrc} alt="" className="w-25 h-25 rounded-full object-cover" />
        <p className="text-xl font-bold">{displayName}</p>
        {user?.current_mode && (
          <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full">
            {user.current_mode} mode
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4 px-4 pt-10 pb-30">
        {routes.map((route) => (
          <Link
            key={route.id}
            to={route.path}
            className="bg-white flex justify-between items-center p-3 rounded-lg dark:bg-neutral-800"
          >
            <div className="flex items-center gap-3">
              {route.icon}
              {route.title}
            </div>
            <FaAngleRight className="text-lg" />
          </Link>
        ))}

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-white flex justify-between items-center p-3 rounded-lg cursor-pointer text-left dark:bg-neutral-800"
          >
            <div className="flex items-center gap-3 text-red-600">
              <MdLogout className="text-2xl" />
              Logout
            </div>
            <FaAngleRight className="text-lg" />
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-gradient-to-b from-orange-600 to-orange-400 text-white text-center rounded-full py-2"
          >
            Sign in
          </Link>
        )}
      </div>
    </main>
  );
};

export default AccountPage;