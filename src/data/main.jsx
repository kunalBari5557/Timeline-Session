import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

function App() {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const data = {
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

    setSessionData(data);
  }, []);

  return <div>{sessionData && <Timeline sessionData={sessionData} />}</div>;
}

const Timeline = ({ sessionData }) => {
  const [showTimeline, setShowTimeline] = useState(true);

  const toggleTimeline = () => setShowTimeline((prev) => !prev);

  // Dynamically generate timeline ticks between session start and end
  const generateTimelineTicks = (start, end) => {
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const ticks = [];

    let currentTime = startTime;
    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      ticks.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(1, "minute"); // Generate ticks every minute
    }

    return ticks;
  };

  const timelineTicks = generateTimelineTicks(
    sessionData.start,
    sessionData.end
  );

  return (
    <div style={styles.timelineContainer}>
      {/* Header Section */}
      <div style={styles.sessionHeader}>
        <h2 style={styles.sessionTitle}>Participants-wise Session Timeline</h2>
        <div style={styles.toggleWrapper}>
          <label style={styles.toggleLabel}>Show participant timeline</label>
          <div
            style={{
              ...styles.customToggle,
              backgroundColor: showTimeline ? "#007BFF" : "#ccc",
            }}
            onClick={toggleTimeline}
          >
            <div
              style={{
                ...styles.toggleCircle,
                transform: showTimeline ? "translateX(22px)" : "translateX(0)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Timeline */}
      <div style={styles.timeScale}>
        {timelineTicks.map((tick, index) => (
          <div key={index} style={styles.tick}>
            {tick}
          </div>
        ))}
      </div>

      {/* Participant Timelines */}
      {showTimeline &&
        sessionData.participantArray.map((participant, index) => (
          <ParticipantTimeline
            key={index}
            participant={participant}
            sessionStart={sessionData.start}
            sessionEnd={sessionData.end}
          />
        ))}
    </div>
  );
};

const ParticipantTimeline = ({ participant, sessionStart, sessionEnd }) => {
  const calculatePosition = (eventStart, sessionStart, sessionEnd) => {
    const totalDuration =
      dayjs(sessionEnd).diff(dayjs(sessionStart), "second") || 1;
    const eventOffset = dayjs(eventStart).diff(dayjs(sessionStart), "second");
    return (eventOffset / totalDuration) * 100;
  };

  const calculateDuration = (start, end) => {
    return dayjs(end).diff(dayjs(start), "minute");
  };

  const participantStartTime = participant.timelog[0]?.start;
  const participantEndTime = participant.timelog[0]?.end;
  const duration =
    participantStartTime && participantEndTime
      ? calculateDuration(participantStartTime, participantEndTime)
      : 0;

  return (
    <div style={styles.participantTimeline}>
      <div style={styles.participantHeader}>
        <div>
          <h3 style={styles.participantName}>
            {participant.name} ({participant.participantId})
          </h3>
          <p style={styles.participantDetails}>
            {dayjs(participantStartTime).format("DD MMM YYYY, HH:mm")} |
            Duration {duration} Mins
          </p>
        </div>
        <a href="#" style={styles.detailsLink}>
          View details ➡
        </a>
      </div>

      <div style={styles.timeline}>
        {Object.entries(participant.events).map(([type, events]) =>
          events.map((event, idx) => {
            const position = calculatePosition(
              event.start,
              sessionStart,
              sessionEnd
            );
            const label = dayjs(event.start).format("HH:mm");
            return (
              <div key={`${type}-${idx}`} style={{ position: "relative" }}>
                <EventIcon position={position} type={type} label={label} />
              </div>
            );
          })
        )}

        <div style={{ ...styles.logoutIcon, right: "0%" }}>🔒</div>
      </div>

      <div style={styles.timelineLabels}>
        <span>{dayjs(sessionStart).format("HH:mm")}</span>
        <span>{dayjs(sessionEnd).format("HH:mm")}</span>
      </div>
    </div>
  );
};

const EventIcon = ({ position, type, label }) => {
  const iconType = {
    video: "📹",
    mic: "🎤",
    error: "⚠️",
  };

  return (
    <>
      <div
        style={{
          ...styles.eventIcon,
          left: `${position}%`,
          backgroundColor: type === "error" ? "#ff5252" : "#3c8ef0",
        }}
      >
        {iconType[type] || "🔘"}
      </div>
      <div style={{ ...styles.eventLabel, left: `${position}%` }}>{label}</div>
    </>
  );
};

const styles = {
  timelineContainer: {
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
  },
  sessionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  sessionTitle: {
    fontSize: "18px",
    margin: 0,
  },
  toggleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  toggleLabel: {
    marginRight: "8px",
    fontSize: "14px",
  },
  customToggle: {
    width: "48px",
    height: "24px",
    borderRadius: "12px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  toggleCircle: {
    width: "20px",
    height: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    left: "2px",
    transition: "transform 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  timeScale: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    backgroundColor: "#2a2a2a",
    padding: "5px 10px",
    borderRadius: "4px",
    overflowX: "auto",
  },
  tick: {
    fontSize: "12px",
    color: "#cccccc",
    minWidth: "50px",
    textAlign: "center",
  },
  uniqueParticipants: {
    color: "#e0e0e0",
    fontSize: "14px",
  },
  toggleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  toggleLabel: {
    fontSize: "14px",
    marginRight: "10px",
    color: "#e0e0e0",
  },
  toggleButton: {
    display: "flex",
    alignItems: "center",
  },
  toggleInput: {
    width: "40px",
    height: "20px",
    backgroundColor: "#555",
    borderRadius: "10px",
    cursor: "pointer",
  },
  participantTimeline: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#1F1F1F",
    borderRadius: "8px",
    border: "1px solid #444",
  },
  participantHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: "10px",
    borderBottom: "1px solid #444",
    marginBottom: "15px",
  },
  participantName: {
    fontSize: "16px",
    color: "#fff",
  },
  participantDetails: {
    fontSize: "14px",
    color: "#e0e0e0",
    marginTop: "5px",
  },
  detailsLink: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#3c8ef0",
    textDecoration: "none",
  },
  timeline: {
    position: "relative",
    height: "60px",
    margin: "20px 0",
    borderTop: "2px solid #3c3c3c",
  },
  eventIcon: {
    position: "absolute",
    top: "-12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "2px solid #1e1e1e",
    color: "white",
    fontSize: "12px",
  },
  eventLabel: {
    position: "absolute",
    top: "40px",
    fontSize: "10px",
    color: "#a0a0a0",
    textAlign: "center",
  },
  timelineLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#8a8a8a",
  },
  logoutIcon: {
    position: "absolute",
    top: "-12px",
    right: "5%",
    backgroundColor: "#ff5252",
    color: "white",
    padding: "3px",
    borderRadius: "50%",
  },
};

export default App;
