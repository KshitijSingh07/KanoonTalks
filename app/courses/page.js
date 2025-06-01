import CourseCard from '../componets/CourseCard';
import { connectToDatabase } from '../lib/mongodb';
import Course from '../model/Course';

export const revalidate = 0;  // Disable caching to always fetch fresh data

const CoursesPage = async () => {
  await connectToDatabase();

  const courses = (await Course.find({}).lean()) || [];

  return (
    <div
      className="min-h-screen py-10 px-6 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-section-bg)',
        color: 'var(--color-primary-text)',
      }}
    >
      <h1
        className="text-3xl font-bold text-center mb-10"
        style={{ color: 'var(--color-primary-text)' }}
      >
        Our Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard
              key={course._id}
              title={course.title}
              description={course.description}
              image={course.image}
              price={course.price}
              link={`/courses/${course._id}`}
            />
          ))
        ) : (
          <p
            className="text-center"
            style={{ color: 'var(--color-paragraph-text)' }}
          >
            No courses available at the moment.&nbsp;
            Coming soon...
          </p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
