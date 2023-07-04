import Swal from 'sweetalert2'

export const confirmAlert = (text, icon='warning') => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success ms-2',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    
    return swalWithBootstrapButtons.fire({
        title: '¿Está seguro?',
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: 'confirmar',
        cancelButtonText: 'cancelar',
        reverseButtons: true
    });
};

export const toast = (title, icon='success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Toast.fire({
        icon,
        title,
    })
};


export const simpleAlert = (title, text, icon) => {
    Swal.fire({
        icon,
        title,
        text,
    });
};

