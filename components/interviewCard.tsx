import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

const interviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstacK,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  //If someone says technical and another type of interview it will return Mixed
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 q-fit px-4 py-2 rounded-bl-lg bg-gray-600">
            <p className="badge-text">{normalizedType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
              />
              <p>{formattedDate}</p>

              <div className="flex flex-row gap-2">
                <Image src="/star.svg" alt="star" width={22} height={22} />
                <p>{feedback?.totalScore || "---"}/100</p>
              </div>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {" "}
            {feedback?.finalAssessment ||
              "You havent taken the interview yet. Take it to improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/interviewId`
              }
            >
              {feedback ? "Check feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default interviewCard;
