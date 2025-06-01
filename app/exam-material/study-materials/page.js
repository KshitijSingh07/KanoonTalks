import { connectToDatabase } from "../../lib/mongodb";
import StudyMaterial from "../../model/StudyMaterial";

export const metadata = {
  title: "Study Materials - KanoonTalks",
  description: "Access legal study materials and resources.",
};

export default async function StudyMaterialPage() {
  await connectToDatabase();

  const materials = await StudyMaterial.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Study Materials</h1>

      {materials.length === 0 ? (
        <p className="text-center text-gray-600">No study materials available.</p>
      ) : (
        <ul className="space-y-6">
          {materials.map((material) => (
            <li
              key={material._id.toString()}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{material.title}</h2>
              {material.description && (
                <p className="mb-2 text-gray-700">{material.description}</p>
              )}
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Access Material
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
