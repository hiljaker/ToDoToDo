import React, { useEffect, useState, useRef } from 'react';
//? css
// import './App.css';
import 'react-vertical-timeline-component/style.min.css';
//? components
// import Navbar from './components/Navbar';
import ContentEditable from 'react-contenteditable';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
//? redux
import {
  getActivities,
  addActivity,
  editActivity,
} from '../redux/actions/activityActions';
import { useDispatch, useSelector } from 'react-redux';

const parseDate = (datetime) => datetime && datetime.split(' ')[0];
const parseTime = (datetime) => datetime && datetime.split(' ')[1];

export default function Home() {
  const baseURL = 'http://localhost:3001';
  const activities = useSelector((state) => state.activityReducer.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  //!
  const [file, setfile] = useState(null);
  const onFileChange = (e) => {
    if (e.target.files[0]) {
      // if (imageInput.current.e) {
      imageInput.current.e.target.src = URL.createObjectURL(e.target.files[0]);
      // }
      setfile(e.target.files[0]);
    } else {
      setfile(null);
    }
  };
  const onAddClick = () => {
    dispatch(
      addActivity(file, {
        activity_name: 'frontend',
        description: 'blablabla',
        act_start: '2011-2-4 15:00:00',
        act_finish: '2011-2-4 15:10:00',
      })
    );
  };

  const changes = useRef({});
  const beforeChange = useRef(null);
  const handleFocus = (e) => {
    beforeChange.current = e.target.childNodes[0].innerText;
  };
  const handleKeyDown = (e, id) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      if (changes.current.id !== id) {
        changes.current = {};
      }
      // * enter or tab
      e.target.edit = true; // * custom prop
      changes.current[e.target.className] = e.target.childNodes[0].innerText;
      changes.current.id = id;
      console.log(changes.current);
      e.target.blur();
      dispatch(editActivity(file, changes.current));
    } else if (e.keyCode === 27) {
      // * esc
      e.target.blur();
    }
  };
  const handleBlur = (e) => {
    if (!e.target.edit) {
      e.target.childNodes[0].innerText = beforeChange.current;
    } else {
      delete e.target.edit;
    }
  };

  const imageInput = useRef(null);
  const handleImageClick = (e) => {
    imageInput.current.e = e;
    imageInput.current.click();
    // e.target.src = file && URL.createObjectURL(file);
    // console.log(imageInput.current);
  };

  return (
    <>
      <div>
        <h1>Add Activity</h1>

        <button onClick={onAddClick}>Add</button>
        <input
          ref={imageInput}
          type='file'
          placeholder='file upload'
          // onChange={onFileChange}
        />

        {file ? (
          <img
            hidden
            style={{ maxWidth: '80%' }}
            src={URL.createObjectURL(file)}
            alt={file}
          ></img>
        ) : null}
      </div>

      <h1>{`date: ${parseDate(activities[0]?.act_start)}`}</h1>

      <input
        hidden
        ref={imageInput}
        type='file'
        placeholder='file upload'
        onChange={onFileChange}
      />
      <VerticalTimeline>
        {activities.map((el) => {
          return (
            <VerticalTimelineElement
              key={el.id}
              className='vertical-timeline-element--work'
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#000' }}
              contentArrowStyle={{
                borderRight: '7px solid  rgb(33, 150, 243)',
              }}
              date={`${parseTime(el?.act_start)}-${parseTime(el?.act_finish)}`}
              // onTimelineElementClick={(e) => console.log(e.target)}
              // iconOnClick={(e)=>console.log(e.target)}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              // icon={<WorkIcon />}
            >
              <ContentEditable
                html={`<h3 class='vertical-timeline-element-title' >${el.activity_name}</h3>`}
                //!
                disabled={false}
                onKeyDown={(e) => handleKeyDown(e, el.id)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tagName='article'
                className={'activity_name'}
              />
              <ContentEditable
                html={`<p>${el.description}</p>`}
                //!
                disabled={false}
                onKeyDown={(e) => handleKeyDown(e, el.id)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tagName='article'
                className={'description'}
              />
              {el.image ? (
                <img
                  onClick={handleImageClick}
                  style={{
                    maxHeight: '400px',
                    maxWidth: '100%',
                  }}
                  src={baseURL + el.image}
                  alt={el.activity_name}
                ></img>
              ) : null}
              {/* {changes.current.id && (
                <>
                  <button
                    onClick={() =>
                      dispatch(editActivity(file, changes.current))
                    }
                  >
                    confirm
                  </button>
                  <button onClick={() => (changes.current = {})}>cancel</button>
                </>
              )} */}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </>
  );
}
