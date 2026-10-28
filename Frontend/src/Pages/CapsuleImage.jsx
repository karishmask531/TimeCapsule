export default function CapsuleImage({ image, alt, className }) {
  if (!image) return null;

  const imageUrl =
    typeof image === "string" ? image : URL.createObjectURL(image);

  return (
    <img
      src={imageUrl}
      alt={alt || "Capsule image"}
      className={className}
    />
  );
}