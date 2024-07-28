import React from 'react'

const NxtWatchContext = React.createContext({
  dark: false,
  setDark: () => {},
  saveList: {},
  setSaveList: () => {},
})

export default NxtWatchContext
