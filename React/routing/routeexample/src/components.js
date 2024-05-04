import React from "react";
import {  Link, useParams, Outlet } from 'react-router-dom';

 const Homepage = () => {
  return "Welcome to my website."
}

const About = () => {
  return "This application assist you to book experts for various services like electrical repair services, plumbing etc.,  "
}

const AppServices = {
  'first-service': {
    title: 'Service 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adip.'
  },
  'second-service': {
    title: 'Service 2',
    description: 'Hello '
  }
};

function AllServices() {
  return (
    <div style={{ padding: 20 }}>
      <h2>List of Services</h2>
      <Outlet />
    </div>
  );
}
const Services = () => {
  return (
    <ul>
      {Object.entries(AppServices).map(([id, { title }]) => (
        <li key={id}>
          <Link to={`/services/${id}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Service() {
  const { slug } = useParams();
  const service = AppServices[slug];
  if(!service) {
    return <span>The service you've requested doesn't exist.</span>;
  }
  const { title, description } = service;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const Admin = () => {
  return "Admin Page"
}

const PageNotFound = (props) => {
  console.log(props);
    return (
        <div>
            <p>
            404 Page not found
            </p>
            <button onClick={() => props.history.goBack()}>Back</button>
        </div>
    )
}



export { Homepage, About, Services, Service, AllServices, Admin, PageNotFound }