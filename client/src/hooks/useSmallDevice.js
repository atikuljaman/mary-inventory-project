import { useState, useEffect } from "react";

const useSmallDevice = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmallDevice;
};

export default useSmallDevice;
