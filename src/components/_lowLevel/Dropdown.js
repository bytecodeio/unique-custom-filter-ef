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

const Dropdown = ({
  fieldOptions,
  setFieldOptions,
  selectedFields,
  setSelectedFields,
  fieldNameSuggestions3,
  setFieldNameSuggestions3,
  setFieldNameSuggestions,
  selectedCheckboxes,
  setSelectedCheckboxes,
  boardTitle,
  setBoardTitle,
  filter,
  expression,
  onChange,

}) => {
  const { core40SDK: sdk, extensionSDK } = useContext(ExtensionContext);

  const handleFieldSelection = (field, value) => {
    let _selectedCheckboxes = { ...selectedCheckboxes };
    let { title } = field;
    _selectedCheckboxes[title] = value;

    setSelectedCheckboxes(_selectedCheckboxes);
  };

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


const [selectedValue, setSelectedValue] = useState(null);

const [searchTerm, setSearchTerm] = useState(''); // State for search term


const filteredSuggestions = fieldNameSuggestions3.filter(suggestion =>
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

 console.log(filteredSuggestions.length)



  return (
    <Fragment>

      {fieldNameSuggestions3.map((field, fieldIndex) => (
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




                <Modal show={openModals[fieldIndex]} onHide={() => handleClose(fieldIndex)}>
                   <Modal.Header closeButton>

                   <Modal.Title>{field.name}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body className="pb-4">

                <input
                className="form-control mb-3"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                />

                  <div className="scrollInside">
                    {field.suggestions.filter((option) =>
                      option.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((option, optionIndex) => (
                      <Form.Group key={optionIndex}>
                        <Form.Check
                          // Existing `onChange` handler remains unchanged
                          onChange={() => {
                            setSelectedValue(option);
                            handleFieldSelection(field, option);
                          }}
                          type="radio"
                          className=""
                          label={option}
                          checked={selectedValue === option}
                          name="accountGroups"
                          id={`id_${fieldIndex}_${optionIndex}`}
                          value={option}
                        />
                      </Form.Group>
                    ))}
                    {searchTerm && !field.suggestions.some((option) =>
                      option.toLowerCase().includes(searchTerm.toLowerCase())
                    ) && (
                      <div>No results found</div>
                    )}
                  </div>

                      </Modal.Body>

                     </Modal>
                       </>
                )}

          </div>

        ))}



    </Fragment>
  );
};

export default Dropdown;
