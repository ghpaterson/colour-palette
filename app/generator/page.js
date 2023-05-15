"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ColorGrid = () => {
  const [colors, setColors] = useState([]);
  const [lockedColors, setLockedColors] = useState([]);

  useEffect(() => {
    fetchColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchColors = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/http://colormind.io/api/",
        {
          model: "default",
          input: lockedColors.map((index) => colors[index]),
        }
      );
      console.log("data:", response.data.results);
      setColors(response.data.result);
    } catch (error) {
      console.error("Failed to fetch colors:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      fetchColors();
    }
  };

  const toggleColorLock = (index) => {
    const updatedLockedColors = [...lockedColors];
    if (updatedLockedColors.includes(index)) {
      updatedLockedColors.splice(updatedLockedColors.indexOf(index), 1);
    } else {
      updatedLockedColors.push(index);
    }
    setLockedColors(updatedLockedColors);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-6 gap-4">
        {colors.map((color, index) => {
          const isLocked = lockedColors.includes(index);
          return (
            <div
              key={index}
              className={`flex flex-col items-center ${
                isLocked ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div
                className="w-12 h-12 mb-2"
                style={{
                  backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                }}
              ></div>
              <span>{`rgb(${color[0]}, ${color[1]}, ${color[2]})`}</span>
              <button
                className="text-blue-500 underline"
                onClick={() => toggleColorLock(index)}
                disabled={lockedColors.length === 5 && !isLocked}
              >
                {isLocked ? "Unlock" : "Lock"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorGrid;
