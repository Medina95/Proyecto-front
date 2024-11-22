export const Face = ({ porcentage, name, mood, color }) => {
    return (
        <>
            <div className={name}>
                <div className="filler" style={{height: `${porcentage}%`, backgroundColor: color}}></div>
                <div className="ojitos">
                    <span className="ojo"></span>
                    <span className="ojo"></span>
                </div>
                <div className={mood}></div>
                <span>{porcentage}%</span>
            </div>
        </>
    )
}