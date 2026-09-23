// src/pages/profilePage.jsx
import { useEffect, useRef, useState, useContext } from "react";
import { BiCamera } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import image from "../assets/profile_image.png";
import Scrolltotop from "../components/scrolltotop";
import { authContext } from "../context/authContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    loading: authLoading,
    refreshUser,
    updateProfile,
    uploadAvatar,
    removeAvatar,
    logoutUser,
  } = useContext(authContext);

  const fileRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
  });

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  // Load profile on mount
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    (async () => {
      const result = await refreshUser();
      if (result.success) {
        const u = result.data;
        setForm({
          first_name: u.first_name || "",
          last_name: u.last_name || "",
          email: u.email || "",
          phone: u.phone || "",
          location: u.profile?.location || "",
        });
      } else {
        setError(result.error || "Could not load profile.");
      }
      setLoading(false);
    })();
  }, [authLoading, isAuthenticated, refreshUser, navigate]);

  const handlePickAvatar = () => fileRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setInfo("");
    setAvatarBusy(true);
    const result = await uploadAvatar(file);
    setAvatarBusy(false);
    if (result.success) setInfo("Profile picture updated.");
    else setError(result.error || "Could not upload image.");
    e.target.value = "";
  };

  const handleRemoveAvatar = async () => {
    if (!confirm("Remove your profile picture?")) return;
    setError("");
    setInfo("");
    setAvatarBusy(true);
    const result = await removeAvatar();
    setAvatarBusy(false);
    if (result.success) setInfo("Profile picture removed.");
    else setError(result.error || "Could not remove image.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);
    const result = await updateProfile(form);
    setBusy(false);
    if (result.success) {
      setInfo("Profile saved.");
      setTimeout(() => setInfo(""), 2500);
    } else {
      setError(result.error || "Could not save profile.");
    }
  };

  const handleLogout = async () => {
    if (!confirm("Log out of QuickTrade?")) return;
    await logoutUser();
    navigate("/login");
  };

  if (authLoading || loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center dark:bg-neutral-900 dark:text-white">
        <Scrolltotop />
        <p className="text-neutral-500">Loading profile…</p>
      </main>
    );
  }

  const avatarSrc = user?.profile?.avatar_url || image;

  return (
    <main className="bg-white min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-20 cursor-pointer"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      <div className="bg-white sticky top-0 flex justify-center py-4 z-10 dark:bg-neutral-800">
        <span className="text-lg font-bold">Edit Profile</span>
      </div>

      {error && (
        <p className="mx-4 mt-3 bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-center text-sm">
          {error}
        </p>
      )}
      {info && (
        <p className="mx-4 mt-3 bg-green-100 text-green-700 border border-green-300 rounded-xl p-2 text-center text-sm">
          {info}
        </p>
      )}

      <form noValidate onSubmit={handleSubmit} className="flex flex-col py-10 px-4">
        <div className="relative self-center mb-15">
          <button
            type="button"
            onClick={handlePickAvatar}
            disabled={avatarBusy}
            className="relative cursor-pointer disabled:opacity-60"
          >
            <img
              src={avatarSrc}
              alt=""
              className="w-30 h-30 object-cover rounded-full"
            />
            <BiCamera className="bg-white text-neutral-900 text-4xl p-2 rounded-full absolute bottom-0 right-0" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          {user?.profile?.avatar_url && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              disabled={avatarBusy}
              className="block mx-auto mt-2 text-xs text-red-500 cursor-pointer disabled:opacity-60"
            >
              Remove picture
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl mb-10 dark:bg-neutral-800">
          <div className="flex items-center p-3">
            <label className="w-1/3">First name</label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => update("first_name", e.target.value)}
              className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent"
              placeholder="First name"
            />
          </div>
          <div className="flex items-center p-3">
            <label className="w-1/3">Last name</label>
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => update("last_name", e.target.value)}
              className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent"
              placeholder="Last name"
            />
          </div>
          <div className="flex items-center p-3">
            <label className="w-1/3">Phone number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent"
              placeholder="Phone number"
            />
          </div>
          <div className="flex items-center p-3">
            <label className="w-1/3">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center p-3">
            <label className="w-1/3">Address</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent"
              placeholder="Location"
            />
          </div>
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 -mt-6 mb-8 text-center leading-tight">
          Changing your email changes your login. Make sure it's correct.
        </p>

        <button
          type="submit"
          disabled={busy}
          className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 cursor-pointer disabled:opacity-60 mb-4"
        >
          {busy ? "Saving…" : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="bg-white dark:bg-neutral-800 text-red-600 rounded-xl py-2 flex justify-center items-center gap-2 cursor-pointer border border-red-200 dark:border-red-900"
        >
          <MdLogout className="text-xl" />
          Logout
        </button>
      </form>
    </main>
  );
};

export default ProfilePage;