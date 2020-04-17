import React, {useState} from 'react'
import DialpadIcon from "@material-ui/icons/Dialpad"
import {Popper} from "@material-ui/core"
import {AccountCircle} from "@material-ui/icons";

const Menu: React.FC = ({children}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null);

    const clickHandler = (e: React.MouseEvent<SVGElement>) => {
        if (!anchorEl) setAnchorEl(e.currentTarget);

        setIsOpened(!isOpened)
    };

    return (
        <menu className="menu">
            <a href="https://mail.google.com/">Dmail</a>
            <a href="https://photos.google.com/">Images</a>
            <DialpadIcon onClick={clickHandler}/>
            <Popper open={isOpened} anchorEl={anchorEl as SVGElement}>
                <div className="popper">
                    <h2>Doodle Services</h2>
                    <hr/>
                    {children}
                </div>
            </Popper>
            <AccountCircle className="avatar"/>
        </menu>
    )
};

export default Menu