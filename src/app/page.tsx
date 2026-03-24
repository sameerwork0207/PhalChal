import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white relative overflow-hidden">
      {/* Watermark Logo */}
      <div className="absolute inset-x-0 top-10 md:top-20 z-0 flex items-center justify-center opacity-15 pointer-events-none">
        <Image src="/logo.png" alt="Watermark" width={1000} height={1000} className="object-contain mix-blend-multiply" priority />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Fresh from Farm, to your Hostel.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            फलचल bridges the gap between rural farmers and college students. 
            Get fresh, affordable vegetables, fruits, and dairy delivered twice daily.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/products"
              className="rounded-lg bg-green-600 px-8 py-4 text-xl font-bold text-white shadow-lg hover:bg-green-500 hover:scale-105 transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Order Now
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50/90 relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Deliveries Fast</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need, twice daily
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose between morning (8 AM) and evening (6 PM) delivery slots. Picked up from farmers to your doorstep in hours.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Fair Prices
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  By removing middlemen, farmers earn more and you pay less. Standard 8% platform fee only.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  Freshness Guaranteed
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Produce is collected fresh from villages (Dhamori, Pohegaon, etc.) right before delivery.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
