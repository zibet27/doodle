import React, {ChangeEvent, useState} from 'react';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {Button, Popper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {App} from "../../data/data";

interface Props {
    mapApps: (apps: Array<App>) => JSX.Element
}

const FavoriteSites: React.FC<Props> = ({mapApps}) => {

    const [isOpened, setIsOpened] = useState(false);
    const [errors, setErrors] = useState<Array<string>>([]);
    const [myApps, setMyApps] = useState<App[]>([]);
    const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null);
    const [inputState, setInputState] = useState<App>({
        title: "", link: "", img: ""
    });
    const newAppInfo: Array<Extract<keyof App, keyof App>> = ["title", "link", "img"];

    const toggleIsOpened = () => setIsOpened(!isOpened);

    const clickHandler = (e: React.MouseEvent<SVGElement>) => {
        if (!anchorEl) setAnchorEl(e.currentTarget);
        toggleIsOpened()
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputState({...inputState, [e.target.name]: e.target.value});
        setErrors([])
    };

    const addError = (indexes: number[]) => {
        setErrors(errors.concat(indexes.map(i => newAppInfo[i])))
    };

    const onSubmit = () => {
        debugger
        try {
            new URL(inputState.link);

            try {
                new URL(inputState.img)
            } catch {
                return addError([2])
            }

            setMyApps([...myApps, inputState]);
            toggleIsOpened()
        } catch {
            try {
                new URL(inputState.img);
                addError([1])
            } catch {
                addError([1, 2])
            }
        }
    };

    return (
        <div className="favoriteSites">
            {mapApps(myApps)}

            <AddCircleIcon fontSize="large" onClick={clickHandler}/>

            <Popper open={isOpened} anchorEl={anchorEl}>
                <div className="addAppForm" style={errors.length ? {height: "25em"} : {}}>
                    <h2>Add your favorite app</h2>
                    <hr/>
                    {newAppInfo.map(fEl =>
                        <TextField label={fEl.toUpperCase()}
                                   name={fEl}
                                   required={true}
                                   defaultValue={inputState[fEl]}
                                   onChange={onInputChange}
                                   key={fEl}
                                   error={errors.includes(fEl)}
                                   helperText={errors.includes(fEl) && `Please enter correct ${fEl}`}
                        />
                    )}
                    <Button onClick={onSubmit}>Submit</Button>
                    <Button onClick={toggleIsOpened}>Cancel</Button>
                </div>
            </Popper>
        </div>
    )
};

export default FavoriteSites