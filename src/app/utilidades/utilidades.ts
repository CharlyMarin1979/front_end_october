export function toBase64(file: File){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
}

export function parsearErroresAPI(resposne: any): string[]{
    const resultado: string[] = [];

    if (resposne.error){
        if(typeof resposne.error === 'string'){
            resultado.push(resposne.error);
        }
        else if(Array.isArray(resposne.error)){
            resposne.error.forEach(valor => resultado.push(valor.description));
        }
        else{
            const mapaErrores = resposne.error.errors;
            const entradas = Object.entries(mapaErrores);
            entradas.forEach((arreglo: any[]) => {
                const campo = arreglo[0];
                arreglo[1].forEach(mensajeError => {
                    resultado.push(`${campo}: ${mensajeError}`);
                });
            });
        }
    }

    return resultado;
}

export function formatearfecha(date: Date){
    date = new Date(date);
    const formato = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const[
        {value: mont},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date);

    return `${year}-${mont}-${day}`;
}