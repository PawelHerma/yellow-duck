import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
     
     
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          
          handleSubmit={handleSubmit}
        />
      
       
    
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  


}

export default Customizer