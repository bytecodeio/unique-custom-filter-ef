import React, { Fragment, useState, useContext, useEffect, useRef, useLayoutEffect } from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Button, Container, Nav, Navbar, Header } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import defaultLogo from "../../assets/BytecodeLogo.png";
import { defaultLogoHeight } from "../../utils/constants";
import { CompanyLogo } from "../_lowLevel/CompanyLogo";
import { ExtensionContext } from "@looker/extension-sdk-react";
import Checkbox from "../../components/_lowLevel/Checkbox.js";

import Accordions from "../../components/_lowLevel/Accordions.js";

import Radio from "../../components/_lowLevel/Radio.js";
import Dropdown from "../../components/_lowLevel/Dropdown.js";





export const TopAppBar = ({ appConfig, onMenuClick, toolbarHeight, props, ref, boardTitle, filter, expression, onChange,fieldNameSuggestions,fieldNameSuggestions2, fieldNameSuggestions3, setSelectedCheckboxes,selectedCheckboxes, navbarHeight, setNavbarHeight }) => {
  const { core40SDK } = useContext(ExtensionContext);
  const [message, setMessage] = useState();

  useEffect(() => {
    const initialize = async () => {
      try {
        const value = await core40SDK.ok(core40SDK.me());
        setMessage(`${value.display_name}`);
      } catch (error) {
        setMessage("Error occured getting information about me!");
        console.error(error);
      }
    };
    initialize();
  }, []);


    let filters = JSON.parse(JSON.stringify(fieldNameSuggestions));


    const navbarRef = useRef(null);

     useEffect(() => {
       const navbarElement = document.querySelector('.navbar');
       if (navbarElement) {
         setNavbarHeight(navbarElement.offsetHeight);
       }
     }, []);




    const allSuggestions = [...fieldNameSuggestions, ...fieldNameSuggestions2, ...fieldNameSuggestions3];


    const filteredSuggestions2 = [...fieldNameSuggestions2];


 const [isExpanded, setIsExpanded] = useState(true);

   const [isVisible, setIsVisible] = useState(false);

   const [changeText, setChangeText] = useState(true);

  const toggleDiv = (e) => {

    setIsExpanded(!isExpanded);
  };

  const toggleText = (e) => {
    setChangeText(!changeText);
  };

useEffect(() => {
  const timeoutId = setTimeout(() => {
    setIsVisible(true);
  }, 3000);

  return () => clearTimeout(timeoutId);
}, []);

const slideRef = useRef(null);

 useEffect(() => {
   if (slideRef.current) {
     const width = slideRef.current.clientWidth;
     console.log('Width:', width);
   }
 }, []);


 const [show, setShow] = useState();

 const wrapperRef = useRef(null);

 const handleClick2 = () => {

   setShow(true);
 };

 useEffect((e) => {
  document.addEventListener("click", handleClickOutside, false);
  return () => {
    document.removeEventListener("click", handleClickOutside, false);
  };
}, []);

const handleClickOutside = (event) => {
  if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    setShow(false);
  } else {
  }
};

  return (
<Fragment>
    <Container fluid className="padding-0">


    <div
    onClick={() => {toggleDiv();toggleText();}}
    style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
    className={isExpanded ? 'expanded two' : 'expanded'}>

    <i className={changeText ? "far fa-compress-arrows-alt" : "far fa-expand-alt"}></i>&nbsp;<p>{changeText ? "Collapse Filters" : "Expand Filters"}</p>
  </div>
        <div

        className="inner">



        <div

          ref={slideRef}
          id="slide"
          className={isExpanded ? "out" : "in"}
          style={{
          display: "flex",
          position: "absolute",
          opacity: isExpanded ? 1 : 0,

        }}>


            <Dropdown

            fieldNameSuggestions3={fieldNameSuggestions3}
            setSelectedCheckboxes={setSelectedCheckboxes}
            selectedCheckboxes={selectedCheckboxes}

          />

          <Checkbox

            fieldNameSuggestions={fieldNameSuggestions}
            setSelectedCheckboxes={setSelectedCheckboxes}
            selectedCheckboxes={selectedCheckboxes}

          />


</div>
        </div>

        <Navbar collapseOnSelect expand="lg" ref={navbarRef}>
          <Container fluid>

          <img className="logo" src="https://ixd-studio.wesdemo.com/path/images/path-logo.svg"/>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav className="align-items-center">



                <Navbar.Text>

                    <p className="absoName">{boardTitle}</p>

                </Navbar.Text>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      <div>

        <div id="slideOut2" className={show ? "showRight" : ""} ref={wrapperRef}>
          <div>
            <div
              id="one"
              className="openTab bottomShadow"
              role="button"
              tabIndex="0"
             onClick={() => setShow(true)}

            >
              <p className="black">
                <i class="fal fa-list"></i>

              </p>
            </div>


          <div
            className="modal-content"

          >
            <div className="modal-header">
              <div className="closeThisPlease" id="close1">
                <h4 className="blackLarger text-center changeTitle">Additional Filters</h4>

                <Button
                  role="button"
                  className="close white"
                  data-dismiss="modal"
                  id="closeThisPlease1"
                  onClick={() => setShow(false)}
                >
                  &#10005;
                </Button>
              </div>
            </div>

            <div className="modal-body block-style-thirteen">


            <Accordions

              fieldNameSuggestions={fieldNameSuggestions}
              setSelectedCheckboxes={setSelectedCheckboxes}
              selectedCheckboxes={selectedCheckboxes}

            />





            </div>

          </div>

        </div>
      </div>
        </div>




    </Fragment>
  );
};
