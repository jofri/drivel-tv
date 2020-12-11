
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import '../styles/style.css';

function BroadcastForm () {

  // Import useHistory for redirect functionality
  const history = useHistory();

  // Creates new joined state for all input feilds
  const [ newBroadcast, setNewBroadcast ] = useState({
    title: '',
    description: '',
    tags: '',
    owner: '',
    isReversed: false,
    youtubePlaylists: '',
  });


  // Function that saves the different inputs (by name attribute) to state
  function handleChange(evt) {
    const value = evt.target.value;
    setNewBroadcast({
      ...newBroadcast,
      [evt.target.name]: value
    });
  }

  // Function that saves checkbox input to state
  function handleChangeCheckbox(evt) {
    let value;
    if (evt.target.value === 'false') value = true;
    else value = false;
    setNewBroadcast({
      ...newBroadcast,
      isReversed: value
    });
  };

  // Function to log new broadcast
  async function createBroadcast (broadcast) {
    // Call backend API
    try {
      const response = await fetch('/api/create-broadcast', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(broadcast) // Stringify to JSON before posting
      });
      if (response.ok) { // If response is ok (200 range)
        const broadcastObj = await response.json(); // Parse JSON response

        // Redirect user to new broadcast page
        history.push(`/b/${broadcastObj.broadcastId}`);

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
          <h3>Create a new broadcast</h3>

            <form data-testid='form' onSubmit={(e) => {

                  e.preventDefault(); /* Prevents reload of page on submit */

                  // Form validation
                  if (newBroadcast.title === '') {alert('Title required!'); return;}
                  if (newBroadcast.owner === '') {alert('Owner field required!'); return;}
                  if (newBroadcast.youtubePlaylists === '') {alert('You have not specefied any youtube playlists!'); return;}

                  createBroadcast(newBroadcast); /* Postsbroadcast to backend through createEvent function */

                  /* Clears inputs */
                  setNewBroadcast({
                    title: '',
                    description: '',
                    tags: '',
                    owner: '',
                    youtubePlaylists: '',
                    isReversed: false,
                  });
              }}>
                  <label>
                    Broadcast name:<br></br>
                    {/* Stores input in state onChange (everytime something is typed) */}
                    <input data-testid='title' name="title" value={newBroadcast.title} onChange={handleChange} type="text"/>
                  </label>
                  <br></br>
                  <br></br>
                  <label>
                    Description:<br></br>
                    {/* Stores input in state onChange (everytime something is typed) */}
                    <input name="description" value={newBroadcast.description} onChange={handleChange} type="text"/>
                  </label>
                  <br></br>
                  <br></br>
                  <label>
                    Tags:<br></br>
                    {/* Stores input in state onChange (everytime something is typed) */}
                    <input name="tags" value={newBroadcast.tags} onChange={handleChange} type="text"/>
                  </label>
                  <br></br>
                  <br></br>
                  <label>
                    Owner:<br></br>
                    {/* Stores input in state onChange (everytime something is typed) */}
                    <input data-testid='owner' name="owner" value={newBroadcast.owner} onChange={handleChange} type="text"/>
                  </label>
                  <br></br>
                  <br></br>
                  <label>
                    Playlists:<br></br>
                    {/* Stores input in state onChange (everytime something is typed) */}
                    <input data-testid='url' name="youtubePlaylists" value={newBroadcast.youtubePlaylists} onChange={handleChange} type="text"/>
                  </label>
                  <br></br>
                  <br></br>
                  <label>
                    Want to reverse the queue order of the playlists?&nbsp;&nbsp;&nbsp;
                    {/* Stores input in state onChange (everytime something is typed) */}
                    <input name="isReversed"  value={newBroadcast.isReversed} onChange={handleChangeCheckbox} type="checkbox"/>
                  </label>
                  <br></br>
                  <br></br>

                  <button type="submit" value="Create">Create Broadcast</button>

            </form>

          </div>



        </>


}

export default BroadcastForm;