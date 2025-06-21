"use client";
import { FileUpload } from "@/components/ui/file-upload";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-screen">
        Welcome to Persona
      </div>
      <div className="flex flex-col h-screen">
        <FileUpload />
      </div>
    </div>
  );
}
