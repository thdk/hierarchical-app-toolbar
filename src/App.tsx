import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCoffee,
  faJedi,
  faRobot,
  faUserAstronaut,
  faFish,
  faPizzaSlice,
  faStroopwafel,
} from '@fortawesome/free-solid-svg-icons'

import { HomeScreen } from './components/home-screen';
import { TodosScreen } from './components/todos-screen';
import { EditorScreen } from './components/editor-screen';
import { EditorContextProvider } from './contexts/editor-context';

library.add(faCoffee,
  faJedi,
  faRobot,
  faUserAstronaut,
  faFish,
  faPizzaSlice,
  faStroopwafel,
);

function App() {
  return (
    <Router>
      <EditorContextProvider>
        <Switch>
          <Route path="/todos">
            <TodosScreen />
          </Route>
          <Route path="/editor">
            <EditorScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </EditorContextProvider>
    </Router>
  );
}

export default App;
