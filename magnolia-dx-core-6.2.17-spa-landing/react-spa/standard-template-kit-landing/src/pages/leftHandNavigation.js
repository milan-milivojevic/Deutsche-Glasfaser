import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../css.css';
import LeftHandNav from '../components/navigation/LeftHandNav';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ForwardedLeftHandNav = React.forwardRef(LeftHandNav);

function LeftHandNavigationPage (props) {
  const { title, bannerSection, mainSection } = props;

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? "editMode" : "";

  const leftNavRef = React.useRef(null);
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    var interval = setInterval(() => {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const topNav = document.querySelector('.topNav');
      const lefNav = document.querySelector('.leftHandNav > .menus');
      const headerHeight = header.getBoundingClientRect().height;
      const footerHeight = footer.getBoundingClientRect().height;
      const topNavHeight = topNav.getBoundingClientRect().height;
      const calcHeight = headerHeight + topNavHeight + footerHeight;
      if (leftNavRef.current) {
        leftNavRef.current.style.height = `calc(100vh - ${calcHeight}px)`;
        leftNavRef.current.style.bottom = footerHeight + 'px';
        lefNav.style.maxHeight = `calc(100% + ${footerHeight}px)`;
      }
      if (leftNavRef.current) {
        contentRef.current.style.minHeight = `calc(100vh - ${calcHeight}px)`;
      }
    }, 300)
    setTimeout(function( ) { clearInterval( interval ); }, 4500);
  }, []);

  setTimeout(() => {
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
    }
  }, 1000);

  return (
    <HelmetProvider>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      { (editMode !== "editMode") &&
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }
      <div className='leftNavPage'>
        <ForwardedLeftHandNav ref={leftNavRef}></ForwardedLeftHandNav>
        <div className='rightMainContent' ref={contentRef}>
          <div className='bannerSection'>{bannerSection && <EditableArea content={bannerSection} />}</div>
          <div>{mainSection && <EditableArea content={mainSection} />}</div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default LeftHandNavigationPage;