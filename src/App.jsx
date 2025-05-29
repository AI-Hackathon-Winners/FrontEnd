import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/usersComponents/dashboard";
import Leads from './pages/usersComponents/leads';
import Email from './pages/usersComponents/email';
import FollowUp from './pages/usersComponents/followUp';
import Analytics from './pages/usersComponents/analytics';
import LeadScoring from './pages/usersComponents/leadScoring';
import Invoice from './pages/usersComponents/invoice';
import Settings from './pages/settings';
import Unauthorized from './pages/unauthorized';
import PrivateRoute from './components/companySocials';
import AdminDashboard from './pages/adminComponents/adminDashboard';
import AdminUsers from './pages/adminComponents/adminUsers';
import AdminAnalytics from './pages/adminComponents/adminAnalytics';
import AdminSettings from './pages/adminComponents/adminSettings';
import AdminLeads from './pages/adminComponents/adminLeads';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },

  // ✅ Protected routes (for users)
  {
    path: '/dashboard',
    element:
     
         <Dashboard />
     
       
    
  },
  {
    path: '/leads',
    element:
      
        <Leads />
     
    
  },
  {
    path: '/email',
    element:
        <Email />
     
  },
  {
    path: '/followUp',
    element: 
        <FollowUp />
     
  },
  {
    path: '/analytics',
    element: 
     
        <Analytics />
      
  },
  {
    path: '/leadScoring',
    element: 
        <LeadScoring />
     
  },
  {
    path: '/invoice',
    element: 
        <Invoice />
      
  },
  {
    path: '/settings',
    element: 
     
        <Settings />
     
  },

  // 🔒 Unauthorized access page
  {
    path: '/unauthorized',
    element: <Unauthorized/>
  },

  // 🧑‍💼 Admin-only pages
{
  path: '/adminDashboard',
  element: 
    
      <AdminDashboard/>
    
  
},
{
  path: '/adminUsers',
  element: 
    
      <AdminUsers/>
   
 
},
{
  path: '/adminLeads',
  element: 
    
      <AdminLeads/>
   
 
},
{
  path: '/adminAnalytics',
  element: 
      <AdminAnalytics/>
    
  
},
{
  path: '/adminSettings',
  element:
      <AdminSettings/>
    
  
},

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
