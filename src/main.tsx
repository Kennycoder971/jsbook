import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import * as esbuild from "esbuild-wasm";
const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) return;
    let result;
    try {
      result = await ref.current.transform(input, {
        loader: "jsx",
        target: "es2015",
      });

      setCode(result.code);
    } catch (error) {
      console.log(error);
    }

    console.log(result);
  };
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div onClick={onClick}>
        <button>Submit</button>
      </div>
      <pre> {code} </pre>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
