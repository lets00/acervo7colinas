import "../css/SectionHeader.css";
import { Divider } from "@mui/material";

function SectionHeader({ title, marginBottom = "0px" }) {
    return (
        <>
            <div className="section-header">
                <h3>{title}</h3>
            </div>
            
        </>
    );
}

export default SectionHeader;