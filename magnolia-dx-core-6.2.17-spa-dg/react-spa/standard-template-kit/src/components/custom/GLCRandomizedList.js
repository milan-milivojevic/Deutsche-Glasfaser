import React, { useState, useEffect } from 'react';
import { EditableArea } from '@magnolia/react-editor';
import shuffle from 'lodash/shuffle';

function GLCRandomizedList ({ 
  column1,
  layout,
  columnGap,
  rowGap,
  width,
  position,
  headline,
  headlineLevel,
  headlineFontFamily,
  headlinePosition,
  headlineFontSize,
  headlineColor,
  headlineLineHeight,
  headlineLetterSpacing,
  headlinePaddingTop,
  headlinePaddingRight,
  headlinePaddingBottom,
  headlinePaddingLeft,
  wrapperPaddingLeft,
  wrapperPaddingBottom,
  wrapperPaddingRight,
  wrapperPaddingTop,
  wrapperBorderWidth,
  wrapperBorderStyle,
  wrapperBorderColor,
  wrapperBorderRadius
}) {  

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? "editMode" : "";

  const [randomizedComponents, setRandomizedComponents] = useState([]);

  const column1Nodes = column1['@nodes'] || [];
  const column1Components = {};
  const column1Info = {};
  const column1ComponentsRandomized = {};

  console.log("column1Nodes");
  console.log(column1Nodes);

  Object.keys(column1).forEach(key => {
    // Razdvajanje ključeva na osnovu prisustva u nizu @nodes
    if (column1Nodes.includes(key)) {
      column1Components[key] = column1[key];
    } else {
      column1Info[key] = column1[key];
    }
  });

   useEffect(() => {
    if (column1 && column1['@nodes']) {
      // Kopiraj @nodes i izvrši nasumično sortiranje
      const shuffledNodes = shuffle([...column1['@nodes']]);

      // Postavi nasumično sortirane @nodes u state
      setRandomizedComponents(shuffledNodes.slice(0, 6)); // Odaberite prvih 6 nasumičnih nodova
    }
  }, [column1]);

  column1Info['@nodes'] = randomizedComponents;

  console.log("column1Components");
  console.log(column1Components);
  console.log("column1Info");
  console.log(column1Info);

  Object.keys(column1Components).forEach(key => {
    if (randomizedComponents.includes(key)) {
      column1ComponentsRandomized[key] = column1Components[key];
    }
  });

  console.log("column1ComponentsRandomized");
  console.log(column1ComponentsRandomized);

  let column = {
    ...column1ComponentsRandomized,
    ...column1Info
  };

  console.log("column");
  console.log(column);

  if (editMode === "editMode") {
    column = column1
  }

  const HeadlineLevel = headlineLevel || "h1";

  const listComponentStyles = {
    width: width || null,
    margin: position || null
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || null,
    textAlign:  headlinePosition || null,
    fontSize: headlineFontSize || null,
    lineHeight: headlineLineHeight || null,
    color: headlineColor || null,
    letterSpacing:  headlineLetterSpacing || null,
    paddingTop: headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || null,
  }

  const listStyles = {
    gridColumnGap: columnGap || null,
    gridRowGap: rowGap || null,
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,
    borderWidth: wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || null,
    borderColor: wrapperBorderColor || null,
    borderRadius: wrapperBorderRadius || null                     
  }

  return (
    <div className={`glcRandomizedListWrapper ${editMode}`}>
      <div className='glcRandomizedListComponent' style={listComponentStyles}>
      {headline && <HeadlineLevel className="headline" style={headlineStyles}>{headline || null}</HeadlineLevel>}   
      <ul className={`glcRandomizedList`}style={listStyles}>
        { column1 && <EditableArea className={`listComponents glcRandomizedListArea layout${layout}`} content={column}/>}
      </ul>
      </div>
    </div>
  );
}


export default GLCRandomizedList;