import { motion } from "framer-motion";

export default function Loader({ size = 16, color = "#2ca87f" }) {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -20 },
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="flex justify-center items-center gap-2"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
          className="rounded-full"
          variants={dotVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
