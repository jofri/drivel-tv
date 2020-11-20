import React from 'react';

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
import { apiGetAllBroadcasts } from './services/apiService';
import BroadcastInterface from './interfaces/Broadcast';

function App() {

  const [broadcast, setBroadcast] = useState<BroadcastInterface | null>(null);
  const [broadcastUrl, setBroadcastUrl] = useState<string>('/b/:broadcast');
  const [allBroadcastObjects, setAllBroadcastObjects] = useState<BroadcastInterface[] | boolean>([]);

  // Refactored: Now the fetch function is in the apiServices.ts
  // now this function just: makes the API request, set the broadcast Object
  // If response is falsy, sets it to 404
  const getAllBroadcasts = async (): Promise<void> => {
    try {
      const response = await apiGetAllBroadcasts();
      console.log(response);
      if (!response) {
        setBroadcastUrl('/404');
        return;
      };
      setAllBroadcastObjects(response);
    } catch (err) {
      console.error(err);
    }
  }

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

  // Function to get broadcast from backend server
  async function getBroadcast (id:string) {
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
