import React, { useState, useEffect } from "react";

export function TimeButton({ color }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <button
      onClick={() => setTime(new Date().toLocaleTimeString())}
      style={{
        color: color,
        border: `2px solid ${color}`,
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        background: "white",
        fontSize: "18px",
        marginBottom: "10px",
      }}
    >
      {time}
    </button>
  );
}

export function ColorSelector({ color, setColor }) {
  return (
    <select
      value={color}
      onChange={(e) => setColor(e.target.value)}
      style={{
        marginTop: "15px",
        padding: "8px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid gray",
      }}
    >
      <option value="black">Black</option>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="purple">Purple</option>
      <option value="orange">Orange</option>
    </select>
  );
}

export default function TimeColorApp() {
  const [color, setColor] = useState("black");
  const [theme, setTheme] = useState("light");

  return (
    <div
      style={{
        margin: "20px",
        textAlign: "center",
        background: theme === "light" ? "#f9f9f9" : "#222",
        color: theme === "light" ? "#000" : "#fff",
        padding: "30px",
        borderRadius: "10px",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>🕒 Time & Color App</h2>

      <TimeButton color={color} />
      


      <ColorSelector color={color} setColor={setColor} />

      <p
  style={{
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    background: theme === "light" ? "#fff" : "#333",
    padding: "10px",
    borderRadius: "6px",
    display: "inline-block",
  }}
>
  Selected color:{" "}
  <span
    style={{
      color: color,
      textTransform: "capitalize",
    //   fontWeight: "bold"
    }}
  >
    {color}
  </span>
</p>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "1px solid gray",
          cursor: "pointer",
          background: theme === "light" ? "#fff" : "#444",
          color: theme === "light" ? "#000" : "#fff",
          fontSize: "15px",
        }}
      >
        Toggle Theme ({theme})
      </button>
    </div>
  );
}
 