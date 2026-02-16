import React from "react";

import {getAPIBase} from "../../helpers/AppHelpers";
import LeftNavMenuItem from "./LeftNavMenuItem";

function LeftHandNav(props, ref) {

  const [navItems, setNavItems] = React.useState([]);

  React.useEffect(() => {

    async function fetchNav() {
      const apiBase = getAPIBase();
      const url = apiBase + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
      const response = await fetch(url);
      const data = await response.json();

      let lvl1Items = data["@nodes"].map((nodeName) => {
        return data[nodeName];
      });

      let lvl2Items = lvl1Items
        .flatMap((nodeName) =>
          nodeName["@nodes"].map((childName) => nodeName[childName])
        )
        .filter((item) => item !== undefined);

      const addChildElements = (item) => {
        const navArrObj = {
          name: item.title || item["@name"],
          path: item["@path"],
          id: item["@id"],
          hide: item.hide || false
        };        
        if (item["@nodes"].length > 0) {
          navArrObj.children = getChildren(item);
        }
        return navArrObj;
      };

      const getChildren = (item) => {
        const childrenArr = [];
        item["@nodes"].forEach((childItem) => {
          const child = item[`${childItem}`];
      
          // Check if child.hide is true or "true"
          const isHidden = child.hide === true || child.hide === "true";
      
          // Only add childObject if it's not hidden
          if (!isHidden) {
            const childObject = {
              name: child.title || child["@name"],
              path: child["@path"],
              id: child["@id"],
              hide: child.hide || false, // Assign false if hide is undefined
              children: [],
            };
      
            // Recursively get children if any
            if (child["@nodes"].length > 0) {
              childObject.children = getChildren(child);
            }
      
            childrenArr.push(childObject);
          }
        });
        return childrenArr;
      };
      

      let navArr = [];      
      lvl2Items.forEach((item) => {
        navArr.push(addChildElements(item));
      });

      setNavItems([...navArr]);
    }

    if (navItems.length < 1) {
      fetchNav();
    }
  }, [navItems]);

  return (
    <nav className="leftHandNav" ref={ref}>        
      <ul className = "menus"> {
          navItems.map((item, index) => {            
            const depthLevel = 1;
            
            return (
              <LeftNavMenuItem
                item = {item}
                key = {index}
                itemIndex = {index}
                depthLevel = {depthLevel}
              />
            );
          })
      } 
      </ul> 
    </nav>
  )
};

export default LeftHandNav;