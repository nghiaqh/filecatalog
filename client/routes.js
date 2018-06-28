import React from 'react';
import { Route, Switch } from 'react-router';
import MangaBoard from './components/templates/MangaBoard';
import MangasHub from './components/templates/MangasHub';
import Manga from './components/templates/Manga';

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={MangaBoard}/>
      <Route exact path='/mangas' component={MangasHub}/>
      <Route exact path='/mangas/:mangaId' component={Manga}/>
    </Switch>
    );
};
