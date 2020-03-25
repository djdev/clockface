// Libraries
import React, {forwardRef, useState, useEffect} from 'react'
import classnames from 'classnames'

// Types
import {
  ComponentSize,
  StandardFunctionProps,
  Alignment,
  IconFont,
  Orientation,
} from '../../Types'

// Components
import {Icon} from '../Icon'
import {ClickOutside} from '../ClickOutside/ClickOutside'

export interface ResponsiveTabsProps extends StandardFunctionProps {
  /** Size of tabs */
  size?: ComponentSize
  /** Alignment of tabs within container (large displays) */
  alignment?: Alignment
  /** Layout axis of tabs */
  orientation?: Orientation
  /** When the viewport is wider than this amount, render as tabs */
  dropdownBreakpoint?: number
  /** Label that only appears on small displays to indicate which tab is active when the component is collapsed  */
  dropdownLabel?: string
  /** Alignment of tabs within container (small displays) */
  dropdownAlignment?: Alignment
}

export type ResponsiveTabsRef = HTMLElement

export const ResponsiveTabsRoot = forwardRef<
  ResponsiveTabsRef,
  ResponsiveTabsProps
>(
  (
    {
      id,
      size = ComponentSize.Medium,
      style,
      testID = 'tabs',
      children,
      alignment = Alignment.Left,
      className,
      orientation = Orientation.Horizontal,
      dropdownLabel = 'dropdownLabel',
      dropdownAlignment = Alignment.Center,
      dropdownBreakpoint,
    },
    ref
  ) => {
    const [screenWidth, setScreenWidth] = useState<number>(9999)
    const [state, setState] = useState<'visible' | 'hidden'>('hidden')

    const tabsClass = classnames('cf-tabs', {
      [`cf-tabs__align-${alignment}`]: alignment,
      [`cf-tabs__${orientation}`]: orientation,
      [`cf-tabs__${size}`]: size,
      [`${className}`]: className,
    })

    const tabsDropdownClass = classnames('cf-tabs--dropdown', {
      [`cf-tabs--dropdown__${state}`]: state,
      [`cf-tabs--dropdown__align-${dropdownAlignment}`]: dropdownAlignment,
      [`cf-tabs--dropdown__${size}`]: size,
      [`${className}`]: className,
    })

    useEffect((): (() => void) => {
      if (!!dropdownBreakpoint) {
        setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
      }

      return (): void => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    const handleResize = (): void => {
      setScreenWidth(window.innerWidth)
    }

    const handleToggleMenu = (): void => {
      if (state === 'visible') {
        setState('hidden')
      } else {
        setState('visible')
      }
    }

    const handleHideMenu = (): void => {
      if (state === 'visible') {
        setState('hidden')
      }
    }

    if (!!dropdownBreakpoint && screenWidth <= dropdownBreakpoint) {
      return (
        <ClickOutside onClickOutside={handleHideMenu}>
          <nav
            id={id}
            ref={ref}
            style={style}
            onClick={handleToggleMenu}
            className={tabsDropdownClass}
            data-testid={testID}
          >
            <div className="cf-tabs--dropdown-label">
              {dropdownLabel}
              <Icon
                glyph={IconFont.CaretDown}
                className="cf-tabs--dropdown-icon"
              />
            </div>
            <div className="cf-tabs--dropdown-menu">{children}</div>
          </nav>
        </ClickOutside>
      )
    }

    return (
      <nav
        id={id}
        ref={ref}
        style={style}
        className={tabsClass}
        data-testid={testID}
      >
        {children}
      </nav>
    )
  }
)

ResponsiveTabsRoot.displayName = 'ResponsiveTabs'
