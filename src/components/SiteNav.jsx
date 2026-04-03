import { motion } from 'framer-motion';

function navTo(hash) {
  window.location.hash = hash;
}

export default function SiteNav() {
  return (
    <header className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between px-6 py-3 min-w-[600px] rounded-full bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <button
          type="button"
          onClick={() => navTo('')}
          className="text-lg font-bold tracking-tight whitespace-nowrap origin-left text-[#09090B] bg-transparent border-none cursor-pointer"
        >
          Quang Ho
        </button>

        <div className="flex space-x-8 text-sm font-medium text-[#3F3F46]">
          <button
            type="button"
            onClick={() => navTo('')}
            className="hover:text-[#18181B] transition-colors duration-200 cursor-pointer bg-transparent border-none text-sm font-medium text-[#3F3F46]"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => navTo('#/competitions')}
            className="hover:text-[#18181B] transition-colors duration-200 cursor-pointer bg-transparent border-none text-sm font-medium text-[#3F3F46]"
          >
            Competitions
          </button>
          <button
            type="button"
            onClick={() => navTo('#/film')}
            className="hover:text-[#18181B] transition-colors duration-200 cursor-pointer bg-transparent border-none text-sm font-medium text-[#3F3F46]"
          >
            Film
          </button>
          <button
            type="button"
            onClick={() => navTo('#experiences')}
            className="hover:text-[#18181B] transition-colors duration-200 cursor-pointer bg-transparent border-none text-sm font-medium text-[#3F3F46]"
          >
            Experiences
          </button>
        </div>

        <button
          type="button"
          className="px-5 py-2 text-sm font-medium text-[#09090B] border border-gray-200 rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer"
        >
          Contact
        </button>
      </motion.nav>
    </header>
  );
}
