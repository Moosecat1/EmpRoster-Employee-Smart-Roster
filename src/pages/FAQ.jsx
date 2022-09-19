import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import '../css/FAQ.css'

export default function FAQ() {
    document.title = "EmpRoster - Smart Roster System"
    return (
    <main>
        <Navbar/>
        <h1 className="textcenter faqHeadingSpace">Frequently Asked Questions</h1>
        <Container className='faqSpace'>
      
        <Tab.Container id="list-group" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#link1">
              What does this application do?
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Is this application only for business owners?
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
              Is this application free?
            </ListGroup.Item>
            <ListGroup.Item action href="#link4">
              Do I need an account to use this application?
            </ListGroup.Item>
            <ListGroup.Item action href="#link5">
              I came across an error, what should I do?
            </ListGroup.Item>
            <ListGroup.Item action href="#link6">
              Is this application suitable for my company?
            </ListGroup.Item>
            <ListGroup.Item action href="#link7">
              I have other questions.
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
             This application is a tool to manage all aspects of time scheduling and rostering of employees. 
             It's simple and straight-forward, without any complex clutter that confuses users.
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
             This application isn't just for business owners! Employees can use it too, allowing them to easily manage their schedule, as long as the business itself implements it's usage.
            </Tab.Pane>
            <Tab.Pane eventKey="#link3">
             For now, yes. There are currently no plans to add any sort of pricing.
            </Tab.Pane>
            <Tab.Pane eventKey="#link4">
             Yes. There are a variety of levels to the accounts too, depending on whether you're the administrator, manager or an employee.
             Each account type has settings and features tailored to your needs.
            </Tab.Pane>
            <Tab.Pane eventKey="#link5">
             Simply contact us and we'll look into it. Provide a detailed description of what went wrong and how it happened so that we can quickly solve the problem.
            </Tab.Pane>
            <Tab.Pane eventKey="#link6">
             This application is designed with small to medium sized companies in mind, however it still functions for larger companies!
             With it being free, you can try it out and see if it fits your needs.
            </Tab.Pane>
            <Tab.Pane eventKey="#link7">
             If you have more questions, feel free to contact us and we'll reply as soon as we're able.
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </Container>

        <Footer />
    </main>
    );
}