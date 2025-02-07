import  React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FormLabel } from '@mui/material';
import { skills } from '../../../helper/constant data';

interface SkillFieldProps{
    name?:string;
    label?:string;
    children?:string;
    skill:string,
    onChange:(value:string)=>void;
}


export default function SkillField({label,name,skill,onChange}:SkillFieldProps) {
    const [state,setState] = useState('');
    const [input,setInput] = useState('');
    function handleChange(event: React.SyntheticEvent, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined){
        const stringValue = value.toString();
        onChange(stringValue);
        setState(stringValue);
    }
    function handleInputChange(event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason){
        setInput(value);
    }
  return (
    <Stack spacing={1}>
    <FormLabel htmlFor={'skill'}>{"Skills"}</FormLabel>
      <Autocomplete
        multiple
        id="skill"
        options={skills.map((option) => option.title)}
        value={state ? state.split(',') : []}
        inputValue={input}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip variant="outlined" label={option} key={key} {...tagProps} />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            name='skill'
            placeholder="Enter your skills"
          />
        )}

        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </Stack>
  );
}