import React from 'react'
import { Button } from 'reactstrap'

/**
 * @param {*} props: addFunction, className, children
 */
export default function AddButton (props) {
    return (
        <Button className={'mt-1 ' + props.className} onClick={props.addFunction}>
            {props.children ? props.children : '+'}
        </Button>
    )
}
