import { View, Text } from 'react-native'
import React from 'react'
import ToggleSwitch from 'toggle-switch-react-native'

const DisplayMode = ({ toggleMode, handleMapMode }) => {
    console.log("toggleMode", toggleMode)
  return (
    <View>
        <ToggleSwitch
            isOn={toggleMode}
            onColor="#54B435" //map
            offColor="#E74646" //list
              label={ toggleMode ? "Go List mode" : "Go Map mode"}
            labelStyle={{ color: "#FA9884", fontWeight: "900" }}
            size="medium"
            onToggle={isOn => handleMapMode(isOn)}
        />      
    </View>
  )
}

export default DisplayMode