import React, { useState, useEffect, useRef } from 'react';
import { EditableArea } from '@magnolia/react-editor';
import styled from 'styled-components';

const Wrapper = styled.div`
  .tab:hover {
    background-color: ${(props) => props.hovTabBgColor && props.hovTabBgColor + "!important"};
    color: ${(props) => props.hovTitleColor && props.hovTitleColor + "!important"};
  }
  .tab.activeTab {
    background-color: ${(props) => props.activeTabBgColor && props.activeTabBgColor + "!important"};
	color: ${(props) => props.activeTitleColor && props.activeTitleColor + "!important"};
  }
  .dg_child_tabs .tabTitles .tab {
    width: ${(props) => props.activeTabsLength && `calc(100% / ${props.activeTabsLength}) !important`};
  }
  .dg_child_tabs .glider {
    width: ${(props) => props.activeTabsLength && `calc(100% / ${props.activeTabsLength}) !important`};
  }
`;

function TabsConfig ({
	multi,
	tabsComponents1,
	tabsComponents2,
	tabsComponents3,
	tabsComponents4,
	tabsComponents5,
	tabsComponents6,
	tabsComponents7,
	tabsComponents8,
	tabsComponents9,
	tabsComponents10,
	groupPaddingTop,
	groupPaddingRight,
	groupPaddingBottom,
	groupPaddingLeft,
	groupPosition,
	groupWidth,
	tabsDefaultBackColor,
	tabsHoverBackColor,
	tabsActiveBackColor,
	titleFontSize,
	titleLineHeight,
	titleLetterSpacing,
	titleColor,
	titleHoverColor,
	titleActiveColor,
	titlePosition,
	titleFontFamily,
	titleLevel,
	titleBold,
	titleItalic,
	titlePaddingTop,
	titlePaddingRight,
	titlePaddingBottom,
	titlePaddingLeft,
	tabsBorderWidth,
	tabsBorderStyle,
	tabsBorderColor,
	tabsBorderRadius,
	tabsGap,
	tabsWidth,
	tabsLayout,
	styleName
}) {

	const myRef = useRef(null);

	const handleClick = () => {
		const copyText = myRef.current.innerText;
		navigator.clipboard.writeText(copyText);
	};


	const [activeTab, setActiveTab] = useState(() => {
		if (window.sessionStorage.getItem('activeTab') !== null || 'undefined') {
			return (JSON.parse(window.sessionStorage.getItem("activeTab")) || 1 );
		} else {
			return 1;
		}
	});

	const toggleTab = (index) => {
		setActiveTab(index);
	}

	useEffect(() => {
		window.sessionStorage.setItem("activeTab", activeTab);
	}, [activeTab]);

	useEffect(() => {
		setActiveTab(JSON.parse(window.sessionStorage.getItem("activeTab")));
	}, []);


	const titles = [];
	for (let i = 0; i <= 10; i++) {
		titles.push(multi[`multi${i}`]?.title);
	}
	const activeTitles = titles.filter((item) => {
		return item !== undefined;
	})


	const tabsComponents = [tabsComponents1, tabsComponents2, tabsComponents3, tabsComponents4, tabsComponents5, tabsComponents6, tabsComponents7, tabsComponents8, tabsComponents9, tabsComponents10];
	const activeTabsComponents = [];

	titles.forEach((item, i) => {
		if (item) {
			activeTabsComponents.push(tabsComponents[i]);
		}
	})

	const activeTabsLength = activeTabsComponents.length;


	const HeadlineLevel = titleLevel || "h3";


	const defTabBgColor = tabsDefaultBackColor || null;
	const hovTabBgColor = tabsHoverBackColor || null;
	const activeTabBgColor = tabsActiveBackColor || null;

	const defTitleColor = titleColor || null;
	const hovTitleColor = titleHoverColor || null;
	const activeTitleColor = titleActiveColor || null;


	const tabsGroupStyles = {
		width: groupWidth || null,
		margin: groupPosition || null,
		paddingTop: groupPaddingTop || null,
		paddingRight: groupPaddingRight || null,
		paddingBottom: groupPaddingBottom || null,
		paddingLeft: groupPaddingLeft || null
	}

	const tabTitlesStyles = {
		gap: tabsGap || null,
		backgroundColor: defTabBgColor || null,
		borderRadius: tabsBorderRadius || null,
	}

	return (
		<Wrapper className='tabsWrapper configComponents'
			hovTabBgColor={hovTabBgColor}
			activeTabBgColor={activeTabBgColor}
			hovTitleColor={hovTitleColor}
			activeTitleColor={activeTitleColor}
			activeTabsLength={activeTabsLength}
		>
			<div className="copyStyleName">
				<h4>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h4>
				<button onClick={handleClick}>
				Copy Style Name
				</button>
			</div>
			<section className={`tabsGroup ${styleName}`} style={tabsGroupStyles}>
				<div className={`tabTitles`} style={tabTitlesStyles}>
					{activeTitles.map((title, i) =>
						<HeadlineLevel onClick={() => toggleTab(i + 1)} key={i} className={activeTab === i + 1 ? `tab activeTab activeTab${activeTab}` : `tab`}
							style={{
									flex: tabsWidth || "auto",
									paddingTop: titlePaddingTop || null,
									paddingRight: titlePaddingRight || null,
									paddingBottom: titlePaddingBottom || null,
									paddingLeft: titlePaddingLeft || null,
									fontSize: titleFontSize || null,
									lineHeight: titleLineHeight || null,
									letterSpacing: titleLetterSpacing || null,
									fontFamily: titleFontFamily || null,
									textAlign: titlePosition || null,
									fontWeight: titleBold || null,
									fontStyle: titleItalic || null,
									color: activeTab === i + 1 ? activeTitleColor : defTitleColor,
									backgroundColor: defTabBgColor,
									borderBottomWidth: activeTab === i + 1 ? tabsBorderWidth || null : null,
									borderBottomStyle: activeTab === i + 1 ? tabsBorderStyle || null : null,
									borderBottomColor: activeTab === i + 1 ? tabsBorderColor || null : null,
									borderRadius: tabsBorderRadius || null,
								}}
						>{title}</HeadlineLevel>
					)}
					<div class="glider"></div>
				</div>
				<div className={`tabsContent`}>
					{activeTabsComponents.map((tabComponents, i) =>
						<div key={i} className={activeTab === i + 1 ? `tabContent tabActiveContent` : `tabContent`}>
							{tabComponents && <EditableArea className={`tabsArea`} content={tabComponents} />}
						</div>
					)}
				</div>
			</section>
		</Wrapper>
	);
}


export default TabsConfig;