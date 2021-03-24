/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from './App.module.scss';
import Button from './components/button.component';
import './styles/lightTheme.scss';

const App = () => {
  const [jokeData, setJokeData] = useState([]);
  const [showPunchline, setShowPunchline] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [apiError, setApiError] = useState(false);

  // Map api data to a variable incase response field names change
  const mapApiData = (response) => {
    // const data = response.map();
    const mappedApiData = {
        id: response.id,
        setup: response.setup,
        punchline: response.punchline,
    };

    // Set the joke data and turn off the loader
    setJokeData(mappedApiData);
    setShowLoader(false);
};

  const handleGetJoke = () => {
    // Reset the punchline flag and begin the loader
    setShowPunchline(false);
    setShowLoader(true);


    // Make the api call for joke data
    axios.get('https://official-joke-api.appspot.com/random_joke')
      .then(response=> {
        mapApiData(response.data);
      })
      .catch(() => {
        setApiError(true);
        setShowLoader(false);
      });
  };

  useEffect(() => {
    handleGetJoke();

    // Reset error messaging
    return setApiError(false);
  }, []); // Passing an empty dep array makes this behave like componentDidMount

  return (
      <div className={css.app}>

        {/* GET JOKE BUTTON */}
        <div className={css.getJokeContainer}>
          <Button
            className={css.getJokeButton}
            handleButtonClick={() => { handleGetJoke(); }}
            buttonText={'Get A New Random Joke'}
          />
          {/* JOKE API DOCUMENTATION LINK */}
          <a
            href="https://github.com/15Dkatz/official_joke_api"
            target="_blank"
            rel="noreferrer"
          >
              View API Docs
          </a>
        </div>

        <div className={css.divider} />

        {/* ERROR MESSAGE */}
        {apiError && <div className={css.error}>THERE WAS AN ERROR LOADING YOUR JOKE</div>}

        {/* LOADER */}
        {showLoader && <div className={css.loader}>LOADING YOUR JOKE...</div>}

        {(!apiError && !showLoader) &&
          <div className={css.displayjokeContainer}>

            {/* JOKE SETUP LABEL */}
            <div className={css.setupContainer}>
              <div className={css.startQuote}>"</div>
              <div className={css.jokeLabel}>{jokeData.setup}</div>
            </div>

            {/* SHOW/HIDE PUNCHLINE BUTTON */}
            <div className={css.showHideButtonContainer}>
              <Button
                className={showPunchline ? css.hidePunchline : css.showPunchline}
                handleButtonClick={() => { setShowPunchline(!showPunchline); }}
                buttonText={showPunchline ? 'Hide Punchline' : 'Show Punchline'}
              />
            </div>

            {/* JOKE PUNCHLINE LABEL */}
            {showPunchline &&
              <div className={css.punchlineContainer}>
                <div className={css.jokeLabel}>{jokeData.punchline}</div>
                <div className={css.endQuote}>"</div>
              </div>
            }
          </div>
        }

      </div>
  );
}

export default App;
