"use client";

import { useRef } from "react";
import { Heart, Upload } from "lucide-react";

interface LocketFormProps {
  onSubmit: (name: string, image: string | null) => void;
}

export function LocketForm({ onSubmit }: LocketFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      previewRef.current = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value.trim() ?? "";
    if (!name) return;
    onSubmit(name, previewRef.current);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-10"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground">
          Their name
        </p>
        <input
          ref={nameRef}
          type="text"
          placeholder="Enter a name"
          required
          className="w-64 border-b border-border bg-transparent py-2 font-serif text-xl text-foreground placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none transition-colors duration-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground">
          Their photo
        </p>
        <label
          htmlFor="photo-upload"
          className="group flex w-64 cursor-pointer items-center gap-3 border-b border-border py-2 transition-colors duration-300 hover:border-ring"
        >
          <Upload
            size={16}
            className="text-muted-foreground transition-colors group-hover:text-foreground"
          />
          <span className="font-serif text-lg text-muted-foreground/50 transition-colors group-hover:text-foreground">
            Choose an image
          </span>
          <input
            ref={fileRef}
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:gap-3 hover:text-ring"
      >
        <Heart size={14} />
        Create
      </button>
    </form>
  );
}
