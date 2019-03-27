// Libraries
import React, {Component} from 'react'

// Components
import {FormLabel} from './FormLabel'
import {FormElementError} from './FormElementError'
import {FormHelpText} from './FormHelpText'

interface DefaultProps {
  /** Test ID for Integration Tests */
  testID?: string
}

interface PassedProps {
  /** Label Text */
  label: string
  /** Input instruction text */
  helpText?: string
  /** Text to be displayed on error */
  errorMessage?: string
  /** Element to be displayed along with label */
  labelAddOn?: () => JSX.Element
  /** Whether this field is required to submit form, adds red required asterisk */
  required?: boolean
}

type Props = DefaultProps & PassedProps

export class FormElement extends Component<Props> {
  public static defaultProps: DefaultProps = {
    testID: 'form--element',
  }

  public render() {
    const {children, testID} = this.props

    return (
      <div className="form--element" data-testid={testID}>
        {this.label}
        {children}
        {this.errorMessage}
        {this.helpText}
      </div>
    )
  }

  private get label(): JSX.Element | undefined {
    const {label, required} = this.props

    if (!label) {
      return
    }

    return (
      <FormLabel label={label} required={required}>
        {this.labelChild}
      </FormLabel>
    )
  }

  private get labelChild(): JSX.Element | undefined {
    const {labelAddOn} = this.props

    if (!labelAddOn) {
      return
    }

    return labelAddOn()
  }

  private get helpText(): JSX.Element | undefined {
    const {helpText} = this.props

    if (!helpText) {
      return
    }

    return <FormHelpText text={helpText} />
  }

  private get errorMessage(): JSX.Element | undefined {
    const {errorMessage} = this.props

    if (!errorMessage) {
      return
    }

    return <FormElementError message={errorMessage} />
  }
}
