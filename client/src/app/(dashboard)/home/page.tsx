"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [csv, setCsv] = useState("");
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [botUrl, setBotUrl] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCsv(reader.result as string);
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBotUrl("");
    try {
      const res = await fetch("http://localhost:5000/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv, prompt, tone }),
      });
      if (!res.ok) throw new Error("Failed to create bot");
      const data = await res.json();
      setBotUrl(data.url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Test Bot Creation</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded p-4 text-center cursor-pointer bg-gray-50"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the CSV file here ...</p>
          ) : csv ? (
            <p className="text-green-700">CSV file loaded!</p>
          ) : (
            <p>Drag 'n' drop a CSV file here, or click to select</p>
          )}
        </div>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Prompt (e.g. 'Explain things clearly...')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Tone (e.g. 'Friendly')"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded p-2 font-semibold"
          disabled={loading || !csv || !prompt || !tone}
        >
          {loading ? "Creating..." : "Create Bot"}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {botUrl && (
          <div className="text-green-700 mt-2">
            Bot created!{" "}
            <a href={botUrl} className="underline text-blue-700">
              Go to bot
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
