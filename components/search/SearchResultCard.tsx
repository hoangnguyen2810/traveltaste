type Props = {
  title: string;
  description: string;
  price: string;
  rating: string;
  category: string;
  image: string;
};

export default function SearchResultCard({
  title,
  description,
  price,
  rating,
  category,
  image,
}: Props) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-soft transition-transform duration-300 hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-lg px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
          <span className="text-xs text-white font-medium">{category}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-semibold text-zinc-900">{title}</h3>
          <div className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-md">
            <span
              className="material-symbols-outlined text-orange-700 text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-sm font-semibold text-zinc-900">{rating}</span>
          </div>
        </div>
        <p className="text-zinc-600 mb-6">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-orange-700">{price}</span>
          <button
            type="button"
            className="p-2 bg-zinc-100 text-blue-800 rounded-full hover:bg-blue-800 hover:text-white transition-colors active:scale-90"
            aria-label="Lưu yêu thích"
          >
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </div>
    </article>
  );
}
