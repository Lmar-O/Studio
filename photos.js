// Central photo list. Add new photos here and they show up in the gallery.
// Optimize before adding (long edge ≤ 2400px, JPG quality ~80).
//
// Categories must match one of the entries in PHOTO_CATEGORIES (case-sensitive).
window.PHOTO_CATEGORIES = ["All", "Automotive", "Street", "Landscape"];

window.PHOTOS = [
  { id: "merc-e450", src: "/photos/DSC05466-2.jpg", alt: "Mercedes E-Class on highway, dusk",       category: "Automotive", title: "Mercedes E450",  date: "2025" },
  { id: "gt3",       src: "/photos/DSC05137.jpg",   alt: "Porsche 911 GT3 with Golden Gate Bridge", category: "Automotive", title: "Porsche GT3",    date: "2025" },
  { id: "merc-trip", src: "/photos/Untitled-1.jpg", alt: "Mercedes E450 triptych",                  category: "Automotive", title: "E450 Triptych", date: "2025" },
  { id: "vw",        src: "/photos/DSC05077.jpg",   alt: "Red Volkswagen Beetle, residential street", category: "Street",   title: "VW Beetle",      date: "2024" },
  { id: "tokyo",     src: "/photos/DSC08581.jpg",   alt: "Japanese alley, cyclist passing",         category: "Street",     title: "Tokyo Alleys",   date: "2024" },
  { id: "pacifica",  src: "/photos/DSC09367-2.jpg", alt: "Coastal landscape",                       category: "Landscape",  title: "Pacifica",       date: "2024" }
];
