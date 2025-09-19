import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/interviewCard";

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get interview ready</h2>
          <p className="text-lg">Practice on real interview questions</p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an interview</Link>
          </Button>

          <section className="flex flex-col gap-6 mt-8">
            <h2>Your interviews</h2>

            <div className="interviews-section flex gap-4 overflow-x-auto">
              {dummyInterviews.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))}
            </div>
            {/* <div className="interviews-section">
              <p>You haven&apos;t taken any interviews yet</p>
            </div> */}
          </section>

          <section className="flex flex-col gap-6 mt-8">
            <h2>Take an interview</h2>

            <div className="interviews-section">
              {dummyInterviews.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))}
              {/* <p>There are no interviews available</p> */}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default page;
