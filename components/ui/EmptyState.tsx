export default function EmptyState({ message = "No data" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <svg
        width="120" height="120" viewBox="0 0 120 120"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        className="mb-4 opacity-40"
      >
        <rect x="10" y="30" width="100" height="70" rx="8" fill="#e2e8f0" />
        <rect x="20" y="20" width="80" height="15" rx="4" fill="#cbd5e1" />
        <rect x="25" y="52" width="70" height="6" rx="3" fill="#94a3b8" />
        <rect x="25" y="66" width="50" height="6" rx="3" fill="#94a3b8" />
        <rect x="25" y="80" width="60" height="6" rx="3" fill="#94a3b8" />
        <circle cx="90" cy="85" r="22" fill="#dbeafe" />
        <path d="M84 85h12M90 79v12" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className="text-base font-medium">{message}</p>
    </div>
  );
}
