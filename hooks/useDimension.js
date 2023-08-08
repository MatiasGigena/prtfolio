const { useEffect, useState } = require("react");

const useDimension = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const updateDimension = () => {
    const { innerHeight, innerWidth } = window;
    setDimension({ width: innerWidth, height: innerHeight });
  };
  useEffect(() => {
    updateDimension();

    window.addEventListener("resize", updateDimension);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);
  return dimension;
};
export default useDimension;
