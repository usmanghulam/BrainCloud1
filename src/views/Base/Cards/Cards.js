import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResults from 'react-filter-search';
import { Badge, Card, CardBody, CardHeader, Col, Row, CustomInput } from 'reactstrap';
import Logo from "../../../assets/img/1.jpg"
const Cards = props => {
  
  const [users,setUsers] = useState([]);
  const [value, setValue] = useState(0);
  const [zoom,setZoom] = useState('');
  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(users => setUsers(users.data))
    .catch(err => console.error(err))
  },[])

  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <div className="animated fadeIn">
      <div>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <a onClick={e => {
              e.preventDefault()
              let name = users.sort(function(a, b){
                  let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                  if (nameA < nameB)
                    return -1;
                  if (nameA > nameB)
                    return 1;
              });
              if(name) 
              setUsers(name)
              setValue(' ')
          }} className="nav-link" href="#">Name <i className='mt-2 fas fa-angle-down'></i></a>
          </li>
          <li className="nav-item">
            <a onClick={e => {
              e.preventDefault()
              let name = users.sort(function(a, b){
                  let nameA=a.username.toLowerCase(), nameB=b.username.toLowerCase();
                  if (nameA < nameB)
                    return -1;
                  if (nameA > nameB)
                    return 1;
              });
              if(name) 
              setUsers(name)
              setValue('  ')
            }} className="nav-link" href="#">username <i className='mt-2 fas fa-angle-down'></i></a>
          </li>
          <li className="nav-item">
            <a onClick={e => {
              e.preventDefault()
              let name = users.sort(function(a, b){
                  let nameA=a.company.name.toLowerCase(), nameB=b.company.name.toLowerCase();
                  if (nameA < nameB)
                    return -1;
                  if (nameA > nameB)
                    return 1;
              });
              if(name) 
              setUsers(name)
              setValue('   ')
          }} className="nav-link" href="#">Company <i className='mt-2 fas fa-angle-down'></i></a>
          </li>
          <li className="nav-item">
            <a onClick={e => {
              e.preventDefault()
              let name = users.sort(function(a, b){
                  let nameA=a.website.toLowerCase(), nameB=b.website.toLowerCase();
                  if (nameA < nameB)
                    return -1;
                  if (nameA > nameB)
                    return 1;
              });
              if(name) 
              setUsers(name)
              setValue('    ')
          }} className="nav-link" href="#">Website <i className='mt-2 fas fa-angle-down'></i></a>
          </li>
        </ul>
      </div>
      <form>
        <div className="row">
          <div className="col-10 offset-1">
            <div className="form-group">
            <input onChange={handleChange} type="text" className="form-control" placeholder="Search"/>
          </div>
          </div>
        </div>
      </form>
      <div style={{overflow:"hidden"}}>
        <div className="example" style={{overflow:"scroll"}}>
          <div style={{transform:`scale(${zoom})`}}>
            <SearchResults
            value={value}
            data={users}
            renderResults={results => (
            <Row>
                {results.map(el => (
                  <Col key={el.id} xs="12" sm="6" md="4">
                    <Card>
                      <CardHeader>
                      {el.username}
                      </CardHeader>
                      <CardBody>
                        <div style={{textAlign:'center'}}>
                          <div className="mb-3" style={{width:"70px",height:'70px',border:"2px solid blue",borderRadius:"50%", margin:'auto'}}>
                            <img className='text-center' style={{width:"100%",height:"100%",borderRadius:"50%"}} src={Logo} />
                          </div>
                          <h5 className="card-title">{el.name}</h5>
                          <p className="card-text"><b>Company:</b> {el.company.name}</p>
                          <p className="card-text"><b>Website:</b> {el.website}</p>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
            </Row>
            )}
          />
          </div>
        </div>
      </div>
      <div className="mt-2 mb-5">
        <CustomInput
        onChange={e => setZoom(e.target.value/50)} 
        type="range" 
        id="exampleCustomRange" 
        name="customRange" />
      </div>
    </div>
  );
}

export default Cards;
