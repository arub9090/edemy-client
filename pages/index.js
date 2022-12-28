import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../component/Cards/CourseCard";

function index({ courses }) {
  return (
    <>
      <h1 className="jumbotron bg-primary squre text-center display-4">
        Welcome to Edemy!
      </h1>
      <div className="container-fluid">
        <div className="row pt-2">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard key={course._id} course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}
export default index;
