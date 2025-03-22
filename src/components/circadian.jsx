import './scss/circadian.scss';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import lightMode from '../assets/light-mode.png';
import brush from '../assets/brush.png';
import bath from '../assets/bath.png';
import breakfast from '../assets/breakfast.png';
import classRoom from '../assets/classRoom.png';
import foodTime from '../assets/foodTime.png';
import sleep from '../assets/sleep.png';
import gym from '../assets/gym.png';
import socialMedia from '../assets/socialMedia.png';
import myRoutine from '../assets/myRoutine.png';
import { Flex, Separator, Strong } from "@radix-ui/themes";
import { useLocation } from 'react-router-dom';

function Circadian({ appearance, toggleAppearance }) {
  const [fixheightForId, setFixHeightForId] = useState(21);
  const [currentId, setCurrentId] = useState(fixheightForId);
  const timeoutRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (event) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentId(event.target.id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setCurrentId(fixheightForId), 300);
  };

  const fetchHeight = (currentId, id) => {
    if (currentId === id || id === fixheightForId) return '80%';
    if (id === currentId + 1 || id === currentId - 1) return '50%';
    return '30%';
  };

  const changeAppearance = (id) => {
    setFixHeightForId(id);
    if (id < 8 || id > 20) toggleAppearance('dark');
    else toggleAppearance('light');
  };

  const renderModeIcon = (id) => {
    if (fixheightForId !== parseInt(id)) return null;

    // Define mode icon and custom text for each hour
    const hourData = {
        8: { icon: brush, text: 'Morning Me: Debug Mode' },
        9: { icon: bath, text: 'Shower Karaoke Time' },
        10: { icon: breakfast, text: 'Cereal > Life Decisions' },
        11: { icon: classRoom, text: 'Pretending to Work Hard' },
        12: { icon: classRoom, text: 'Daydreaming in Class' },
        13: { icon: foodTime, text: 'Lunch: My True Love' },
        14: { icon: classRoom, text: 'Counting Minutes to Freedom' },
        15: { icon: classRoom, text: 'Brain.exe Has Crashed' },
        16: { icon: classRoom, text: 'Doodling Masterpieces' },
        17: { icon: socialMedia, text: 'Doomscrolling Begins' },
        18: { icon: socialMedia, text: 'Stuck in Meme Hell' },
        19: { icon: gym, text: 'Gym? Am I dedicated to this?' },
        20: { icon: socialMedia, text: 'Insta Ate My Soul' },
        21: { icon: socialMedia, text: 'Hustling Code, Trending Reels' },
        22: { icon: foodTime, text: 'Dinner: Scroll & Chew' },
    };

    const defaultIcon = appearance === 'dark' ? sleep : lightMode;
    const defaultText = appearance === 'dark' ? 'Sleep' : 'Idle';

    const { icon, text } = hourData[id] || { icon: defaultIcon, text: defaultText };

    return (
      <>
        <img className="modeImage" src={icon} alt={text} />
        <div className="routineContainer">
          <img
            className="myRoutine"
            src={myRoutine}
            alt="My Routine"
          />
          <span className="routineText">{text}</span>
        </div>
      </>
    );
  };

  const separators = [
    { id: "1", time: '1am' }, { id: "2", time: '2am' }, { id: "3", time: '3am' }, { id: "4", time: '4am' }, { id: "5", time: '5am' },
    { id: "6", time: '6am' }, { id: "7", time: '7am' }, { id: "8", color: "teal", time: '8am' }, { id: "9", color: "teal", time: '9am' },
    { id: "10", color: "teal", time: '10am' }, { id: "11", color: "teal", time: '11am' }, { id: "12", color: "teal", time: '12pm' },
    { id: "13", color: "teal", time: '1pm' }, { id: "14", color: "teal", time: '2pm' }, { id: "15", color: "teal", time: '3pm' }, { id: "16", color: "teal", time: '4pm' },
    { id: "17", color: "teal", time: '5pm' }, { id: "18", color: "teal", time: '6pm' }, { id: "19", color: "teal", time: '7pm' },
    { id: "20", color: "teal", time: '8pm' }, { id: "21", time: '9pm' }, { id: "22", time: '10pm' }, { id: "23", time: '11pm' }, { id: "24", time: '12am' },
  ];

  if (!isLoaded) return null;

  return (
    location.pathname === '/' ? (
      <Flex justify="center" className="circadian">
        {separators.map(({ id, color, time }) => (
          <div
            key={id}
            id={id}
            className="circadian-seperatorBlock"
            onMouseEnter={(event) => { changeAppearance(parseInt(id)); handleMouseEnter(event); }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="modelImageContainer">
              {renderModeIcon(id)}
            </div>
            <Separator
              className="seperator"
              orientation="vertical"
              style={{ height: fetchHeight(parseInt(currentId), parseInt(id)), backgroundColor: color }}
            />
            {String(id) === String(currentId) && (
              <span style={{ position: 'absolute', bottom: '-25px', width: 'max-content' }}>
                <Strong>My {time} Vibe</Strong>
              </span>
            )}
          </div>
        ))}
      </Flex>
    ) : null
  );
}

Circadian.propTypes = {
  appearance: PropTypes.string,
  toggleAppearance: PropTypes.func,
};

export default Circadian;