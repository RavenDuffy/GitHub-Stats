import { HomeLayout } from "./pages/HomeLayout";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ServeSVGLayout } from "./pages/ServeSVGLayout";


function App() {
  return (
    <Router>
      <Switch>
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
