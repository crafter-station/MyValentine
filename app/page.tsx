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

  const submitted = name !== null;

  return (
    <main className="min-h-svh">
      {!submitted ? (
        <section className="flex min-h-svh items-center justify-center p-12 lg:p-20">
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
      ) : (
        <section className="relative min-h-svh overflow-hidden bg-secondary/50">
          <PhotoAlbum name={name} images={images} />
        </section>
      )}
    </main>
  );
}
