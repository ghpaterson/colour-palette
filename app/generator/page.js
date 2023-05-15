import { useState, useEffect } from "react";
import axios from "axios";

export default function Generator() {
  const [colours, setColours] = useState([]);
  return (
    <main>
      <section>
        <h1>Generate Colour Palette</h1>
      </section>
    </main>
  );
}
