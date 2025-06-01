"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

const CoursePage = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const { data } = await axios.get(`/api/course/${params.id}`);
      setCourse(data);
    };

    const checkAccess = async () => {
      const { data } = await axios.post("/api/check-access", {
        courseId: params.id,
      });
      setAllowed(data.allowed);
    };

    fetchCourse();
    if (user) checkAccess();
  }, [params.id, user]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <img src={course.image} alt={course.title} className="mb-4" />
      <p className="mb-4 text-gray-700">{course.description}</p>

      {allowed ? (
        <div className="border p-4 rounded bg-gray-100">
          <h2 className="text-xl font-semibold">Full Content</h2>
          <p>{course.content}</p>
        </div>
      ) : (
        <p className="text-red-500">You must buy this course to view full content.</p>
      )}
    </div>
  );
};

export default CoursePage;
