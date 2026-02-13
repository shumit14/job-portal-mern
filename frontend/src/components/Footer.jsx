export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} JobPortal. Built with MERN.
      </div>
    </footer>
  );
}
