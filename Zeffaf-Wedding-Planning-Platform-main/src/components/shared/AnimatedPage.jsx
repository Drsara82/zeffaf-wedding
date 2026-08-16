import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="
        min-h-screen
        bg-white
        dark:bg-gray-900
        text-slate-800
        dark:text-gray-100
        transition-colors
      "
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
