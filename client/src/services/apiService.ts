import Broadcast from "../interfaces/Broadcast";

// Function to get all broadcasts from backend server
export async function apiGetAllBroadcasts (): Promise<Broadcast[] | boolean | undefined> {
  // Call backend API
  try {
    const response: Response = await fetch('/api/get-all-broadcasts');
    if (response) { // If response is ok (200 range)
      const allBroadcastObjects: Broadcast[] = await response.json(); // Parse JSON response
      return allBroadcastObjects
      // setAllBroadcastObjects(allBroadcastObjects); // Set array of broadcast objects as state
    } else { return false;}; // Else if no broadcasts, send user to 404
  } catch (err) {
    console.log(err);
  }
 };


  // Function to get broadcast from backend server
  export async function apiGetBroadcast (id:string): Promise<Broadcast | boolean | undefined> {
    // Call backend API
    try {
      const response: Response = await fetch('/api/get-broadcast', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"broadcastId": id}) // Stringify to JSON before posting
      });
      if (response) { // If response is ok (200 range)
        const broadcastObj: Broadcast = await response.json(); // Parse JSON response
        return broadcastObj;
        // setBroadcast(broadcastObj); // Set broadcast object as state
      } else { return false;}; // Else if broadcast does not exist in DB, send user to 404
    } catch (err) {
      console.log(err);
    }
  };