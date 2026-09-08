import { useEffect, useState } from "react";

import { adminApi } from "../../services/adminApi";

const SIZE_CLASSES = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
  card: "h-11 w-11",
  hero: "h-32 w-32 rounded-2xl border-4 border-white/25 bg-white/10 text-white/80 shadow-xl",
};

function initialFor(name) {
  return Array.from(String(name || "").trim())[0] || "؟";
}

export default function AdminEntityAvatar({
  name,
  hasImage,
  imageEndpoint,
  alt,
  size = "md",
}) {
  const endpoint = typeof imageEndpoint === "string" ? imageEndpoint.trim() : "";
  const canLoad = hasImage === true && Boolean(endpoint);
  const [image, setImage] = useState({ endpoint: "", status: "idle", url: "" });

  useEffect(() => {
    if (!canLoad) return undefined;

    let active = true;
    let objectUrl = "";

    adminApi
      .getAdminImageBlob(endpoint)
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        if (active) {
          setImage({ endpoint, status: "loaded", url: objectUrl });
        } else {
          URL.revokeObjectURL(objectUrl);
        }
      })
      .catch(() => {
        if (active) setImage({ endpoint, status: "error", url: "" });
      });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [canLoad, endpoint]);

  const isHero = size === "hero";
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const isCurrentImage = image.endpoint === endpoint;
  const isLoaded = canLoad && isCurrentImage && image.status === "loaded";
  const isLoading = canLoad && (!isCurrentImage || image.status === "idle");

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden ${
        isHero
          ? sizeClass
          : `${sizeClass} rounded-full border border-slate-200 bg-[#E8F1FA] text-sm font-extrabold text-[#0D4B8E]`
      }`}
    >
      {isLoaded ? (
        <img
          src={image.url}
          alt={alt || `صورة ${name || "الملف الشخصي"}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => {
            URL.revokeObjectURL(image.url);
            setImage({ endpoint, status: "error", url: "" });
          }}
        />
      ) : isLoading ? (
        <span
          className={`animate-pulse rounded-full ${isHero ? "h-10 w-10 bg-white/25" : "h-full w-full bg-slate-200"}`}
          role="status"
          aria-label={`جارٍ تحميل ${alt || "الصورة الشخصية"}`}
        />
      ) : (
        <span aria-hidden="true">{initialFor(name)}</span>
      )}
    </div>
  );
}
