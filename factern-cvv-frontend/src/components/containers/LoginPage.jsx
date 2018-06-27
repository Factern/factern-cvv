import React from 'react';
import { PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';
import Auth0 from '../../auth0/auth';

const auth0 = new Auth0();

// eslint-disable-next-line react/prefer-stateless-function
class LoginPage extends React.Component {
  render() {
    return (
      <div className="row">
        <PageHeader>
          <Grid>
            <Row className="show-grid">
              <Col sm={3} md={3}>
                CVVerify
              </Col>

              <Col sm={9} md={9}>
                <Button onClick={() => auth0.login()}>
                  Login with OAuth
                </Button>
                <Button onClick={() => auth0.login(true)}>
                  Signup with OAuth
                </Button>
              </Col>

            </Row>
          </Grid>
        </PageHeader>
      </div>
    );
  }
}
export default LoginPage;
