import api from "@/services";

export function serialize(obj) {
    let queryString = "";
    for (let key in obj) {
        queryString += `&${key}=${obj[key]}`;
    }
    return queryString;
}

export function errorsToString(arErrors) {
    let list = '<ol>'
    for (const key in arErrors)
        list += `<li>${arErrors[key][0]}</li>`
    list += '</ol>'
    return list;
}

export function filterNonNumeric(ev) {
    ev.target.value = ev.target.value.replace(/[^0-9]/g, "");
}

export function convertDateToDB(date) {
    if (!date) return null
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
}

export function generateHash(prefix = '') {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return prefix + result;
}

export function displayDateInFull(date) {
    const dataSplit = date.split('/');
    const day = parseInt(dataSplit[0]);
    const month = parseInt(dataSplit[1]);
    const year = parseInt(dataSplit[2]);

    const MonthsOfTheYear = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    // Formata o dia para ter dois dígitos
    const formattedDay = day.toString().padStart(2, '0');

    return `${formattedDay} de ${MonthsOfTheYear[month - 1]} de ${year}`;
}

export function handlerDelete(id, endpoint) {

    this.$swal({
        title: "Deseja confirmar a ação?",
        text: "Você não será capaz de reverter isso!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apague!",
        cancelButtonText: "Não, cancele!",
        buttonsStyling: true,
    }).then(async (isConfirm) => {
        if (isConfirm.value === true) {
            try {
                const { data } = await api.delete(`/${endpoint}/${id}`);
                Toast.fire(data.message, "", "success");
                this.getItens();
            } catch (error) {
                Toast.fire(error.response.data.message, "", "error");
            }
        }
    });
}

export function cpfWithMask(string){
    const numericCpf = string.replace(/\D/g, '');
    return numericCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}