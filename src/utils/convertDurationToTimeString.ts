export function convertDurationToTimeString(duration: number) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    // se tiver só um digito, adiciona o 0 na frente ao percorrer com map
    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':');
        
    return timeString;
}
