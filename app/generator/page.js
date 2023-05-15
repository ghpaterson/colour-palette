"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "@/components/navbar";

export default function ColorGrid() {
  const [colors, setColors] = useState([]);
  const [lockedColors, setLockedColors] = useState([]);

  useEffect(() => {
    fetchColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchColors = async () => {
    try {
      const inputColors = lockedColors.map((index) => colors[index]);
      const additionalColors = [
        [0, 0, 255], // Blue
        [0, 255, 0], // Green
        [255, 255, 0], // Yellow
      ];
      const response = await axios.post(
        "http://localhost:8080/http://colormind.io/api/",
        {
          model: "default",
          input: [...inputColors, ...additionalColors],
        }
      );
      console.log("Fetched colors:", response.data.result);
      setColors(response.data.result);
    } catch (error) {
      console.error("Failed to fetch colors:", error);
    }
  };

  const handleGenerateClick = () => {
    fetchColors();
  };

  useEffect(() => {
    const generateButton = document.getElementById("generate-button");
    generateButton.addEventListener("click", handleGenerateClick);
    return () => {
      generateButton.removeEventListener("click", handleGenerateClick);
    };
  }, []);

  return (
    <main>
      <section>
        <NavBar />
      </section>
      <section className="font-righteous flex justify-center text-4xl p-6">
        <h1>Generate a Colour Palette</h1>
      </section>
      <section>
        <div className="flex justify-center">
          <div className=" grid grid-rows-5 md:grid md:grid-cols-5">
            {colors.map((color, index) => {
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className=" w-96 h-20 md:w-72 md:h-96 mb-2"
                    style={{
                      backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                    }}
                  >
                    <div className="flex justify-start items-end">
                      <span className=" text-gray-800 text-base md:text-xl p-2">{`rgb(${color[0]}, ${color[1]}, ${color[2]})`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <button
          id="generate-button"
          onClick={handleGenerateClick}
          className="flex justify-center bg-blue-500 rounded-lg py-2 px-4"
        >
          Generate
        </button>
      </section>
    </main>
  );
}
