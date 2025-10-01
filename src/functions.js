import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function show_alert(message, icon, foco){
    onFocus(foco);
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title:message,
        icon:icon

    });
}

function onFocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus()
    }
}    