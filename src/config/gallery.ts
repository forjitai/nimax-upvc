import type { GalleryImage } from "@/components/ImageGallery";

/**
 * Project photos for the Gallery page.
 * Add real NIMAX UPVC photos to /public/images/gallery/ and list them here, e.g.
 *   { src: "/images/gallery/sliding-window-whitefield-01.jpg", width: 1600, height: 1200,
 *     alt: "White UPVC sliding window with mesh in a bedroom", caption: "Sliding window", category: "Windows" },
 * While this list is empty the Gallery page shows a "coming soon" message and is kept out of search results.
 */
export const galleryImages: GalleryImage[] = [];
