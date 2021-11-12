import React, { useEffect, useState } from 'react';
//? css
// import './App.css';
import 'react-vertical-timeline-component/style.min.css';
//? components
// import Navbar from './components/Navbar';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
//? redux
import { getActivities, addActivity } from '../redux/actions/activityActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const activities = useSelector((state) => state.activityReducer.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  //!
  const [file, setfile] = useState(null);
  const onFileChange = (e) =>
    e.target.files[0] ? setfile(e.target.files[0]) : setfile(null);
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

  return (
    <>
      <div>
        <h1>Add Activity</h1>

        <button onClick={onAddClick}>Add</button>
        <input type='file' placeholder='file upload' onChange={onFileChange} />

        {file ? <img src={URL.createObjectURL(file)} alt={file}></img> : null}
      </div>

      {activities.map((el, i) => {
        return (
          <h1 key={el.id}>
            {el.activity_name}
            {`: (${el.act_start}) to (${el.act_finish})`}
          </h1>
        );
      })}

      <VerticalTimeline>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date='2011 - present'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>Creative Director</h3>
          <h4 className='vertical-timeline-element-subtitle'>Miami, FL</h4>
          <p>
            Creative Direction, User Experience, Visual Design, Project
            Management, Team Leading
          </p>
          {/* <img src={}></img> */}
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2010 - 2011'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>Art Director</h3>
          <h4 className='vertical-timeline-element-subtitle'>
            San Francisco, CA
          </h4>
          <p>
            Creative Direction, User Experience, Visual Design, SEO, Online
            Marketing
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2008 - 2010'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>Web Designer</h3>
          <h4 className='vertical-timeline-element-subtitle'>
            Los Angeles, CA
          </h4>
          <p>User Experience, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          date='2006 - 2008'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          // icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>Web Designer</h3>
          <h4 className='vertical-timeline-element-subtitle'>
            San Francisco, CA
          </h4>
          <p>User Experience, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--education'
          date='April 2013'
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          // icon={<SchoolIcon />}
        >
          <h3 className='vertical-timeline-element-title'>
            Content Marketing for Web, Mobile and Social Media
          </h3>
          <h4 className='vertical-timeline-element-subtitle'>Online Course</h4>
          <p>Strategy, Social Media</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--education'
          date='November 2012'
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          // icon={<SchoolIcon />}
        >
          <h3 className='vertical-timeline-element-title'>
            Agile Development Scrum Master
          </h3>
          <h4 className='vertical-timeline-element-subtitle'>Certification</h4>
          <p>Creative Direction, User Experience, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--education'
          date='2002 - 2006'
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          // icon={<SchoolIcon />}
        >
          <h3 className='vertical-timeline-element-title'>
            Bachelor of Science in Interactive Digital Media Visual Imaging
          </h3>
          <h4 className='vertical-timeline-element-subtitle'>
            Bachelor Degree
          </h4>
          <p>Creative Direction, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          // icon={<StarIcon />}
        />
      </VerticalTimeline>
    </>
  );
}
