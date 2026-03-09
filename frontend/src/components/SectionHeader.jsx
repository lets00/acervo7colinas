import "./SectionHeader.css";
function SectionHeader({ title }) {
    return (
        <div className="section-header">
            <h3>{title}</h3>
        </div>
    );
}

export default SectionHeader;