"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Main = () => {
    const [isAffirmationVisible, setAffirmationVisible] = useState(false);
    const [affirmation, setAffirmation] = useState('');
    const [dayStatus, setDayStatus] = useState(Array(31).fill(null));
    const [selectedDay, setSelectedDay] = useState(null);
    const [isDayPopupVisible, setDayPopupVisible] = useState(false);
    const [isBadgePopupVisible, setBadgePopupVisible] = useState(false);
    const [badgeImage, setBadgeImage] = useState(null);
    const currentDate = new Date();

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // Get the starting day of the month (0: Sun, 1: Mon, ... 6: Sat)

    const totalCells = startDay + daysInMonth; // Total cells to display (empty + days in the month)

    useEffect(() => {
        if (isAffirmationVisible) {
            fetchAffirmation();
        }
    }, [isAffirmationVisible]);

    useEffect(() => {
        // Retrieve dates from session storage
        const datesArray = JSON.parse(sessionStorage.getItem('datesArray')) || [];
        
        // Update dayStatus based on datesArray
        const updatedDayStatus = Array(31).fill(null); // Initialize with null
        for (let i = 0; i < currentDate.getDate() - 1; i++) {
            if (datesArray.includes(i + 1)) {
                updatedDayStatus[i] = 'notSmoked'; // Mark as not smoked (tick mark)
            } else {
                updatedDayStatus[i] = 'smoked'; // Mark as smoked (cross mark)
            }
        }
        if(datesArray.includes(currentDate.getDate())){
            updatedDayStatus[currentDate.getDate() - 1] = 'notSmoked';
        }
        setDayStatus(updatedDayStatus);
    }, [daysInMonth]);

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

    const openDayPopup = (day) => {
        if (dayStatus[currentDate.getDate() - 1] !== null) {
            return; // Prevent re-entry
        }
        if (day == currentDate.getDate()) {
            setSelectedDay(day);
            console.log(day);
            setDayPopupVisible(true);
        }
    };

    const logDayStatus = (didSmoke) => {
        if (selectedDay !== currentDate.getDate()) {
            return; // Prevent updates for days other than today
        }

        if (dayStatus[currentDate.getDate() - 1] !== null) {
            return; // Prevent re-entry
        }

        setDayStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[currentDate.getDate() - 1] = didSmoke ? 'smoked' : 'notSmoked';
            return newStatus;
        });

        setDayPopupVisible(false);

        if (!didSmoke) {
            setBadgeImage(`/badges/${currentDate.getDate()}.png`);
            setBadgePopupVisible(true);

             // Get the current day and month
            const currentDay = currentDate.getDate(); // Day of the month (1-31)
            const currentMonthString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "October 2024"

            // Get the existing dates array from session storage, or create a new one
            let datesArray = JSON.parse(sessionStorage.getItem('datesArray')) || [];
            
            // Get the existing months array from session storage, or create a new one
            let monthsArray = JSON.parse(sessionStorage.getItem('monthsArray')) || [];

            // Add the current day to the dates array if it's not already present
            if (!datesArray.includes(currentDay)) {
                datesArray.push(currentDay);
            }

            // Check if today is the last day of the month
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            if (currentDay === lastDayOfMonth) {
                // If today is the last day of the month, empty the dates array and add the current month to the months array
                datesArray = []; // Clear the date array
                if (!monthsArray.includes(currentMonthString)) {
                    monthsArray.push(currentMonthString); // Add the current month if not already present
                }
            }

            // Store the updated arrays back into session storage
            sessionStorage.setItem('datesArray', JSON.stringify(datesArray));
            sessionStorage.setItem('monthsArray', JSON.stringify(monthsArray));
        }
        else {
            alert("We are sorry to see that you weren't able to resist today, but there would be one day when you would quit this act for yourself, and for your loved ones.");
        }
    };

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
            <Header>My Calendar</Header>
            <Calendar>
                <DaysOfWeek>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <Day key={day}>{day}</Day>
                    ))}
                </DaysOfWeek>
                <Week>
                    {Array.from({ length: totalCells }, (_, index) => {
                        if (index < startDay) {
                            // Render empty cells for the days before the start of the month
                            return <DayCell key={index} />;
                        } else {
                            const day = index - startDay + 1;
                            const isPastDay = day < currentDate.getDate();
                            const status = dayStatus[day - 1];

                            // If it's a past day and no status is set, mark it as smoked
                            if (isPastDay && status === null) {
                                setDayStatus(prevStatus => {
                                    const newStatus = [...prevStatus];
                                    newStatus[day - 1] = 'smoked'; // Automatically mark it as smoked
                                    return newStatus;
                                });
                            }

                            return (
                                <DayCell
                                    key={index}
                                    onClick={() => openDayPopup(day)}
                                    $status={status}
                                    disabled={day < currentDate.getDate()} // Disable past days
                                >
                                    {day}
                                    {status === 'notSmoked' && <Tick>✔️</Tick>}
                                    {status === 'smoked' && <Cross>❌</Cross>}
                                </DayCell>
                            );
                        }
                    })}
                </Week>
            </Calendar>
            {isAffirmationVisible && (
                <AffirmationPopup>
                    <AffirmationMessage>{affirmation}</AffirmationMessage>
                    <CloseButton onClick={() => setAffirmationVisible(false)}>Close</CloseButton>
                </AffirmationPopup>
            )}
            {isDayPopupVisible && (
                <DayPopup>
                    <PopupMessage>Did you smoke today?</PopupMessage>
                    <PopupButtons>
                        <PopupButton onClick={() => logDayStatus(true)}>Yes</PopupButton>
                        <PopupButton onClick={() => logDayStatus(false)}>No</PopupButton>
                    </PopupButtons>
                </DayPopup>
            )}
            {isBadgePopupVisible && badgeImage && (
                <BadgePopup>
                    <BadgeImage src={badgeImage} alt="Badge" />
                    <CloseButton onClick={() => setBadgePopupVisible(false)}>Close</CloseButton>
                </BadgePopup>
            )}
        </Container>
    );
};

export default Main;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
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
    padding: 10px 20px;
    color: white;
    background-color: darkorange;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: orange;
    }
`;

const Header = styled.h1`
    color: #25113a;
    margin-bottom: 0px;
`;

const Calendar = styled.div`
    display: flex;
    width: 90vw;
    flex-direction: column;
    border: 2px solid #25113a;
    border-radius: 10px;
    overflow: hidden;
`;

const DaysOfWeek = styled.div`
    display: flex;
    background-color: #25113a;
    color: white;
    justify-content: space-around;
    padding: 10px 0;
`;

const Day = styled.div`
    flex: 1;
    text-align: center;
`;

const Week = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const DayCell = styled.div`
    width: calc(100% / 7);
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e0e0e0;
    font-size: 1.2rem;
    transition: background-color 0.2s;
    color: #25113a;
    position: relative;
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1;
    }
`;

const EmptyDayCell = styled.div`
    width: calc(100% / 7);
    height: 80px;
    border: 1px solid #e0e0e0;
    background-color: #f9f9f9;
`;

const Tick = styled.div`
    position: absolute;
    font-size: 1.5rem;
    color: green;
    top: 10px;
    right: 10px;
`;

const Cross = styled.div`
    position: absolute;
    font-size: 1.5rem;
    color: red;
    top: 10px;
    right: 10px;
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

const DayPopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PopupMessage = styled.p`
    color: #25113a;
    margin: 0;
    text-align: center;
    padding-bottom: 20px;
`;

const PopupButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const PopupButton = styled.button`
    padding: 10px 20px;
    color: white;
    background-color: #25113a;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: darkviolet;
    }
`;

const BadgePopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const BadgeImage = styled.img`
    width: 200px; // Adjust size as needed
    height: 200px; // Adjust size as needed
    object-fit: cover; // Maintain aspect ratio
`;

