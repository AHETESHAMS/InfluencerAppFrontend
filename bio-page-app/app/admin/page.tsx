"use client";

import { useEffect, useState, useRef} from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Globe,
  MousePointerClick,
  IndianRupee,
} from "lucide-react";

export default function AdminDashboard() {

  const [loading, setLoading] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

// ✅ protect admin route
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.replace("/login");
  }
}, []);

const menuRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");

    window.location.href = "/dashboard";
  };

  const [stats, setStats] = useState({
    users: 0,
    pages: 0,
    clicks: 0,
    revenue: 0,
  });

  // ✅ FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/api/dashboard/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await res.json();


        setStats({
          users: data.totalUsers,
          pages: data.activePages,
          clicks: data.totalClicks,
          revenue: data.revenue,
        });

      } catch (err) {
        console.log("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Active Pages",
      value: stats.pages,
      icon: Globe,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Total Clicks",
      value: stats.clicks,
      icon: MousePointerClick,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: IndianRupee,
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-6 md:p-10">

      {/* HEADER */}
<div className="flex items-center justify-between mb-10">

  {/* LEFT SIDE */}
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
      Admin Dashboard
    </h1>
    <p className="text-gray-500 mt-2">
      Monitor platform growth & performance
    </p>
  </div>

  {/* RIGHT SIDE ADMIN MENU */}
  <div ref={menuRef} className="relative">
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="flex items-center gap-3 hover:opacity-80 transition"
    >
      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
        A
      </div>
      <span className="font-medium text-gray-700 dark:text-gray-200">
        Admin
      </span>
    </button>

    {menuOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
        
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Logout
        </button>

      </div>
    )}
  </div>

</div>

      {/* STATS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition duration-300"
            >
              <div
                className={`absolute inset-0 opacity-10 rounded-2xl bg-gradient-to-br ${stat.color}`}
              />

              <div className="flex items-center justify-between relative">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>

                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {loading ? "—" : stat.value}
                  </h2>

                  <p className="text-xs text-emerald-500 mt-1">
                    Live data
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10 grid md:grid-cols-3 gap-6">

        <button className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition text-left">
          <p className="font-semibold text-gray-800 dark:text-white">
            Manage Users
          </p>
          <p className="text-sm text-gray-500 mt-1">
            View & control platform users
          </p>
        </button>

        <button className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition text-left">
          <p className="font-semibold text-gray-800 dark:text-white">
            View Payments
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Track subscriptions & revenue
          </p>
        </button>

        <button className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition text-left">
          <p className="font-semibold text-gray-800 dark:text-white">
            Platform Settings
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Configure system & features
          </p>
        </button>

      </div>

      {/* INSIGHTS */}
      <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl p-10 shadow-sm text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          🚀 Analytics Coming Soon
        </h2>

        <p className="text-gray-500 max-w-md mx-auto">
          Detailed analytics, charts, and performance insights will appear here once your platform gains activity.
        </p>
      </div>
    </main>
  );
}

