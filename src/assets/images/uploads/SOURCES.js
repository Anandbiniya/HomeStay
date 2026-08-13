/**
 * Real host-uploaded photos from Google Drive folder “kodai photo”.
 * Converted HEIC/JPG originals live under uploads/_raw (not deleted).
 *
 * Mapping:
 * - hostillam/ → Stay / Hostillam Veedu / About atmosphere
 * - camping/   → My Magik Place camping products
 * - kodai/     → Nature walks & Kodaikanal trails
 */
export const UPLOAD_SOURCES = {
  driveFolder: 'https://drive.google.com/drive/folders/1biUtjtN58icNuEVVHOIh1NHoZGfnTstA',
  hostillam: [
    'hostillam/veedu-cottage.jpg',
    'hostillam/approach-path.jpg',
    'hostillam/valley-view.jpg',
    'hostillam/outdoor-view.jpg',
  ],
  camping: [
    'camping/campsite-friends.jpg',
    'camping/tent-atv.jpg',
    'camping/tent-view.jpg',
    'camping/campfire-night.jpg',
  ],
  kodai: [
    'kodai/forest-walk.jpg',
    'kodai/mountain-viewpoint.jpg',
    'kodai/trail-walk.jpg',
    'kodai/stream-crossing.jpg',
  ],
}
