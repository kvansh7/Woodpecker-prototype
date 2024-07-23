import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage'
import HomePage from './pages/HomePage';
import RetailerPage from './pages/RetailerPage';
import FetchEmail from './pages/FetchEmail';
import UploadPageSales from './pages/UploadPageSales';
import Dashboard from './pages/Dashboard';
import Talk from './pages/Talk';
import SpeechPage from './pages/SpeechPage';
import MLPage from './pages/MlPage';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/UploadBill" element={<UploadPage />}/>
      <Route path="/RetailerPage" element={<RetailerPage/>}/>
      <Route path='/FetchEmail' element={<FetchEmail/>}/>
      <Route path='/UploadSales' element={<UploadPageSales/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Talk' element={<Talk/>}/>
      <Route path='/Speech' element={<SpeechPage/>}/>
      <Route path ='/ML' element={<MLPage/>}/>
      </Routes>
      </Router>
    </div>
  )
}

export default App
