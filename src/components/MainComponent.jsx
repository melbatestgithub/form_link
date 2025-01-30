import React, { useState } from "react";
import Rate from "./Rate";
import Comment from "./Comments";
import Comment2 from './Comment2'
import EditComment from './EditComment'
import Picture from "./Pictures";
import TakePhoto from "./TakePhoto";
import SelectedPhoto from "./SelectedPhoto";
import MultiSelectPhoto from "./MultiSelectPhoto";
import SendingEmail from "./SendingEmail";
import ThankYou from "./ThankYou";
import Video from "./Video";
import RecordVideo from "./RecordVideo";
import StartVideo from "./StartVideo";
import SubmitVideo from "./SubmitVideo";
const MainComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, component: <Rate onNext={() => setCurrentStep(2)} /> },
    { id: 2, component: <Comment onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} /> },
    { id: 4, component: <Comment2 onBack={() => setCurrentStep(2)} onNext={() => setCurrentStep(4)} /> },
    { id: 5, component: <EditComment onBack={() => setCurrentStep(3)} onNext={() => setCurrentStep(5)} /> },
    { id: 6, component: <SendingEmail onBack={() => setCurrentStep(4)} onNext={() => setCurrentStep(6)} /> },
    { id: 7, component: <ThankYou onBack={() => setCurrentStep(1)}/> },
    { id: 8, component: <Rate  onNext={() => setCurrentStep(2)} /> },
    { id: 9, component: <SendingEmail onBack={() => setCurrentStep(4)} onNext={() => setCurrentStep(6)} /> },
 
  ];

  return (
    <div>
      {steps.map((step) => {
        return step.id === currentStep ? step.component : null;
      })}
    </div>
  );
};

export default MultiStepForm;
