"use client";
import { useEffect, useState } from "react";
import { getImages } from "@/lib/galleryUtils/fetchImages";
import { ThreeDCard } from "@/components/3dcard";
import LoadingSpinner from "@/components/loadingspinner";
export default function Home() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadImages() {
      const fetchedImages = await getImages();
      setImages(fetchedImages);
      setIsLoading(false);
    }

    loadImages();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="grid gap-x-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {images.map(({ id, public_id, format, blurDataUrl }) => (
          <ThreeDCard
            key={id}
            id={id}
            public_id={public_id}
            format={format}
            blurDataUrl={blurDataUrl}
          />
        ))}
      </div>
    </>
  );
}
