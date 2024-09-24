import React, { Fragment, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Accordion, Col, Form, Row, Button, Nav, Container } from "react-bootstrap";
import Checkbox from "../../_lowLevel/Checkbox.js";

export const EmbedContainer = React.forwardRef((props, ref, boardTitle, filter, expression, onChange) => (





<Fragment>
  <Container fluid className="position-relative" id="board">



<Row>
    <Col sm={12} md={12} lg={12} className="position-relative embed-responsive embed-responsive-16by9" style={{height: "100vh"}}>

      <Box

        ref={ref}
      />
      </Col>
</Row>
</Container>
</Fragment>
));
