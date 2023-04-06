// This component is for customizing the show column button in the mui-datatable

import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from 'tss-react/mui';

const style = {
  root: {
    padding: '16px 24px 16px 24px',
    fontFamily: 'Roboto',
  },
  title: {
    marginLeft: '-7px',
    marginRight: '24px',
    fontSize: '14px',
    textAlign: 'left',
    fontWeight: 500,
  },
  formGroup: {
    marginTop: '8px',
  },
  formControl: {},
  checkbox: {
    padding: '0px',
    width: '32px',
    height: '32px',
  },
  checkboxRoot: {},
  checked: {},
  label: {
    fontSize: '15px',
    marginLeft: '8px',
  },
};

const TableViewCol = ({ columns, options, components = {}, onColumnUpdate, updateColumns }) => {
  const textLabels = options.textLabels.viewColumns;
  const CheckboxComponent = components.Checkbox || Checkbox;

  const handleColChange = index => {
    onColumnUpdate(index);
  };

  const deSelectAll = () => {
    var newColumns = columns.map(col => {
      var newCol = Object.assign({}, col);
      newCol.display = 'false';
      return newCol;
    });
    updateColumns(newColumns);
  };

  const selectAll = () => {
    var newColumns = columns.map(col => {
      var newCol = Object.assign({}, col);
      newCol.display = 'true';
      return newCol;
    });
    updateColumns(newColumns);
  };


  return (
    <FormControl component={'fieldset'} sx={style.root} aria-label={textLabels.titleAria}>
      <Typography variant="caption" sx={style.title}>
        {textLabels.title}
      </Typography>
      <FormGroup sx={style.formGroup}>
        <Button onClick={selectAll}>Select All</Button>
        <Button onClick={deSelectAll}>Deselect All</Button>
        {columns.map((column, index) => {
          return (
            column.display !== 'excluded' &&
            column.viewColumns !== false && (
              <FormControlLabel
                key={index}
                sx={{
                  root: style.formControl,
                  label: style.label,
                }}
                control={
                  <CheckboxComponent
                    color="primary"
                    sx={style.checkbox}
                    classes={{
                      root: style.checkboxRoot,
                      checked: style.checked,
                    }}
                    onChange={() => handleColChange(index)}
                    checked={column.display === 'true'}
                    value={column.name}
                  />
                }
                label={column.label}
              />
            )
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

TableViewCol.propTypes = {
  /** Columns used to describe table */
  columns: PropTypes.array.isRequired,
  /** Options used to describe table */
  options: PropTypes.object.isRequired,
  /** Callback to trigger View column update */
  onColumnUpdate: PropTypes.func,
  /** Extend the style applied to components */
  classes: PropTypes.object,
};

export default TableViewCol;