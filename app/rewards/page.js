"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Rewards = () => {
    const [currentBadges, setCurrentBadges] = useState([]);
    const [previousBadges, setPreviousBadges] = useState([]);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [isBadgePopupVisible, setBadgePopupVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(null); // State for current date

    // Retrieve dates and months from session storage
    useEffect(() => {
        const datesArray = JSON.parse(sessionStorage.getItem('datesArray')) || [];
        const monthsArray = JSON.parse(sessionStorage.getItem('monthsArray')) || [];

        // Initialize current date
        const date = new Date();
        setCurrentDate(date);

        // Set current badges based on datesArray
        const badgesThisMonth = datesArray.map(day => `/badges/${day}.png`); // Assuming badges are named after the day
        setCurrentBadges(badgesThisMonth);

        // Set previous month badges based on monthsArray
        const previousBadges = monthsArray.map(month => `/badges/${month}.png`); // Assuming badges are named after the month
        setPreviousBadges(previousBadges);
    }, []);

    const openBadgePopup = (badge) => {
        setSelectedBadge(badge);
        setBadgePopupVisible(true);
    };

    const closeBadgePopup = () => {
        setBadgePopupVisible(false);
        setSelectedBadge(null);
    };

    const fetchAffirmation = () => {
        // Placeholder function for the Get Affirmation button
        alert('Fetching affirmation...');
    };

    // Wait until currentDate is set to render the component
    if (!currentDate) {
        return <div>Loading...</div>; // Render a loading state
    }

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
            <Heading>Current Month: {currentDate.toLocaleString('default', { month: 'long' })}</Heading>
            <BadgeContainer>
                {currentBadges.map((badge, index) => (
                    <BadgeImage
                        key={index}
                        src={badge}
                        alt={`Badge for day ${index + 1}`}
                        onClick={() => openBadgePopup(badge)}
                    />
                ))}
            </BadgeContainer>
            <Heading>Your Previous Rewards</Heading>
            <BadgeContainer>
                {previousBadges.map((badge, index) => (
                    <BadgeImage
                        key={index}
                        src={badge}
                        alt={`Badge for month ${index + 1}`}
                        onClick={() => openBadgePopup(badge)}
                    />
                ))}
            </BadgeContainer>

            {isBadgePopupVisible && selectedBadge && (
                <BadgePopup>
                    <PopupImage src={selectedBadge} alt="Selected Badge" />
                    <CloseButton onClick={closeBadgePopup}>Close</CloseButton>
                </BadgePopup>
            )}
        </Container>
    );
};

export default Rewards;

// Styled Components (remains unchanged)
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    min-height: 100vh;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
    margin-bottom: 10px;
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
    color: white;
    background-color: darkorange;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Heading = styled.h2`
    margin: 10px 0;
    color: #25113a;
`;

const BadgeContainer = styled.div`
    display: flex-row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
`;

const BadgeImage = styled.img`
    width: 100px; /* Small size for badges */
    height: 100px; /* Small size for badges */
    margin: 5px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1); /* Slightly enlarge on hover */
    }
`;

const BadgePopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex; /* Changed this line */
    flex-direction: column; /* Added this line */
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 20px;
`;

const PopupImage = styled.img`
    width: 200px; /* Larger size for the popup */
    height: 200px; /* Larger size for the popup */
`;

const CloseButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
