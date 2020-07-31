import {ReactPortal, ReactNode} from 'react'
import {createPortal} from 'react-dom'
import {VerticalAlignment, Alignment} from '../Types'

const portalElementID = 'cf-portal'

const createPortalElement = (): HTMLElement => {
  const portalElement = document.createElement('div')
  portalElement.setAttribute('class', portalElementID)
  portalElement.setAttribute('id', portalElementID)

  document.body.appendChild(portalElement)

  return portalElement
}

const getPortalElement = (): HTMLElement => {
  let portal = document.getElementById(portalElementID)

  if (!portal) {
    portal = createPortalElement()
  }

  return portal
}

const createNotificationContainer = (
  x: Alignment,
  y: VerticalAlignment
): HTMLElement => {
  const container = document.createElement('div')
  container.setAttribute(
    'class',
    `cf-notification-container cf-notification__${x} cf-notification__${y}`
  )
  container.setAttribute('id', `cf-notification-container-${x}-${y}`)

  const portal = getPortalElement()

  portal.appendChild(container)

  return container
}

const getNotificationContainer = (
  x: Alignment,
  y: VerticalAlignment
): HTMLElement => {
  let container = document.getElementById(`cf-notification-container-${x}-${y}`)

  if (!container) {
    container = createNotificationContainer(x, y)
  }

  return container
}

export const usePortal = () => {
  const portal = getPortalElement()

  const addElementToPortal = (element: ReactNode): ReactPortal => {
    return createPortal(element, portal)
  }

  const addNotificationToPortal = (
    element: ReactNode,
    x: Alignment,
    y: VerticalAlignment
  ): ReactPortal => {
    const container = getNotificationContainer(x, y)

    return createPortal(element, container)
  }

  const addEventListenerToPortal = portal.addEventListener
  const removeEventListenerToPortal = portal.removeEventListener

  return {
    addElementToPortal,
    addNotificationToPortal,
    addEventListenerToPortal,
    removeEventListenerToPortal,
  }
}
