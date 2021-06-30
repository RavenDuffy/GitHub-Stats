import { HomeLayout } from "./pages/HomeLayout";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { getConfig } from './config.local'


const config = getConfig()

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/svg/:gitId' component={() => {
          const WLPath = window.location.pathname.split('/')
          window.location.href = `${config.hosts.back}/svg/${WLPath[WLPath.length - 1]}`

          return null
        }}/>
        <Route path='/'>
          <div className="App">
            <HomeLayout />
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
