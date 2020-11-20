import React from 'react'
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import '../styles/style.css';
import BroadcastInterface from '../interfaces/Broadcast';

interface BroadcastID {
  broadcastId: string
}

function DeleteForm () {

  // Import useHistory for redirect functionality
  const history = useHistory();

  // Creates state for delete field
  const [ newBroadcast, setNewBroadcast ] = useState<BroadcastID>({
    broadcastId: ''
  });

  // Function that saves inputs (by name attribute) to state
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    setNewBroadcast({
      ...newBroadcast,
      [evt.target.name]: value
    });
  }


  // Function to log new broadcast
  async function deleteBroadcast (broadcast: BroadcastID) {
    // Call backend API
    try {
      const response = await fetch('/api/delete-broadcast', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(broadcast) // Stringify to JSON before posting
      });
      if (response.ok) { // If response is ok (200 range)
        // Log delete message
        console.log('Broadcast deleted!');
      } else {
        // Else if error, send to error page
        history.push(`/404`);
    };
    } catch(err) {
      console.log(err);
    }
  };

  return <>

          <div className="broadcastFormContainer">
          <h3>Delete broadcast</h3>

            <form onSubmit={(e) => {

                  e.preventDefault(); /* Prevents reload of page on submit */

                  // Form validation
                  if (newBroadcast.broadcastId === '') {alert('Broadcast id required!'); return;}

                  deleteBroadcast(newBroadcast); /* Postsbroadcast to backend through createEvent function */

                  /* Clears inputs */
                  setNewBroadcast({
                    broadcastId: ''
                  });
              }}>
                  <label>
                    Broadcast id:<br></br>
                    {/* Stores input in state onChange (everytime something is typed) */}
                    <input name="broadcastId" value={newBroadcast.broadcastId} onChange={handleChange} type="text"/>
                  </label>

                  <button type="submit" value="Delete">Delete Broadcast</button>

            </form>

          </div>



        </>


}

export default DeleteForm;