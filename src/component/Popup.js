import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Popup = ({ message, isVisible, onClose,type }) => {
  if (!isVisible) return null; // Do not render if not visible
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#00ff99"; // Light green
      case "error":
        return "#ff6666"; // Light red
      case "info":
        return "#ffff00"; // Light yellow
      default:
        return "#ffffff"; // Default white
    }
  };

  return (
    <motion.div
      className="popup"
      style={{ backgroundColor: getBackgroundColor() }} // Dynamic background color
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
    >
    <span>{message}</span>
    <FontAwesomeIcon
      icon={faTimes}
      className="close-icon"
      onClick={onClose}
    />
  </motion.div>
  );
};

export default Popup;
