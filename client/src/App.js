import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import './styles/style.css';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Broadcast from './components/Broadcast';
import Broadcastform from './components/Broadcastform';
import FourOFour from './components/404';
import DeleteForm from './components/Deleteform';



function App() {

  const [broadcast, setBroadcast] = useState({});
  const [broadcastUrl, setBroadcastUrl] = useState('/b/:broadcast');
  const [allBroadcastObjects, setAllBroadcastObjects] = useState([]);


  return (
    <Router>
      <Navbar/>
      <div className="content">
      <Switch>
        <Route exact path='/'> {/* If user visits root, redict to homepage */}
          <Homepage allBroadcasts={allBroadcastObjects} getAllBroadcasts={getAllBroadcasts}/>
        </Route>
        <Route exact path="/create-broadcast">
          <Broadcastform/>
        </Route>
        <Route exact path="/delete-broadcast">
          <DeleteForm/>
        </Route>
        <Route exact path={broadcastUrl}> {/* If user visits broadcast page, check if broadcast exists in db - else, redirect to 404*/}
          <Broadcast broadcast={broadcast} getBroadcast={getBroadcast}/>
        </Route>
        <Route exact path='/404'> {/* Specify 404 route */}
          <FourOFour/>
        </Route>
        <Route path='/'> {/* If user visits any page not specified, redirect to 404 */}
          <FourOFour/>
        </Route>
      </Switch>
      </div>
    </Router>
  )



 // Function to get all broadcasts from backend server
 async function getAllBroadcasts () {
  // Call backend API
  try {
    const response = await fetch('/api/get-all-broadcasts');
    if (response.ok) { // If response is ok (200 range)
      const allBroadcastObjects = await response.json(); // Parse JSON response
      setAllBroadcastObjects(allBroadcastObjects); // Set array of broadcast objects as state
    } else { setBroadcastUrl('/404');}; // Else if no broadcasts, send user to 404
  } catch (err) {
    console.log(err);
  }
 };

  // Function to get broadcast from backend server
  async function getBroadcast (id) {
    // Call backend API
    try {
      const response = await fetch('/api/get-broadcast', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"broadcastId": id}) // Stringify to JSON before posting
      });
      if (response.ok) { // If response is ok (200 range)
        const broadcastObj = await response.json(); // Parse JSON response
        setBroadcast(broadcastObj); // Set broadcast object as state
      } else { setBroadcastUrl('/404');}; // Else if broadcast does not exist in DB, send user to 404
    } catch (err) {
      console.log(err);
    }
  };

}

export default App;
