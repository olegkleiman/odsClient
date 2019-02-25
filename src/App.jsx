// @flow
import React, { useState } from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import { Route, Switch } from 'react-router-dom';
import { DataProvider} from './DataContext';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";
import { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

import Home from './Home';
import Categories from './Categories';
import Category from './Category';
import DataSetContent from './DataSetContent';

const resources = {
  en: {
    translation: {
        "Switch": "Hebrew"
    }
  },
  he: {
    translation: {
      "Switch": "אנגלית"
    }
  },
  ar: {
    translation: {
      "Switch": "مفتاح كهربائي"
   }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    lng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })

const App = () => {

  const { t } = useTranslation();
  const [direction, setDirection] = useState(DIRECTIONS.LTR);

  const changeLang = () => {

    if( direction == DIRECTIONS.RTL ) {
      i18n.changeLanguage('en');
      setDirection(DIRECTIONS.LTR);
    } else {
      i18n.changeLanguage('he');
      setDirection(DIRECTIONS.RTL);
    }
  }

  return (<DataProvider value={{
                                direction: direction}
                              }>
            <div dir={direction}>
              <button onClick={changeLang}>{t('Switch')}</button>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/categories' component={Categories} />
                <Route path='/category/:categoryId' component={Category} />
                <Route path="/ds/:dsId" component={DataSetContent} />
              </Switch>
            </div>
        </DataProvider>)
}

export default App;
