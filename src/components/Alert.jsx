

function Alert(props) {
    
    if (props.alert?.type==="success") {
        return (
            <div className="alert alert-success bg-red" role="alert">
                <strong>Success!</strong> {props.alert.msg}
            </div>
        )
    }
    if (props.alert?.type==="danger") {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>Error!</strong> {props.alert.msg}
            </div>
        )
    }
    if (props.alert?.type==="warning") {
        return (
            <div className="alert alert-warning" role="alert">
                <strong>Warning!</strong> {props.alert.msg}
            </div>
        )
    }
}

export default Alert;