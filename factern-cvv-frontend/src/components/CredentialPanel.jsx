import React from 'react';
import { Panel, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CredentialPanel = ({ credential, index, createLink }) => (
  <Panel key={index} eventKey={index}>
    <Panel.Heading>
      <Panel.Title toggle>{credential.name}</Panel.Title>
    </Panel.Heading>
    <Panel.Body collapsible>
      <ListGroup>
        {credential.links.map(link => (
          <ListGroupItem key={link.id}>
            <Link to={`link/${link.id}`}>{link.id}</Link>
          </ListGroupItem>))}
      </ListGroup>
      <Button bsStyle="success" onClick={() => createLink(credential.id)}>Create Link</Button>
    </Panel.Body>
  </Panel>
);

CredentialPanel.propTypes = {
  credential: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  createLink: PropTypes.func.isRequired,
};

export default CredentialPanel;
