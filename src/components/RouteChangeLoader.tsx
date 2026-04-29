import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative flex items-center justify-center">
            
            {/* Outer Spinner */}
            {/* <motion.div
              className="w-14 h-14 rounded-full border-4 border-pink-200 border-t-rose-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            /> */}

            {/* Inner Spinner */}
            <motion.div
              className="absolute w-8 h-8 rounded-full border-4 border-rose-100 border-t-pink-400"
              animate={{ rotate: -360 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteChangeLoader;