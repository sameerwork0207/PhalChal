import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-2xl lg:text-center mb-20">
          <h2 className="text-base font-semibold leading-7 text-green-600">Our Story</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About फलचल
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are built on a passion for bringing fresh, affordable produce directly from rural farms 
            to college students, ensuring quality while fostering community growth.
          </p>
        </div>

        {/* 1. Founders Section */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 border-b pb-4">1. Founders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-4">SS</div>
              <h4 className="text-xl font-bold text-gray-900">Sameer Shaikh</h4>
              <p className="text-gray-600 mt-2">Co-Founder, Visionary</p>
              <p className="text-sm text-gray-500 mt-4">Driving the platform&apos;s technical excellence and business strategy to bridge the gap between farms and dorms.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-4">UP</div>
              <h4 className="text-xl font-bold text-gray-900">Unnati Pachore</h4>
              <p className="text-gray-600 mt-2">Co-Founder, Operations</p>
              <p className="text-sm text-gray-500 mt-4">Focusing on operational efficiency and maintaining strong relationships with our farmer network.</p>
            </div>
          </div>
        </section>

        {/* 2. Farmers Section */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 border-b pb-4">2. Our Beloved Farmers</h3>
          <p className="text-gray-600 mb-8 max-w-2xl">Our gratitude goes to the hardworking farmers from nearby Maharashtrian villages who nurture the land and provide us with fresh, healthy produce.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Vishwas Deshmukh", "Shantaram Patil", "Vishal Gavhane"].map((farmer, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{farmer}</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Partner Farmer</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Supplying fresh fruits, vegetables, and daily essentials with love from the village.</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Delivery Partners Section */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 border-b pb-4">3. Delivery Partners</h3>
          <div className="bg-green-50 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center">
            <svg className="w-16 h-16 text-green-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">The Heroes on the Move</h4>
            <p className="text-lg text-gray-700 max-w-2xl text-center">
              Our dedicated delivery partners ensure that the freshness of the farm reaches your dorm rooms exactly when you need it. 
              Twice a day, every day, they brave the roads so we can eat healthy and stay healthy. We deeply appreciate their support and love for making this initiative a success!
            </p>
          </div>
        </section>

        {/* 4. Our Customers (with reviews) */}
        <section>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 border-b pb-4">4. Our Customers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul T.", review: "ফলचल literally changed my hostel life. Fresh fruits every morning! \u2B50\u2B50\u2B50\u2B50\u2B50" },
              { name: "Priya M.", review: "Affordable and direct from farmers. The delivery partners are always on time. Love it! \u2B50\u2B50\u2B50\u2B50\u2B50" },
              { name: "Karan S.", review: "Such a great initiative. The quality of vegetables is unmatched compared to local markets. \u2B50\u2B50\u2B50\u2B50\u2B50" }
            ].map((customer, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <p className="text-gray-600 italic mb-6 flex-grow">"{customer.review}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {customer.name.charAt(0)}
                  </div>
                  <h5 className="font-semibold text-gray-900">{customer.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
