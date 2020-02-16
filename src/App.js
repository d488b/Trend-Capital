import React, {useState, useEffect} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table, Container, Row, Col } from 'reactstrap';

import copyImage from './copy.png';

function App() {

  const [userData, setUserData] = useState([]);
  const [sorted, setSorted] = useState(false);

  async function fetchUserData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    setUserData(data);
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  function onSort(event, sortKey){
    const dataArray = [...userData];
    if(sorted === false) { 
      dataArray.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
      setSorted(true);
    } else {
      dataArray.sort((a,b) => b[sortKey].localeCompare(a[sortKey])) 
      setSorted(false);
    }
    setUserData(dataArray);
  }

  const renderTable = () => {
    return userData.map((user, index) => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.username}</td>
          <td><a href={"https://www."+user.website} rel="noopener noreferrer" target="_blank">www.{user.website}</a></td>
          <td>{user.company.name}</td>
        </tr>
      )
    })
  }

  function copyTable() {
    const el = document.getElementById('table');
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
        document.execCommand("copy");

    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
        range.execCommand("Copy");
    }
}

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <p>Users</p>
            <img src={copyImage} onClick={copyTable} className="float-right" title="Copy Table" alt="Copy"/>
            <Table id="table" data-toggle="table" responsive>
              <thead>
                <tr>
                  <th onClick={e => onSort(e, 'name')}>Name <i className="fa fa-fw fa-sort"></i></th>
                  <th onClick={e => onSort(e, 'email')}>Email <i className="fa fa-fw fa-sort"></i></th>
                  <th>Phone</th>
                  <th onClick={e => onSort(e, 'username')}>Username <i className="fa fa-fw fa-sort"></i></th>
                  <th onClick={e => onSort(e, 'website')}>Website <i className="fa fa-fw fa-sort"></i></th>
                  <th onClick={e => onSort(e, 'company')}>Company <i className="fa fa-fw fa-sort"></i></th>
                </tr>
              </thead>
              <tbody>
                {renderTable()}
              </tbody>
            </Table>  
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
