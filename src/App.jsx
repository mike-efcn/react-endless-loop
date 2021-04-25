import React, { useEffect, useRef, useState } from 'react';
import styles from './App.module.less';

const doSomething = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const newData = {
        accessToken: Math.random().toString(36).padEnd(13, '0').slice(2),
        refreshToken: Date.now().toString(36),
      };
      resolve(newData);
    }, 1000);
  })

const App = () => {
  const [needAuth, setNeedAuth] = useState(true);
  const timerRef = useRef(null);
  const [auth1, setAuth1] = useState(() => ({ accessToken: null, refreshToken: null }));
  const [auth2, setAuth2] = useState(() => ({ accessToken: null, refreshToken: null }));

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setNeedAuth((prev) => {
        console.log(prev, '=>', !prev);
        return !prev;
      });
    }, 5000);
  }, [setNeedAuth]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!needAuth) {
      return;
    }

    doSomething(auth1).then((newAuth) => {
      console.error('auth1', JSON.stringify(auth1), JSON.stringify(newAuth));
      setAuth1(newAuth)
    });
  }, [needAuth, auth1, setAuth1]);

  useEffect(() => {
    if (!needAuth) {
      return;
    }

    doSomething(auth2).then((newAuth) => {
      console.warn('auth2', JSON.stringify(auth2), JSON.stringify(newAuth));
      setAuth2(newAuth);
    });
  }, [needAuth, setAuth2]);
  return (
    <div className={styles.App}>
      <div>{JSON.stringify(auth1)}</div>
      <div>{JSON.stringify(auth2)}</div>
    </div>
  );
};

export default App;
