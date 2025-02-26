import './scss/circadian.scss'
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import darkMode from '../assets/dark-mode.png'
import lightMode from '../assets/light-mode.png'
import wakeUp from '../assets/wakeup.png'
import brush from '../assets/brush.png'
import bath from '../assets/bath.png'
import breakfast from '../assets/breakfast.png'
import classRoom from '../assets/classRoom.png'
import foodTime from '../assets/foodTime.png'
import study from '../assets/study.png'
import gym from '../assets/gym.png'
import socialMedia from '../assets/socialMedia.png'
import { Flex, Separator, Strong } from "@radix-ui/themes";
import { useLocation } from 'react-router-dom';

function Circadian({appearance, toggleAppearance}) {
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
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setCurrentId(event.target.id);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setCurrentId(fixheightForId), 300);
    };

    const fetchHeight = (currentId, id) => {
        if (currentId === id || id === fixheightForId) {
            return '80%';
        } else if (id === currentId + 1 || id === currentId - 1) {
            return '50%';
        } else {
            return '30%';
        }
    }

    const changeAppearance = (id) => {
        setFixHeightForId(id);
        if (id < 8 || id > 20) {
            toggleAppearance('dark');
        } else {
            toggleAppearance('light');
        }
    }

    const renderModeIcon = (id) => {
        if (fixheightForId !== parseInt(id)) return null;
        if (parseInt(id) === 8) {
            return <img className="modeImage" src={wakeUp} />;
        } else if (parseInt(id) === 9) {
            return <img className="modeImage" src={brush} />;
        } else if (parseInt(id) === 10) {
            return <img className="modeImage" src={bath} />;
        } else if (parseInt(id) === 11) {
            return <img className="modeImage" src={breakfast} />;
        } else if (parseInt(id) === 12) {
            return <img className="modeImage" src={classRoom} />;
        } else if (parseInt(id) === 13) {
            return <img className="modeImage" src={foodTime} />;
        } else if (parseInt(id) === 14) {
            return <img className="modeImage" src={classRoom} />;
        } else if (parseInt(id) === 15) {
            return <img className="modeImage" src={classRoom} />;
        } else if (parseInt(id) === 16) {
            return <img className="modeImage" src={classRoom} />;
        } else if (parseInt(id) === 17) {
            return <img className="modeImage" src={study} />;
        } else if (parseInt(id) === 18) {
            return <img className="modeImage" src={study} />;
        } else if (parseInt(id) === 19) {
            return <img className="modeImage" src={gym} />;
        } else if (parseInt(id) === 20) {
            return <img className="modeImage" src={socialMedia} />;
        } else if (parseInt(id) === 21) {
            return <img className="modeImage" src={socialMedia} />;
        } else if (parseInt(id) === 22) {
            return <img className="modeImage" src={foodTime} />;
        }
        return appearance === 'dark' 
            ? <img className="modeImage" src={darkMode} />
            : <img className="modeImage" src={lightMode} />;
    };

    const separators = [
        { id: "1", time: '1am'}, { id: "2", time: '2am'}, { id: "3", time: '3am'}, { id: "4", time: '4am'}, { id: "5", time: '5am'},
        { id: "6", time: '6am'}, { id: "7", time: '7am'}, { id: "8", color: "teal", time: '8am'}, { id: "9", color: "teal", time: '9am'},
        { id: "10", color: "teal", time: '10am'}, { id: "11", color: "teal", time: '11am'}, { id: "12", color: "teal", time: '12pm'},
        { id: "13", color: "teal", time: '1pm'}, { id: "14", color: "teal", time: '2pm'}, { id: "15", color: "teal", time: '3pm'}, { id: "16", color: "teal", time: '4pm'},
        { id: "17", color: "teal", time: '5pm'}, { id: "18", color: "teal", time: '6pm'},  { id: "19", color: "teal", time: '7pm'},
        { id: "20", color: "teal", time: '8pm'}, { id: "21", time: '9pm'}, { id: "22", time: '10pm'}, { id: "23", time: '11pm'}, { id: "24", time: '12am'}
    ];

    if (!isLoaded) {
        return null;
    }
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
                        {renderModeIcon(id)}
                        <Separator
                            className="seperator"
                            orientation="vertical"
                            style={{ height: fetchHeight(parseInt(currentId), parseInt(id)), backgroundColor: color }}
                        />
                        {String(id) === String(currentId) && (
                            <span style={{ position: 'absolute', bottom: '-25px' }}>
                                <Strong>{time}</Strong>
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
    toggleAppearance: PropTypes.func
};

export default Circadian;