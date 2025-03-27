import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Spinner from "./Spinner"; // Import your existing Spinner component

const PageWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className=" items-center justify-center "
    >
      {isLoading ? <Spinner /> : children}
    </motion.div>
  );
};

export default PageWrapper;
