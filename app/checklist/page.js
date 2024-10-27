"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBiking, FaLeaf, FaSpa, FaTint, FaHeart, FaChild } from 'react-icons/fa';

const Checklist = () => {
    const [checklistData, setChecklistData] = useState({});
    const [currentDay, setCurrentDay] = useState(new Date().getDay());
    const [activeTab, setActiveTab] = useState(new Date().getDay());
    const [isAffirmationVisible, setAffirmationVisible] = useState(false);
    const [affirmation, setAffirmation] = useState('');

    const activities = [
        { label: "Cycling", icon: <FaBiking /> },
        { label: "Deep Breathing", icon: <FaLeaf /> },
        { label: "Meditation", icon: <FaSpa /> },
        { label: "Drink Water", icon: <FaTint /> },
        { label: "Chat with a Loved One", icon: <FaHeart /> },
        { label: "Spend Time with Children", icon: <FaChild /> }
    ];

    useEffect(() => {
        if (isAffirmationVisible) {
            fetchAffirmation();
        }
    }, [isAffirmationVisible]);

    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('checklistData')) || {};
        setChecklistData(storedData);
    }, []);

    useEffect(() => {
        sessionStorage.setItem('checklistData', JSON.stringify(checklistData));
    }, [checklistData]);

    const fetchAffirmation = async () => {
        try {
            const res = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            setAffirmation(data.message);
            setAffirmationVisible(true);
        } catch (error) {
            console.error('Error fetching affirmation:', error);
        }
    };


    const handleCheckboxChange = (dayIndex, activity) => {
        if (dayIndex === currentDay) {
            setChecklistData(prevData => ({
                ...prevData,
                [dayIndex]: {
                    ...prevData[dayIndex],
                    [activity]: !prevData[dayIndex]?.[activity]
                }
            }));
        }
    };

    const renderDayChecklist = (dayIndex) => (
        <ChecklistContainer key={dayIndex}>
            {activities.map(({ label, icon }) => (
                <ActivityContainer key={label}>
                    <ActivityLabel>
                        {icon} {label}
                    </ActivityLabel>
                    <ActivityCheckbox
                        type="checkbox"
                        checked={checklistData[dayIndex]?.[label] || false}
                        onChange={() => handleCheckboxChange(dayIndex, label)}
                        disabled={dayIndex !== currentDay}
                    />
                </ActivityContainer>
            ))}
        </ChecklistContainer>
    );

    return (
        <Container>
            <Navbar>
                <Logo>QuitNow</Logo>
                <NavLinks>
                    <NavLink href="/rewards">Rewards</NavLink>
                    <NavLink href="/main">Calendar</NavLink>
                    <NavLink href="/checklist">Checklist</NavLink>
                </NavLinks>
                <Button onClick={fetchAffirmation}>Get Affirmation</Button>
            </Navbar>
            <Heading>Weekly Checklist</Heading>
            <Tabs>
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                    <Tab
                        key={index}
                        isActive={index === activeTab}
                        onClick={() => setActiveTab(index)}
                        disabled={index > currentDay}
                    >
                        {day}
                    </Tab>
                ))}
            </Tabs>
            {renderDayChecklist(activeTab)}
            {isAffirmationVisible && (
                <AffirmationPopup>
                    <AffirmationMessage>{affirmation}</AffirmationMessage>
                    <CloseButton onClick={() => setAffirmationVisible(false)}>Close</CloseButton>
                </AffirmationPopup>
            )}
        </Container>
        
    );
};

export default Checklist;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: white;
    min-height: 100vh;
    color: #25113a;
`;

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    background-color: #25113a;
    color: white;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const Logo = styled.h1`
    margin: 0;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 15px;
`;

const NavLink = styled.a`
    color: white;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const Button = styled.button`
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    background-color: darkorange;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: orange;
    }
`;

const Heading = styled.h2`
    margin: 20px 0;
    color: #25113a;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    padding: 8px 12px;
    border: 1px solid #25113a;
    border-radius: 5px;
    background-color: ${({ isActive }) => (isActive ? '#25113a' : 'white')};
    color: ${({ isActive }) => (isActive ? 'white' : '#25113a')};
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ChecklistContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #25113a;
    border-radius: 10px;
`;

const ActivityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
`;

const ActivityLabel = styled.label`
    display: flex;
    align-items: center;
    color: #25113a;
    gap: 5px;
`;

const ActivityCheckbox = styled.input`
    transform: scale(1.5);
`;


const AffirmationPopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 60vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    text-align: center;
`;

const AffirmationMessage = styled.p`
    color: #25113a;
    margin: 0;
    text-align: center;
    padding-bottom: 10vh;
`;

const CloseButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    color: white;
    background-color: #25113a;
    border: none;
    position: sticky;
    bottom: 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: darkviolet;
    }
`;
