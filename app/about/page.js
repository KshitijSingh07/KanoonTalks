import Image from "next/image";

export default function AboutUs() {
  return (
    <main className="w-full text-gray-500 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold dark:text-amber-900 mb-12 text-center">About Us</h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
          {/* Author Image - Left */}
          <div className="w-full md:w-[300px] flex flex-col items-center text-center">
            <Image
              src="/20220218_140656.jpg"
              alt="Aakanksha Yadav"
              width={280}
              height={280}
              className="rounded-full object-cover border-4 border-blue-300 shadow-lg"
            />
            <div className="mt-4 flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-gray-800">Aakanksha Yadav</h3>
              <p className="text-sm text-gray-500">Founder, KanoonTalks</p>
              <p className="text-sm text-gray-500">BB.A-LL.B (BBAU, Lucknow)</p>
            </div>
          </div>


          {/* Text Content - Right */}
          <div className="flex-1 text-lg space-y-6">
            <p>
              <strong>KanoonTalks</strong> is a dynamic legal platform dedicated to empowering law students, professionals, and researchers. Our mission is to foster legal awareness, encourage academic collaboration, and provide a space to share valuable insights into the ever-evolving legal world.
            </p>
            <p>
              Users can explore and contribute legal articles, research papers, case summaries, and current legal developments. By combining practical insights with academic depth, KanoonTalks becomes a valuable hub for anyone seeking to engage with the legal community and stay informed.
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 pt-4">About the Author</h2>
            <p>
              <strong>Aakanksha Yadav</strong>, the founder and author of KanoonTalks, is a law graduate who earned her BB.A-LL.B degree from <strong>Babasaheb Bhimrao Ambedkar University (BBAU)</strong>, Lucknow, Uttar Pradesh. With a passion for legal education and reform, she created KanoonTalks to make legal knowledge accessible and collaborative.
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 pt-4">Our Vision</h2>
            <p>
              We aim to create a community-driven platform where individuals from across the legal spectrum can learn, share, and grow together bridging the gap between academic knowledge and real-world legal practice.
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 pt-4">Get Involved</h2>
            <p>
              Whether you're a student looking to publish your first article, a researcher sharing your work, or a practitioner sharing experience KanoonTalks welcomes you. Join us in building a richer legal knowledge base for all.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
