import React, { useState } from "react";
import dayjs from "dayjs";
import {
  FaClock,
  FaMicrophone,
  FaVideo,
} from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import { BsExclamationCircle } from "react-icons/bs";
import { Switch } from "antd";

const participants = {
  meetingId: "k7tb-chj6-9sjp",
  start: "2024-04-02T11:31:52.746Z",
  end: "2024-04-02T11:50:23.198Z",
  uniqueParticipantsCount: 4,
  participantArray: [
    {
      participantId: "vCPSzABN",
      name: "bbbn",
      events: {
        mic: [
          {
            start: "2024-04-02T11:48:01.648Z",
            end: "2024-04-02T11:48:53.973Z",
          },
          {
            start: "2024-04-02T11:48:55.204Z",
            end: "2024-04-02T11:50:23.198Z",
          },
        ],
        webcam: [
          {
            start: "2024-04-02T11:48:01.773Z",
            end: "2024-04-02T11:50:23.198Z",
          },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        {
          start: "2024-04-02T11:48:00.514Z",
          end: "2024-04-02T11:50:23.184Z",
        },
      ],
    },
    {
      participantId: "b8ddpv65",
      name: "rajan",
      events: {
        mic: [
          {
            start: "2024-04-02T11:32:32.073Z",
            end: "2024-04-02T11:32:33.637Z",
          },
          {
            start: "2024-04-02T11:32:34.167Z",
            end: "2024-04-02T11:39:12.377Z",
          },
          {
            start: "2024-04-02T11:46:15.832Z",
            end: "2024-04-02T11:46:58.161Z",
          },
          {
            start: "2024-04-02T11:47:00.616Z",
            end: "2024-04-02T11:47:34.462Z",
          },
          {
            start: "2024-04-02T11:50:05.249Z",
            end: "2024-04-02T11:50:16.633Z",
          },
        ],
        webcam: [
          {
            start: "2024-04-02T11:32:33.644Z",
            end: "2024-04-02T11:34:32.410Z",
          },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        {
          start: "2024-04-02T11:32:31.973Z",
          end: "2024-04-02T11:50:16.624Z",
        },
      ],
    },
    {
      participantId: "yOztorht",
      name: "gvv",
      events: {
        mic: [
          {
            start: "2024-04-02T11:45:54.765Z",
            end: "2024-04-02T11:46:29.265Z",
          },
          {
            start: "2024-04-02T11:46:35.207Z",
            end: "2024-04-02T11:47:17.225Z",
          },
          {
            start: "2024-04-02T11:47:26.492Z",
            end: "2024-04-02T11:47:52.095Z",
          },
        ],
        webcam: [
          {
            start: "2024-04-02T11:45:56.468Z",
            end: "2024-04-02T11:47:52.094Z",
          },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        {
          start: "2024-04-02T11:45:53.142Z",
          end: "2024-04-02T11:47:52.086Z",
        },
      ],
    },
    {
      participantId: "rilsgehg",
      name: "isha",
      events: {
        mic: [
          {
            start: "2024-04-02T11:31:54.699Z",
            end: "2024-04-02T11:39:29.768Z",
          },
          {
            start: "2024-04-02T11:39:30.763Z",
            end: "2024-04-02T11:40:03.148Z",
          },
          {
            start: "2024-04-02T11:42:54.664Z",
            end: "2024-04-02T11:43:01.313Z",
          },
          {
            start: "2024-04-02T11:43:01.449Z",
            end: "2024-04-02T11:43:20.290Z",
          },
        ],
        webcam: [
          {
            start: "2024-04-02T11:31:54.860Z",
            end: "2024-04-02T11:43:20.290Z",
          },
        ],
        errors: [
          {
            start: "2024-04-02T11:41:54.860Z",
            message: "Unable to start microphone",
          },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        {
          start: "2024-04-02T11:31:53.415Z",
          end: "2024-04-02T11:40:30.283Z",
        },
        {
          start: "2024-04-02T11:40:55.415Z",
          end: "2024-04-02T11:43:20.283Z",
        },
      ],
    },
  ],
};

function App() {
  // State to control visibility of participant details
  const [showParticipantDetails, setShowParticipantDetails] = useState(true);

  // Function to calculate time range
  const getTimeRange = (startTime, endTime) => {
    const start = dayjs(startTime);
    const end = dayjs(endTime);

    const formattedStart = start.format("DD MMMM YYYY, HH:mm");
    const durationInMinutes = end.diff(start, "minute");

    return `${formattedStart} | Duration ${durationInMinutes} Mins`;
  };

  // Function to calculate the position percentage for an event in the timeline
  const getEventPositionPercentage = (
    eventStartTime,
    eventEndTime,
    meetingStartTime,
    meetingEndTime
  ) => {
    const meetingStart = dayjs(meetingStartTime);
    const meetingEnd = dayjs(meetingEndTime);
    const eventStart = dayjs(eventStartTime);
    const eventEnd = dayjs(eventEndTime);

    const meetingDuration = meetingEnd.diff(meetingStart, "minute");
    const eventStartPercentage =
      (eventStart.diff(meetingStart, "minute") / meetingDuration) * 100;
    const eventDurationPercentage =
      (eventEnd.diff(eventStart, "minute") / meetingDuration) * 100;

    return { eventStartPercentage, eventDurationPercentage };
  };

  // Generate timeline ticks
  const generateTimelineTicks = (start, end) => {
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const ticks = [];

    let currentTime = startTime;
    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      ticks.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(1, "minute");
    }

    return ticks;
  };

  const timelineTicks = generateTimelineTicks(
    participants.start,
    participants.end
  );

  return (
    <div className="bg-[#1F1F1F] text-white pl-4 pr-4 pt-4 overflow-hidden relative">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#393939] pb-2">
        <div className="flex items-center gap-2">
          <FiClipboard className="text-white text-lg" />
          <h1 className="font-lato text-[14px] font-bold leading-[16.8px] text-left underline-from-font decoration-skip-ink-none">
            Participants wise Session Timeline
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Show participant timeline</span>
          <Switch
            defaultChecked
            onChange={() => setShowParticipantDetails(!showParticipantDetails)}
            style={{ transform: 'scale(0.75)' }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-13 gap-2">
        {/* Timeline Header */}
        <div className="col-span-13 flex justify-between text-sm border-b border-[#393939] pb-2.5 pt-2.5 text-[#666666] relative z-10">
          {timelineTicks.map((tick, index) => (
            <div key={index} className="w-[80px] text-center">
              {tick}
            </div>
          ))}
        </div>

        {showParticipantDetails && (
          <>
            {participants.participantArray?.map((participant, index) => {
              const participantStartTime = dayjs(participant.timelog[0].start);
              const participantEndTime = dayjs(participant.timelog[0].end);

              // Initialize a set to track used positions for each event type
              const usedPositions = new Set();

              const addPosition = (position) => {
                let adjustedPosition = position;
                // If the position is already used, increment by a small value to avoid overlap
                while (usedPositions.has(adjustedPosition)) {
                  adjustedPosition += 2; // Adjust gap size as needed
                }
                usedPositions.add(adjustedPosition);
                return adjustedPosition;
              };

              return (
                <div
                  key={index}
                  className="col-span-13 grid grid-cols-13 items-center gap-2 py-5 border-b border-[#393939] relative"
                >
                  {/* <div
                  key={index}
                  className="col-span-13 grid grid-cols-13 items-center gap-2 py-5 border-b border-[#393939]"
                >
                </div> */}
                  {/* Vertical Borders */}
                  <div className="absolute top-[-4px] left-[40px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[120px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[200px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[280px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[360px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[440px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[520px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[600px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[680px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[760px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[840px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[920px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[1000px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[1080px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[1160px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[1240px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[1320px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[1400px] h-full w-[0.5px] bg-[#393939]"></div>
                  <div className="absolute top-[-4px] left-[1480px] h-full w-[0.5px] bg-[#393939]"></div>

                  {/* Participant Details */}
                  <div className="col-span-3 flex justify-between items-start">
                    <div>
                      <span className="text-lg font-semibold leading-[19.2px] text-left underline-from-font decoration-skip-ink">
                        {`${participant.name
                          .charAt(0)
                          .toUpperCase()}${participant.name.slice(1)} (${participant.participantId
                          })`}
                      </span>
                      <div className="w-[253px] h-[14px] gap-0 opacity-[0.75] text-sm mt-1">
                        {getTimeRange(participantStartTime, participantEndTime)}
                      </div>
                    </div>
                  </div>

                  {/* "View details" link */}
                  <div className="col-span-10 flex justify-end items-start">
                    <a href="#" className="text-[#5568FE] text-sm mr-6">
                      View details &gt;
                    </a>
                  </div>

                  {/* Timeline */}
                  <div className="col-span-9 flex items-center relative">
                    {/* Progress Bar */}
                    <div className="w-full h-[4px] bg-[#5568FE] absolute left-0 top-1/2 transform -translate-y-1/2"></div>

                    {/* Render Event Icons */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center">
                      {/* Render Mic Events */}
                      {participant.events.mic?.map((micEvent, eventIndex) => {
                        const {
                          eventStartPercentage,
                          eventDurationPercentage,
                        } = getEventPositionPercentage(
                          micEvent.start,
                          micEvent.end,
                          participants.start,
                          participants.end
                        );

                        const adjustedPosition =
                          addPosition(eventStartPercentage);

                        return (
                          <div
                            key={eventIndex}
                            className="absolute"
                            style={{
                              left: `${adjustedPosition}%`,
                              width: `${eventDurationPercentage}%`,
                              top: "-12px",
                            }}
                          >
                            <div className="w-[25px] h-[25px] rounded-full bg-[#5568FE] flex items-center justify-center text-white z-10">
                              <FaMicrophone />
                            </div>
                          </div>
                        );
                      })}

                      {/* Render Webcam Events */}
                      {participant.events.webcam?.map(
                        (webcamEvent, eventIndex) => {
                          const {
                            eventStartPercentage,
                            eventDurationPercentage,
                          } = getEventPositionPercentage(
                            webcamEvent.start,
                            webcamEvent.end,
                            participants.start,
                            participants.end
                          );

                          const adjustedPosition =
                            addPosition(eventStartPercentage);

                          return (
                            <div
                              key={eventIndex}
                              className="absolute"
                              style={{
                                left: `${adjustedPosition}%`,
                                width: `${eventDurationPercentage}%`,
                                top: "-12px",
                              }}
                            >
                              <div className="w-[25px] h-[25px] rounded-full bg-[#5568FE] flex items-center justify-center text-white z-10">
                                <FaVideo />
                              </div>
                            </div>
                          );
                        }
                      )}

                      {/* Render Error Events */}
                      {participant.events.errors?.map(
                        (errorEvent, eventIndex) => {
                          const {
                            eventStartPercentage,
                            eventDurationPercentage,
                          } = getEventPositionPercentage(
                            errorEvent.start,
                            errorEvent.start, // Error events might be a single point in time
                            participants.start,
                            participants.end
                          );

                          const adjustedPosition =
                            addPosition(eventStartPercentage);

                          return (
                            <div
                              key={eventIndex}
                              className="absolute"
                              style={{
                                left: `${adjustedPosition}%`,
                                width: `${eventDurationPercentage}%`,
                                top: "-12px",
                              }}
                            >
                              <div className="w-[25px] h-[25px] rounded-full bg-[#F17676E5] flex items-center justify-center text-white z-10">
                                <BsExclamationCircle />
                              </div>
                            </div>
                          );
                        }
                      )}

                      {/* Render Timelog Events */}
                      {participant.timelog?.map((timeLogEvent, eventIndex) => {
                        const {
                          eventStartPercentage,
                          eventDurationPercentage,
                        } = getEventPositionPercentage(
                          timeLogEvent.start,
                          timeLogEvent.end,
                          participants.start,
                          participants.end
                        );

                        const adjustedPosition =
                          addPosition(eventStartPercentage);

                        return (
                          <div
                            key={eventIndex}
                            className="absolute"
                            style={{
                              left: `${adjustedPosition}%`,
                              width: `${eventDurationPercentage}%`,
                              top: "-12px",
                            }}
                          >
                            <div className="w-[25px] h-[25px] rounded-full bg-gray-500 flex items-center justify-center text-white z-10">
                              <FaClock />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              );
            })}
          </>
        )}
        {/* Participant Rows */}
      </div>
    </div>
  );
}

export default App;
