export default function BackgroundFX() {
  return (
    <div id="bg-fx" aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="fx-blob fx-blob-1" />
      <div className="fx-blob fx-blob-2" />
      <div className="fx-blob fx-blob-3" />
      <div className="bg-noise absolute inset-0" />
    </div>
  );
}
