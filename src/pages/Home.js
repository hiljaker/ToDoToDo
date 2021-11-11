import React from 'react';
//? css
// import './App.css';
//? components
// import Navbar from './components/Navbar';
//? redux
import { setActivities } from '../redux/actions/activityActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activityReducer.activities);
  console.log(activities);

  const onTestClick = () => {
    dispatch(
      setActivities([
        { activity_name: 'activity1' },
        { activity_name: 'activity2' },
        { activity_name: 'activity3' },
      ])
    );
  };

  return (
    <>
      <h1>Home</h1>;<button onClick={onTestClick}>test redux action</button>
    </>
  );
}
