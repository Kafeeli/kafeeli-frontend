import { useEffect, useState } from "react";
import { MdChildCare } from "react-icons/md";
import { sponsorApi } from "../../services/sponsorApi";

export default function SponsorOrphanProfileImage({
  orphan,
  className = "h-12 w-12",
  iconClassName = "text-2xl",
}) {
  const [loadedImage, setLoadedImage] = useState(null);
  const imageEndpoint = orphan?.profileImageAccessEndpoint || "";
  const canLoadImage = Boolean(
    orphan?.orphanId &&
    orphan.hasProfileImage === true &&
    orphan.canAccessProfileImage === true &&
    imageEndpoint,
  );
  const imageUrl =
    canLoadImage &&
    loadedImage?.orphanId === orphan.orphanId &&
    loadedImage.endpoint === imageEndpoint
      ? loadedImage.url
      : "";

  useEffect(() => {
    if (!canLoadImage) return undefined;

    let active = true;
    let objectUrl = "";

    sponsorApi.getOrphanProfileImage(orphan.orphanId)
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        if (active) {
          setLoadedImage({
            orphanId: orphan.orphanId,
            endpoint: imageEndpoint,
            url: objectUrl,
          });
        }
        else URL.revokeObjectURL(objectUrl);
      })
      .catch(() => {
        // يبقى رمز اليتيم الافتراضي ظاهرًا عند تعذر تحميل الصورة.
      });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [canLoadImage, imageEndpoint, orphan?.orphanId]);

  return (
    <div className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-[#E8F1FA] text-[#0D4B8E] ${className}`}>
      <MdChildCare className={iconClassName} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt={orphan.displayName || "صورة اليتيم"}
          onError={() => setLoadedImage(null)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
