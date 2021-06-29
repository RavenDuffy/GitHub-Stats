import { HomeLayout } from "./pages/HomeLayout";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ServeSVGLayout } from "./pages/ServeSVGLayout";
import * as config from './config.local.json'


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/svg/:gitId' component={() => {
          const WLPath = window.location.pathname.split('/')
          window.location.href = `${config.hosts.back}/svg/${WLPath[WLPath.length - 1]}`

          return null
        }}/>
        <Route path='/:gitId' component={ServeSVGLayout} />
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
