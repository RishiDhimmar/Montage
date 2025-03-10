import React from "react";

interface BookmarkItem {
  id: string;
  name: string;
  image?: string; // Optional image URL
  savedCount: number;
}

const bookmarks: BookmarkItem[] = [
  { id: "1", name: "Modules", image: "/logo.png", savedCount: 0 },
  { id: "2", name: "Save Templates", image: "/logo.png", savedCount: 0 },
  { id: "3", name: "All Designs", savedCount: 2 },
];

const BookmarksBar: React.FC = () => {
  return (
    <div className="p-4 bg-[#FAFAFF]" >
      <h2 className="text-xl font-bold mb-3">Bookmarks</h2>
      <div className="mb-3 border-b border-gray-300" ></div>

      <div className="space-y-3">
        {bookmarks.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {/* Image or Initial */}
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover" />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-300 text-lg font-semibold">
                {item.name.charAt(0)}
              </div>
            )}

            {/* Bookmark Details */}
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.savedCount} saved</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksBar;
