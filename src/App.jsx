import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Feedback from './pages/Feedback'
import Comment from './components/Comments'
import Comment2 from './components/Comment2'
import EditCom from './components/EditComment'
import Picture from './components/Pictures'
import TakePhoto from './components/TakePhoto'
import SelectedPhoto from './components/SelectedPhoto'
import MultiSelectPhoto from './components/MultiSelectPhoto'
import SendingEmail from './components/SendingEmail'
import ThankYou from './components/ThankYou'
import Video from './components/Video'
import RecordVideo from './components/RecordVideo'
import StartVideo from './components/StartVideo'
import SubmitVideo from './components/SubmitVideo'
import SubmitEmailPic from './components/SubmitEmailPic'
import SubmitEmailVid from './components/SubmitEmailVid'
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";
import i18n from './i18n'
function App() {
 
  return (
    <I18nextProvider i18n={i18n}>
    <Router>
      <Routes>
       <Route path='/' element={<Feedback/>}/>
       <Route path='/feedback' element={<Feedback/>}/>
       <Route path='/comment' element={<Comment/>}/>
       <Route path='/comment2'    element={<Comment2/>}/>
       <Route path='/editcomment' element={<EditCom/>}/>
       <Route path='/picture' element={<Picture/>}/>
       <Route path='/TakePhoto' element={<TakePhoto/>}/>
       <Route path='/selectedphoto' element={<SelectedPhoto/>}/>
       <Route path='/MultiSelectPhoto' element={<MultiSelectPhoto/>}/>
       <Route path='/SendingEmail' element={<SendingEmail/>}/>
       <Route path='/ThankYou' element={<ThankYou/>}/>
       <Route path='/video' element={<Video/>}/>
       <Route path='/RecordVideo' element={<RecordVideo/>}/>
       <Route path='/StartVideo' element={<StartVideo/>}/>
       <Route path='/SubmitVideo' element={<SubmitVideo/>}/>
       <Route path='/SubmitEmailPic' element={<SubmitEmailPic/>}/>
       <Route path='/SubmitEmailVid' element={<SubmitEmailVid/>}/>
      </Routes>
    </Router>
    </I18nextProvider>

  )
}

export default App
