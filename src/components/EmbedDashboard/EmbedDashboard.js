import React, {Fragment, useCallback, useContext, useState, useEffect } from "react";
import { EmbedContainer } from "./EmbedContainer/EmbedContainer";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { Accordion, Col, Form, Row, Button, Nav } from "react-bootstrap";


export const EmbedDashboard = ({
  dashboardId,
  showDashboardFilters,
  fieldNameSuggestions,
  fieldNameSuggestions2,
  setSelectedCheckboxes,
  selectedCheckboxes,
  selectedDashboardId,
  setSelectedDashboardId,
  boardTitle
}) => {

  const { core40SDK: sdk, extensionSDK } = useContext(ExtensionContext);

  const [dashboard, setDashboard] = useState();

  // State for all the available filters for the embedded dashboard
  const [dashboardFilters, setDashboardFilters] = useState();

  // // State for the filter values, selected by the filter components located outside the embedded dashboard
  const [filterValues, setFilterValues] = useState([selectedCheckboxes]);

  // const [selectedFilters, setSelectedFilters] = useState(
  //   selectedCheckboxes
  // );

  if (dashboard) {
    let _formatFilters = {}
    Object.entries(selectedCheckboxes).map(([key,value]) => {
      _formatFilters[key] = value.toString()
    })
    // Using the dashboard state, we are sending a message to the iframe to update the filters with the new values
    dashboard.send("dashboard:filters:update", {
      filters: _formatFilters,
    });
    // The "dashboard:run" message has to be sent for the filter change to take effect
    dashboard.send("dashboard:run");
  }

    useEffect(() => {
      const initialize = async () => {
        const filters = await sdk.ok(
          sdk.dashboard(selectedDashboardId, "dashboard_filters")
        );

        setDashboardFilters(filters["dashboard_filters"]);
      };
      initialize();
    }, [selectedDashboardId]);

    useEffect(() => {
      if (dashboard) {
        let _formatFilters = {}
        Object.entries(selectedCheckboxes).map(([key,value]) => {
          _formatFilters[key] = value.toString()
        })
        // Using the dashboard state, we are sending a message to the iframe to update the filters with the new values
        dashboard.send("dashboard:filters:update", {
          filters: _formatFilters,
        });
        // The "dashboard:run" message has to be sent for the filter change to take effect
        dashboard.send("dashboard:run");
      }

    },[selectedCheckboxes])


  // const handleFilterChange = (newFilterValue, filterName) => {

  //   // Using the dashboard state, we are sending a message to the iframe to update the filters with the new values
  //   dashboard.send("dashboard:filters:update", {
  //     filters: {
  //       [filterName]: newFilterValue,
  //     },
  //   });
  //   // The "dashboard:run" message has to be sent for the filter change to take effect
  //   dashboard.send("dashboard:run");
  // };

  // Set the state of the dashboard so we can update filters and run
  const handleDashboardLoaded = (dashboard) => {
    setDashboard(dashboard);
  };


    //
    // const handleFilterChanged = (dashboard) => {
    //   setDashboard(dashboard);
    //
    // };




//  const [dashboard, setDashboard] = useState();


//
// console.log(selectedCheckboxes)
//
// // Update embedded dashboard filters any time selectedFilters state changes
// useEffect(() => {
//   if (dashboard) {
//     // const lookerFormattedFilters = {};
//     // Object.entries(selectedFilters).forEach(([filterName, value]) => {
//     //   lookerFormattedFilters[filterName] = value.join(",");
//     // });
//     dashboard.send("dashboard:filters:update", {
//       filters: setSelectedCheckboxes,
//     });
//     dashboard.send("dashboard:run");
//   }
// }, [selectedCheckboxes]);






  const embedDashboard = useCallback(
    (embedContainer) => {
      const hostUrl = extensionSDK.lookerHostData?.hostUrl;
      if (embedContainer && dashboardId && hostUrl) {
        embedContainer.innerHTML = "";
        const embedUrl = `${hostUrl}/embed/dashboards/${dashboardId}?_theme={"show_filters_bar":false, "show_title":false}&embed_domain=${hostUrl}&sdk=2&sandboxed_host=true`;


    // const embedUrl = `${hostUrl}/embed/dashboards/EcDB3WulAKaZUhLE0UDPil?theme=dark&_theme={"show_filters_bar":false, "show_title":true}&embed_domain=${hostUrl}&sdk=2&sandboxed_host=true`;

        LookerEmbedSDK.init(hostUrl);
        LookerEmbedSDK.createDashboardWithUrl(embedUrl)

          // .withParams({ _theme: '{"show_filters_bar":false}' })
          .appendTo(embedContainer)

          //.on('dashboard:filters:changed', handleDashboardLoaded)

          .build()
          .connect()
          // .then()
          .then((dash) => setDashboard(dash))
          .catch((e) => console.error(e));
      }
    },
    [dashboardId, showDashboardFilters]
  );


   const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, []);



  return (
    <Fragment>
    {/*<Fragment>
    {dashboardFilters?.map((filter) => {


    <EmbedContainer
    ref={embedDashboard}
    fieldNameSuggestions={fieldNameSuggestions}
    setSelectedCheckboxes={setSelectedCheckboxes}
    selectedCheckboxes={selectedCheckboxes}
    filter={filter}
    expression={filterValues[filter.name]}
    onChange={(event) => handleFilterChange(event, filter.name)}
    key={filter.id}
    />
      })}
  </Fragment>*/}


      <EmbedContainer
      ref={embedDashboard}
      fieldNameSuggestions={fieldNameSuggestions}
      fieldNameSuggestions2={fieldNameSuggestions2}
      setSelectedCheckboxes={setSelectedCheckboxes}
      selectedCheckboxes={selectedCheckboxes}

      />
</Fragment>

    )
};
