// const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer.js');



let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        console.log(listado);
        for (let tarea of listado) {
            console.log('==============='.green);
            console.log(tarea.descripcion);
            console.log(tarea.completado);
            console.log('==============='.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        console.log(`Tarea ${ argv.descripcion} fue borrada? ${ borrar }`);
        break;
    case 'default':
        console.log('Tarea no reconocida');
        break;

}