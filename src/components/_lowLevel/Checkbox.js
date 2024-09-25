import React, {
  Fragment,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import {
  Accordion,
  Col,
  Form,
  Row,
  Button,
  Nav,
  AccordionCollapse,
  Modal
} from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { Switch } from "@mui/material";


import Map from "./Map.js";

const Checkbox = ({
  fieldOptions,
  setFieldOptions,
  selectedFields,
  setSelectedFields,
  fieldNameSuggestions,
  setFieldNameSuggestions,
  selectedCheckboxes,
  setSelectedCheckboxes,
  boardTitle,
  setBoardTitle,
  filter,
  expression,
  onChange,
  children
}) => {
  const { core40SDK: sdk, extensionSDK } = useContext(ExtensionContext);

  const handleFieldSelection = (field, value) => {
    let _selectedCheckboxes = { ...selectedCheckboxes };
    let { title } = field;
    if (!_selectedCheckboxes.hasOwnProperty(title)) {
      _selectedCheckboxes[title] = [];
    }
    if (_selectedCheckboxes[title]?.includes(value)) {
      let index = _selectedCheckboxes[title].indexOf(value);
      _selectedCheckboxes[title].splice(index, 1);

    } else {
      _selectedCheckboxes[title].push(value);
    }
    if (_selectedCheckboxes[title].length == 0) {
      delete _selectedCheckboxes[title];
    }
    setSelectedCheckboxes(_selectedCheckboxes);
  };

  // useEffect(() => {
  //   console.log("fields", fieldNameSuggestions);
  // }, [fieldNameSuggestions]);
  //




  const handleSelectAll = (field) => {
    const allOptions = field.suggestions;
    const allSelected = allOptions.every((option) =>
      selectedCheckboxes[field.name]?.includes(option)
    );
    setSelectedCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [field.name]: allSelected ? [] : [...allOptions],
    }));
  };

  const [show5, setShow5] = React.useState();

   const wrapperRef = React.useRef(null);

   React.useEffect(() => {
     document.addEventListener("click", handleClickOutside, false);
     return () => {
       document.removeEventListener("click", handleClickOutside, false);
     };
   }, []);

   const handleClickOutside = (event) => {
     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
       setShow5(true);

     }
   };

  const [open, setOpen] = React.useState(false);



  const filteredSuggestions = fieldNameSuggestions.filter(suggestion =>

    suggestion.title.toLowerCase() === 'country' ||
    suggestion.title.toLowerCase() === 'category' ||
    suggestion.title.toLowerCase() === 'account id' ||
    suggestion.title.toLowerCase() === 'date range' ||
    suggestion.title.toLowerCase() === 'account name' ||
    suggestion.title.toLowerCase() === 'state'
  );





 const [openModals, setOpenModals] = useState({});

 const handleShow = (fieldIndex) => {
   setOpenModals({ ...openModals, [fieldIndex]: true });
 };

 const handleClose = (fieldIndex) => {
   setOpenModals({ ...openModals, [fieldIndex]: false });
 };

const [openStateModals, setOpenStateModals] = useState({});



  return (
    <Fragment>



    {fieldNameSuggestions.map((field, fieldIndex) => (


  <div key={fieldIndex}
  className={
          filteredSuggestions.some(suggestion => suggestion.title === field.name)
            ? 'custom'
            : ''
        }>
    {filteredSuggestions.some(suggestion => suggestion.title === field.name) && (
      <>
        <Button className="pills" onClick={() => handleShow(fieldIndex)}>


               {field.title.toLowerCase() === 'country' && (
                <i className="fal fa-globe"></i>
              )}
              {field.title.toLowerCase() === 'category' && (
                <i class="fal fa-cabinet-filing"></i>

              )}
              {field.title.toLowerCase() === 'account id' && (
                <i class="fal fa-id-card"></i>
              )}
                {field.title.toLowerCase() === 'date range' && (
                  <i class="fal fa-calendar-alt"></i>
                )}

                {field.title.toLowerCase() === 'account name' && (
                  <i class="fal fa-user"></i>
                 )}


                 {field.title.toLowerCase() === 'state' && (
                   <i className="fal fa-map-marker-alt"></i>
                 )}

              &nbsp;{field.name}
        </Button>



    <Modal show={openModals[fieldIndex]} onHide={() => handleClose(fieldIndex)} className={field.title.toLowerCase() === 'state' ? 'stateModal' : ""}>
       <Modal.Header closeButton>

       <Modal.Title>{field.name}</Modal.Title>
     </Modal.Header>

         {field.title.toLowerCase() === 'state' && (
         <Modal.Body className="center">


         <Map/>


          </Modal.Body>
        )}
 {field.title.toLowerCase() !== 'state' && (
     <Modal.Body className="pb-4">





     <Switch
         className="allOptions clear first"
         label="Select All"
         onClick={() => handleSelectAll(field)}
         checked={field.suggestions.every((option) =>
           selectedCheckboxes[field.title]?.includes(option)
         )}
       />

         <div className="divider"></div>

         <div class="scrollInside">
           {field.suggestions.map((option, optionIndex) => (
             <Form.Group key={optionIndex}>
               <Form.Check
                 onClick={() => handleFieldSelection(field, option)}
                 type="checkbox"
                 className=""
                 label={option}
                 checked={selectedCheckboxes[field.title]?.includes(
                   option
                 )}
                 name="accountGroups"
                 id={`id_${fieldIndex}_${optionIndex}`}
                 value={option}
               />
             </Form.Group>
           ))}
         </div>


    </Modal.Body>

        )}


   </Modal>


            </>
              )}
          </div>

        ))}




    </Fragment>
  );
};

export default Checkbox;
