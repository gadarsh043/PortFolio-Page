import './scss/circadian.scss'
import PropTypes from 'prop-types';
import { useState, useRef } from "react";
import darkMode from '../assets/dark-mode.png'
import lightMode from '../assets/light-mode.png'
import { Flex, Separator } from "@radix-ui/themes";

function Circadian({appearance, toggleAppearance}) {
    const [fixheightForId, setFixHeightForId] = useState(10)
    const [currentId, setCurrentId] = useState(fixheightForId);
    const timeoutRef = useRef(null);

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
        if (id < 7 || id > 22) {
            toggleAppearance('dark');
        } else {
            toggleAppearance('light');
        }
    }

    const renderModeIcon = (id) => {
        if (fixheightForId !== parseInt(id)) return null;
        return appearance === 'dark' 
            ? <img className="modeImage" src={darkMode} />
            : <img className="modeImage" src={lightMode} />;
    };

    const separators = [
        { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, 
        { id: "7", color: "teal" }, { id: "8", color: "teal" }, { id: "9", color: "teal" },
        { id: "10", color: "teal" }, { id: "11", color: "teal" }, { id: "12", color: "teal" }, { id: "13", color: "teal" }, { id: "14", color: "teal" },
        { id: "15", color: "teal" }, { id: "16", color: "teal" }, { id: "17", color: "teal" }, { id: "18", color: "teal" }, { id: "19", color: "teal" },
        { id: "20", color: "teal" }, { id: "21", color: "teal" }, { id: "22", color: "teal" },
        { id: "23" }, { id: "24" }, { id: "25" }, { id: "26" }, { id: "27" }, { id: "28" }
    ];

    return (
        <Flex justify="center" className="circadian">
            {separators.map(({ id, color }) => (
                <div key={id} id={id} className="circadian-seperatorBlock" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => changeAppearance(parseInt(id))}>
                    {renderModeIcon(id)}
                    <Separator
                        className="seperator"
                        orientation="vertical"
                        style={{ height: fetchHeight(parseInt(currentId), parseInt(id)), backgroundColor: color }}
                    />
                </div>
            ))}
        </Flex>
    )
}

Circadian.propTypes = {
    appearance: PropTypes.string,
    toggleAppearance: PropTypes.func
};

export default Circadian;