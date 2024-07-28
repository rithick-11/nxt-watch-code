import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Trending from './Pages/Trending'
import Gaming from './Pages/Gaming'
import SavedVideos from './Pages/SavedVideos'
import NxtVideoDetial from './Pages/NxtVideoDetial'
import NotFound from './Pages/NotFound'

import NxtWatchContext from './contexts/NxtWatchContext'
import './App.css'

class App extends Component {
  state = {dark: false, saveList: []}

  setDark = () => {
    this.setState(pre => ({dark: !pre.dark}))
  }

  setSaveList = video => {
    const {saveList} = this.state
    const isPresent = saveList.some(each => each.id === video.id)
    if (isPresent) {
      console.log('exist on save list')
      this.setState(pre => ({
        saveList: pre.saveList.filter(each => each.id !== video.id),
      }))
    } else {
      this.setState(pre => ({saveList: [...pre.saveList, video]}))
    }
  }

  render() {
    const {dark, saveList} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          dark,
          saveList,
          setDark: this.setDark,
          setSaveList: this.setSaveList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={NxtVideoDetial} />
          <ProtectedRoute component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
