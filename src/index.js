import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import MemberSearch from './routes/Search';
import Inbox from './routes/Inbox';
import ClaimList from './routes/ClaimList';
import NotFound from "./routes/NotFound.js";
import ClaimDetails from './routes/ClaimDetails';
import MemberDetails from './routes/MemberDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="Login" element={<Login />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Search" element={<MemberSearch />} />
        <Route path="Inbox" element={<Inbox />} />
        <Route path="ClaimList" element={<ClaimList />} />
        <Route path="ClaimList/:claimId" element={<ClaimDetails />} />
        <Route path="Search/:memberId" element={<MemberDetails />} />
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  </BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
