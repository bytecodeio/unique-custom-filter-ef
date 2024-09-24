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

const Accordions = ({
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

    suggestion.title.toLowerCase() === 'status' ||
    suggestion.title.toLowerCase() === 'risk level' ||

    suggestion.title.toLowerCase() === 'age range' ||
    suggestion.title.toLowerCase() === 'gender' ||
    suggestion.title.toLowerCase() === 'race ethnicity'
  );








  return (
    <Fragment>

    {fieldNameSuggestions.map((field, index) => (

      <div key={index} className="newAccordion">
      {filteredSuggestions.some(suggestion => suggestion.title === field.name) && (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>{field.name}</Accordion.Header>

            <Accordion.Body>

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
                      id={`id_${index}_${optionIndex}`}
                      value={option}
                    />
                  </Form.Group>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
          )}
      </div>

    ))}


    </Fragment>
  );
};

export default Accordions;
