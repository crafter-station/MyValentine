"use client";

import { useState } from "react";
import { LocketForm } from "@/components/locket-form";
import { PhotoAlbum } from "@/components/heart-locket";

export default function Page() {
  const [name, setName] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  function handleCreate(newName: string, newImages: string[]) {
    setName(newName);
    setImages(newImages);
  }

  return (
    <main className="flex min-h-svh flex-col lg:flex-row">
      {/* Left — Form */}
      <section className="flex flex-1 items-center justify-center p-12 lg:p-20">
        <div className="flex w-full max-w-sm flex-col gap-16">
          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-5xl font-light leading-tight tracking-tight text-foreground text-balance">
              Photo Album
            </h1>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Create a keepsake for someone you love.
              <br />
              Upload their photos, and seal them inside.
            </p>
          </div>

          <LocketForm onSubmit={handleCreate} />
        </div>
      </section>

      {/* Right — Album */}
      <section className="relative flex-1 overflow-hidden bg-secondary/50">
        <PhotoAlbum name={name} images={images} />
      </section>
    </main>
  );
}
