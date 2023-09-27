import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { Feather } from 'feather-icons-react'
import {Row, Col} from 'react-bootstrap'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

export const FilterComponent = ({filterText, onFilter, onClear}) => {
  return (
    <Row>
        <Col>
        <InputGroup>
        <FormControl id='search'
        placeholder='Buscar...'
        value={filterText}
        onChange={onFilter}/>
        <InputGroup.Text onClick={onClear}>
        <FeatherIcon icon={'x'}/>
        </InputGroup.Text>
        </InputGroup>
        </Col>
    </Row>
  )
}
