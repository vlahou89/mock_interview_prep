import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true;
  const callStatus = CallStatus.FINISHED;
  const messages = ["what is your name?", "may name is rita"];
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>

          <h3>AI interviewer</h3>
        </div>

        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/user-avatar.png"
              alt="vapi"
              width={540}
              height={540}
              className="object-cover rounded-full size-[120px]"
            />
          </div>

          <h3>{userName}</h3>
        </div>
      </div>

      <div className="transcript-border">
        {messages.length > 0 && (
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={
                (cn("absolute animate-ping rounded-full opacity-75"),
                (callStatus !== "CONNECTING") & "hidden")
              }
            />
            <span>
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End</button>
        )}
      </div>
    </>
  );
};

export default Agent;
