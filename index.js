import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Protected from './components/Protected';
import LoginHome from './pages/LoginHome';
import MakeGames from './pages/MakeGames';
import CreateNewGame from './pages/CreateNewGame';
import GameEdit682 from './pages/GameEdit682';
import GameEditNew from './pages/GameEditNew';
import Scroll from './pages/Scroll';
import PlayDetails from './pages/PlayDetails';
import PlayGame from './pages/PlayGame';
import UsersGamesPage from './pages/UsersGamesPage';
import PublishedGamesPage from './pages/PublishedGamesPage';
import GameEdit from './pages/GameEdit';

// The original static version of MakeGames.js has been commented out below and replaced with the dynamic version.
// The original static version of Scroll.js has been commented out below and replaced with the dynamic version.

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="loginhome" element={<LoginHome />} />
      <Route path="make-games" element={<UsersGamesPage />} /*element={<MakeGames />} *//>
      <Route path="create-new-game" element={<CreateNewGame />} />
      <Route path="game-edit602" element={<GameEdit682 />} />
      <Route path="game-edit-new" element={<GameEditNew />} />
      <Route path="edit-game/:gameId" element={<GameEdit />} />
      <Route path="scroll" element={<PublishedGamesPage />} /*element={<Scroll />} */ />
      <Route path="play-details" element={<PlayDetails />} />
      <Route path="play-game" element={<PlayGame />} />
      {/* <Route path="/" element={<Home />} > */}
        {/* <Route path="/" index element={<Home />} /> */}
        {/* <Route path="/" index element={<LoginHome />} /> */}
      {/* </Route> */}
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
