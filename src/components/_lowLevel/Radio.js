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
} from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { Switch } from "@mui/material";

const Radio = ({
  fieldOptions,
  setFieldOptions,
  selectedFields,
  setSelectedFields,
  fieldNameSuggestions2,
  setFieldNameSuggestions2,
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

useEffect(() => { console.log(selectedCheckboxes, 'selectedCheckboxes')}, [selectedCheckboxes])


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




return (
<Fragment>


    {fieldNameSuggestions2.map((field, index) => (
      <div key={index} className="custom">


        <div className="d-flex flex-wrap one">
          <p className="buttonP">{field.name}</p>

          {field.field?.enumerations?.map((option, optionIndex) => ( // Check for nested field object
            <Form.Group key={optionIndex}>
              <Form.Check
                onClick={() => handleFieldSelection(field, option.value)} // Use value for selection
                type="radio" // Use radio buttons
                className=""
                label={option.label}
                checked={selectedCheckboxes[field.title]?.includes(option.value)}
                name={field.title} // Use field title as name
                id={`id_${index}_${optionIndex}`}
                value={option.value}
              />
            </Form.Group>
          ))}
        </div>
      </div>
    ))}

</Fragment>
);
};

export default Radio;
