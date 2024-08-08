import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Tabs, Tab } from 'react-bootstrap';
import { useState } from 'react';


function TopNavbar() {
    const [key, setKey] = useState<string | null>('home');

    const handleSelect = (k: string | null) => {
        console.log('Selected tab:', k);
        setKey(k);
        //@todo navigate to selected tab
    };    

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container className="d-flex flex-column h-100">
                <Navbar.Brand className="mb-auto" >Tidsbanken</Navbar.Brand>
                <div className="mt-auto">
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        activeKey={key || 'home'}
                        onSelect={handleSelect}
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Home">
                        </Tab>
                        <Tab eventKey="requests" title="Requests">
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
