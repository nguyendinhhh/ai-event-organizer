import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventListingPage from "./EventListingPage";

const EventPageContainer = () => {
  /**
   * the EventPage component uses the useParams hook from React Router to extract the eventId parameter from the URL
   * It then makes a GET request to the server to fetch the event data using the eventId
   */
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const baseUrl = "http://localhost:3000"; // This can be changed once there exist an official domain

  useEffect(() => {
    // Fetch the event data from the server using the eventId
    fetch(`http://localhost:8000/event/${eventId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch event data");
        }
      })
      .then((data) => {
        setEvent(data);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error appropriately
      });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const { imageUrl, description, eventTitle } = event;

  return (
    <EventListingPage url={`${baseUrl}/event/${eventId}`} title={eventTitle} img={imageUrl} description={description} />
  );
}

export default EventPageContainer;
