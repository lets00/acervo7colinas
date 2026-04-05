import "../css/SectionHeader.css";
function SectionHeader({ title, marginBottom = "-40px" }) {
    return (
        <div className="section-header" style={{ marginBottom: marginBottom }}>
            <h3>{title}</h3>
        </div>
    );
}

export default SectionHeader;