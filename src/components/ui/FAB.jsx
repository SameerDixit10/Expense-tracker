export default function FAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg text-2xl hover:bg-blue-600 z-40 flex items-center justify-center"
    >
      +
    </button>
  );
}
