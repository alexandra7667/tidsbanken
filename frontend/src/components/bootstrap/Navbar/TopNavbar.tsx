import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Tabs, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function TopNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [key, setKey] = useState<string | null>(null);

    //Get the url path and set the tab on refresh
    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setKey(path || 'dashboard');
    }, [location]);

    const handleSelect = (k: string | null) => {
        setKey(k);
        navigate(`/${k}`);
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container className="d-flex flex-column h-100">
                <Navbar.Brand className="mb-auto">Tidsbanken</Navbar.Brand>
                <div className="mt-auto">
                    <Tabs
                        id="header-tabs"
                        activeKey={key}
                        onSelect={handleSelect}
                    >
                        <Tab eventKey="dashboard" title="Calendar">
                        </Tab>
                        <Tab eventKey="requests" title="My requests">
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </Navbar>
    );
}

export default TopNavbar;
