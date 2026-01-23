export default function Logo({ className = "", textClassName = "text-2xl lg:text-3xl" }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Custom Aperture Icon */}
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F59E0B] shrink-0"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="m14.31 8 5.74 9.94" />
                <path d="m9.69 8h11.48" />
                <path d="m7.38 12 5.74-9.94" />
                <path d="m9.69 16L3.95 6.06" />
                <path d="m14.31 16H2.83" />
                <path d="m16.62 12-5.74 9.94" />
            </svg>

            <h2 className={`font-bold tracking-tight ${textClassName}`}>
                CameraHub
            </h2>
        </div>
    );
}
