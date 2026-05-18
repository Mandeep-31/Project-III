import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back to FocusPact
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            px-5
            py-3
            rounded-lg
            font-semibold
          "
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-lg text-slate-400 mb-3">
            Focus Streak
          </h2>

          <p className="text-4xl font-bold">
            12 Days
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-lg text-slate-400 mb-3">
            Focus Score
          </h2>

          <p className="text-4xl font-bold">
            87%
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-lg text-slate-400 mb-3">
            Study Hours
          </h2>

          <p className="text-4xl font-bold">
            5.2h
          </p>

        </div>

      </div>

      <div className="mt-10 bg-slate-800 p-8 rounded-xl">

        <h2 className="text-2xl font-bold mb-6">
          Start Focus Session
        </h2>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Subject"
            className="
              flex-1
              p-4
              rounded-lg
              bg-slate-700
              outline-none
            "
          />

          <button
            className="
              bg-blue-500
              hover:bg-blue-600
              px-8
              rounded-lg
              font-semibold
            "
          >
            Start
          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;