import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-zinc-100 border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <section className="space-y-6">
          <p className="text-3xl font-bold text-orange-700">TravelTaste</p>
          <p className="text-zinc-600">
            © 2026 TravelTaste. Your vibrant concierge for culinary adventures
            and effortless travel.
          </p>
        </section>

        <section className="space-y-4">
          <h4 className="font-bold">Khám phá</h4>
          <ul className="space-y-2 text-zinc-600">
            <li>
              <a href="#" className="hover:text-orange-700">
                Explore Destinations
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-700">
                Top Culinary Spots
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h4 className="font-bold">Cá nhân</h4>
          <ul className="space-y-2 text-zinc-600">
            <li>
              <a href="#" className="hover:text-orange-700">
                My Itinerary
              </a>
            </li>
            <li>
              <Link href="/profile" className="hover:text-orange-700">
                Favorites
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h4 className="font-bold">Liên hệ</h4>
          <p className="flex gap-4">
            <span className="material-symbols-outlined text-orange-700 cursor-pointer">
              public
            </span>
            <span className="material-symbols-outlined text-orange-700 cursor-pointer">
              mail
            </span>
            <span className="material-symbols-outlined text-orange-700 cursor-pointer">
              share
            </span>
          </p>
        </section>
      </div>
    </footer>
  );
}
