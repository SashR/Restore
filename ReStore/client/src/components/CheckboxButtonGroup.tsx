import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";


interface Props {
    options: any[];
    toggle: (i:number)=>void;
    // onChange: (event: any) => void;
    // selectedValue: string;
}

const CheckboxButtonGroup = ({options, toggle}:Props) => {
    // const [selected, setSelected] = useState((new Array(options.length)).fill(false));
    // const toggle = (i:number) => {
    //     setSelected([...selected.slice(0,i),!selected[i],...selected.slice(i+1,selected.length)]);
    // };
    return (
        <FormGroup>
            {options.map((b,i:number) => (
                <FormControlLabel 
                    key={b} 
                    control={<Checkbox onChange={()=>toggle(i)}/>} 
                    label={b} 
                />))}
        </FormGroup>
    )
}

export default CheckboxButtonGroup;