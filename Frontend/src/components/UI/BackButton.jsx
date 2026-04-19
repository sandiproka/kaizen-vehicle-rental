import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:scale-105 transition mb-6"
    >
      ← Back
    </button>
  );
};

export default BackButton;