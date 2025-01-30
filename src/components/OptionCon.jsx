
export default function OptionCon({ option, checked, change }) {
    return (
        <div className="option" key={option} >
            <label className="checkbox-container">
                <input
                    className="custom-checkbox"
                    type="checkbox"
                    checked={checked === option ? true : false}
                    onChange={change}
                    value={option}
                />
                <span className="checkmark"></span>
            </label>
            {option}
        </div >
    );
}
